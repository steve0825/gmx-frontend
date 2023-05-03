import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import EventEmitter from "abis/EventEmitter.json";
import { GmStatusNotification } from "components/Synthetics/StatusNotifiaction/GmStatusNotification";
import { OrderStatusNotification } from "components/Synthetics/StatusNotifiaction/OrderStatusNotification";
import { getContract } from "config/contracts";
import { isDevelopment } from "config/env";
import { getWrappedToken } from "config/tokens";
import { useMarketsInfo } from "domain/synthetics/markets";
import { isDecreaseOrderType, isIncreaseOrderType } from "domain/synthetics/orders";
import { getPositionKey } from "domain/synthetics/positions";
import { getSwapPathOutputAddresses } from "domain/synthetics/trade";
import { BigNumber, ethers } from "ethers";
import { useChainId } from "lib/chains";
import { helperToast } from "lib/helperToast";
import { setByKey, updateByKey } from "lib/objects";
import { getProvider, getWsProvider } from "lib/rpc";
import { ReactNode, createContext, useEffect, useMemo, useRef, useState } from "react";
import {
  DepositCreatedEventData,
  DepositStatuses,
  EventLogData,
  EventTxnParams,
  OrderCreatedEventData,
  OrderStatuses,
  PendingDepositData,
  PendingOrderData,
  PendingPositionUpdate,
  PendingPositionsUpdates,
  PendingWithdrawalData,
  PositionDecreaseEvent,
  PositionIncreaseEvent,
  SyntheticsEventsContextType,
  WithdrawalCreatedEventData,
  WithdrawalStatuses,
} from "./types";
import { parseEventLogData } from "./utils";

export const SyntheticsEventsContext = createContext({});

export function SyntheticsEventsProvider({ children }: { children: ReactNode }) {
  const { chainId } = useChainId();
  const { active, account: currentAccount } = useWeb3React();

  const { marketsInfoData } = useMarketsInfo(chainId);

  const [pendingOrders, setPendingOrders] = useState<PendingOrderData[]>([]);
  const [orderStatuses, setOrderStatuses] = useState<OrderStatuses>({});

  const [pendingDeposits, setPendingDeposits] = useState<PendingDepositData[]>([]);
  const [depositStatuses, setDepositStatuses] = useState<DepositStatuses>({});

  const [pendingWithdrawals, setPendingWithdrawals] = useState<PendingWithdrawalData[]>([]);
  const [withdrawalStatuses, setWithdrawalStatuses] = useState<WithdrawalStatuses>({});

  const [pendingPositionsUpdates, setPendingPositionsUpdates] = useState<PendingPositionsUpdates>({});
  const [positionIncreaseEvents, setPositionIncreaseEvents] = useState<PositionIncreaseEvent[]>([]);
  const [positionDecreaseEvents, setPositionDecreaseEvents] = useState<PositionDecreaseEvent[]>([]);

  const eventLogHandlers = useRef({});

  // use ref to avoid re-subscribing on state changes
  eventLogHandlers.current = {
    OrderCreated: (eventData: EventLogData, txnParams: EventTxnParams) => {
      const data: OrderCreatedEventData = {
        account: eventData.addressItems.items.account,
        receiver: eventData.addressItems.items.receiver,
        callbackContract: eventData.addressItems.items.callbackContract,
        marketAddress: eventData.addressItems.items.market,
        initialCollateralTokenAddress: eventData.addressItems.items.initialCollateralToken,
        swapPath: eventData.addressItems.arrayItems.swapPath,
        sizeDeltaUsd: eventData.uintItems.items.sizeDeltaUsd,
        initialCollateralDeltaAmount: eventData.uintItems.items.initialCollateralDeltaAmount,
        contractTriggerPrice: eventData.uintItems.items.triggerPrice,
        contractAcceptablePrice: eventData.uintItems.items.acceptablePrice,
        executionFee: eventData.uintItems.items.executionFee,
        callbackGasLimit: eventData.uintItems.items.callbackGasLimit,
        minOutputAmount: eventData.uintItems.items.minOutputAmount,
        updatedAtBlock: eventData.uintItems.items.updatedAtBlock,
        orderType: Number(eventData.uintItems.items.orderType),
        isLong: eventData.boolItems.items.isLong,
        shouldUnwrapNativeToken: eventData.boolItems.items.shouldUnwrapNativeToken,
        isFrozen: eventData.boolItems.items.isFrozen,
        key: eventData.bytes32Items.items.key,
      };

      if (data.account !== currentAccount) {
        return;
      }

      setOrderStatuses((old) =>
        setByKey(old, data.key, { key: data.key, data, createdTxnHash: txnParams.transactionHash })
      );
    },

    OrderExecuted: (eventData: EventLogData, txnParams: EventTxnParams) => {
      const key = eventData.bytes32Items.items.key;

      setOrderStatuses((old) => updateByKey(old, key, { executedTxnHash: txnParams.transactionHash }));
    },

    OrderCancelled: (eventData: EventLogData, txnParams: EventTxnParams) => {
      const key = eventData.bytes32Items.items.key;
      setOrderStatuses((old) => updateByKey(old, key, { cancelledTxnHash: txnParams.transactionHash }));

      const order = orderStatuses[key]?.data;

      // If pending user order is cancelled, reset the pending position state
      if (order && marketsInfoData) {
        const wrappedToken = getWrappedToken(chainId);

        let pendingPositionKey: string | undefined;

        // For increase orders, we need to check the target collateral token
        if (isIncreaseOrderType(order.orderType)) {
          const { outTokenAddress } = getSwapPathOutputAddresses({
            marketsInfoData: marketsInfoData,
            initialCollateralAddress: order.initialCollateralTokenAddress,
            swapPath: order.swapPath,
            wrappedNativeTokenAddress: wrappedToken.address,
            shouldUnwrapNativeToken: order.shouldUnwrapNativeToken,
          });

          if (outTokenAddress) {
            pendingPositionKey = getPositionKey(order.account, order.marketAddress, outTokenAddress, order.isLong);
          }
        } else if (isDecreaseOrderType(order.orderType)) {
          pendingPositionKey = getPositionKey(
            order.account,
            order.marketAddress,
            order.initialCollateralTokenAddress,
            order.isLong
          );
        }

        if (pendingPositionKey) {
          setPendingPositionsUpdates((old) => setByKey(old, pendingPositionKey!, undefined));
        }
      }
    },

    DepositCreated: (eventData: EventLogData, txnParams: EventTxnParams) => {
      const depositData: DepositCreatedEventData = {
        account: eventData.addressItems.items.account,
        receiver: eventData.addressItems.items.receiver,
        callbackContract: eventData.addressItems.items.callbackContract,
        marketAddress: eventData.addressItems.items.market,
        initialLongTokenAddress: eventData.addressItems.items.initialLongToken,
        initialShortTokenAddress: eventData.addressItems.items.initialShortToken,
        longTokenSwapPath: eventData.addressItems.arrayItems.longTokenSwapPath,
        shortTokenSwapPath: eventData.addressItems.arrayItems.shortTokenSwapPath,
        initialLongTokenAmount: eventData.uintItems.items.initialLongTokenAmount,
        initialShortTokenAmount: eventData.uintItems.items.initialShortTokenAmount,
        minMarketTokens: eventData.uintItems.items.minMarketTokens,
        updatedAtBlock: eventData.uintItems.items.updatedAtBlock,
        executionFee: eventData.uintItems.items.executionFee,
        callbackGasLimit: eventData.uintItems.items.callbackGasLimit,
        shouldUnwrapNativeToken: eventData.boolItems.items.shouldUnwrapNativeToken,
        key: eventData.bytes32Items.items.key,
      };

      if (depositData.account !== currentAccount) return;

      setDepositStatuses((old) =>
        setByKey(old, depositData.key, {
          key: depositData.key,
          data: depositData,
          createdTxnHash: txnParams.transactionHash,
        })
      );
    },

    DepositExecuted: (eventData: EventLogData, txnParams: EventTxnParams) => {
      const key = eventData.bytes32Items.items.key;
      setDepositStatuses((old) => updateByKey(old, key, { executedTxnHash: txnParams.transactionHash }));
    },

    DepositCancelled: (eventData: EventLogData, txnParams: EventTxnParams) => {
      const key = eventData.bytes32Items.items.key;
      setDepositStatuses((old) => updateByKey(old, key, { cancelledTxnHash: txnParams.transactionHash }));
    },

    WithdrawalCreated: (eventData: EventLogData, txnParams: EventTxnParams) => {
      const data: WithdrawalCreatedEventData = {
        account: eventData.addressItems.items.account,
        receiver: eventData.addressItems.items.receiver,
        callbackContract: eventData.addressItems.items.callbackContract,
        marketAddress: eventData.addressItems.items.market,
        marketTokenAmount: eventData.uintItems.items.marketTokenAmount,
        minLongTokenAmount: eventData.uintItems.items.minLongTokenAmount,
        minShortTokenAmount: eventData.uintItems.items.minShortTokenAmount,
        updatedAtBlock: eventData.uintItems.items.updatedAtBlock,
        executionFee: eventData.uintItems.items.executionFee,
        callbackGasLimit: eventData.uintItems.items.callbackGasLimit,
        shouldUnwrapNativeToken: eventData.boolItems.items.shouldUnwrapNativeToken,
        key: eventData.bytes32Items.items.key,
      };

      if (data.account !== currentAccount) return;

      setWithdrawalStatuses((old) =>
        setByKey(old, data.key, { key: data.key, data, createdTxnHash: txnParams.transactionHash })
      );
    },

    WithdrawalExecuted: (eventData: EventLogData, txnParams: EventTxnParams) => {
      const key = eventData.bytes32Items.items.key;
      setWithdrawalStatuses((old) => updateByKey(old, key, { executedTxnHash: txnParams.transactionHash }));
    },

    WithdrawalCancelled: (eventData: EventLogData, txnParams: EventTxnParams) => {
      const key = eventData.bytes32Items.items.key;
      setWithdrawalStatuses((old) => updateByKey(old, key, { cancelledTxnHash: txnParams.transactionHash }));
    },

    PositionIncrease: (eventData: EventLogData, txnParams: EventTxnParams) => {
      const data: PositionIncreaseEvent = {
        positionKey: getPositionKey(
          eventData.addressItems.items.account,
          eventData.addressItems.items.market,
          eventData.addressItems.items.collateralToken,
          eventData.boolItems.items.isLong
        )!,
        contractPositionKey: eventData.bytes32Items.items.positionKey,
        account: eventData.addressItems.items.account,
        marketAddress: eventData.addressItems.items.market,
        collateralTokenAddress: eventData.addressItems.items.collateralToken,
        sizeInUsd: eventData.uintItems.items.sizeInUsd,
        sizeInTokens: eventData.uintItems.items.sizeInTokens,
        collateralAmount: eventData.uintItems.items.collateralAmount,
        borrowingFactor: eventData.uintItems.items.borrowingFactor,
        executionPrice: eventData.uintItems.items.executionPrice,
        sizeDeltaUsd: eventData.uintItems.items.sizeDeltaUsd,
        sizeDeltaInTokens: eventData.uintItems.items.sizeDeltaInTokens,
        orderType: Number(eventData.uintItems.items.orderType),
        longTokenFundingAmountPerSize: eventData.intItems.items.longTokenFundingAmountPerSize,
        shortTokenFundingAmountPerSize: eventData.intItems.items.shortTokenFundingAmountPerSize,
        collateralDeltaAmount: eventData.intItems.items.collateralDeltaAmount,
        isLong: eventData.boolItems.items.isLong,
        increasedAtBlock: BigNumber.from(txnParams.blockNumber),
      };

      if (data.account !== currentAccount) return;

      setPositionIncreaseEvents((old) => [...old, data]);
    },

    PositionDecrease: (eventData: EventLogData, txnParams: EventTxnParams) => {
      const data: PositionDecreaseEvent = {
        positionKey: getPositionKey(
          eventData.addressItems.items.account,
          eventData.addressItems.items.market,
          eventData.addressItems.items.collateralToken,
          eventData.boolItems.items.isLong
        )!,
        account: eventData.addressItems.items.account,
        marketAddress: eventData.addressItems.items.market,
        collateralTokenAddress: eventData.addressItems.items.collateralToken,
        sizeInUsd: eventData.uintItems.items.sizeInUsd,
        sizeInTokens: eventData.uintItems.items.sizeInTokens,
        collateralAmount: eventData.uintItems.items.collateralAmount,
        borrowingFactor: eventData.uintItems.items.borrowingFactor,
        longTokenFundingAmountPerSize: eventData.intItems.items.longTokenFundingAmountPerSize,
        shortTokenFundingAmountPerSize: eventData.intItems.items.shortTokenFundingAmountPerSize,
        pnlUsd: eventData.intItems.items.pnlUsd,
        isLong: eventData.boolItems.items.isLong,
        contractPositionKey: eventData.bytes32Items.items.positionKey,
        decreasedAtBlock: BigNumber.from(txnParams.blockNumber),
      };

      if (data.account !== currentAccount) return;

      setPositionDecreaseEvents((old) => [...old, data]);
    },
  };

  useEffect(
    function notifyPendingOrders() {
      const pendingOrder = pendingOrders[0];

      if (!pendingOrder) {
        return;
      }

      setPendingOrders([]);

      helperToast.info(<OrderStatusNotification pendingOrderData={pendingOrder} />, {
        autoClose: false,
      });
    },
    [pendingOrders]
  );

  useEffect(
    function notifyPendingDeposits() {
      const pendingDeposit = pendingDeposits[0];

      if (!pendingDeposit) {
        return;
      }

      setPendingDeposits([]);

      helperToast.info(<GmStatusNotification pendingDepositData={pendingDeposit} />, {
        autoClose: false,
      });
    },
    [pendingDeposits, pendingOrders]
  );

  useEffect(
    function notifyPendingWithdrawals() {
      const pendingWithdrawal = pendingWithdrawals[0];

      if (!pendingWithdrawal) {
        return;
      }

      setPendingWithdrawals([]);

      helperToast.info(<GmStatusNotification pendingWithdrawalData={pendingWithdrawal} />, {
        autoClose: false,
      });
    },
    [pendingDeposits, pendingOrders, pendingWithdrawals]
  );

  useEffect(
    function subscribe() {
      const wsProvider = getWsProvider(active, chainId);

      if (!wsProvider) {
        return;
      }

      let EventEmitterContract: ethers.Contract | undefined;

      try {
        EventEmitterContract = new ethers.Contract(getContract(chainId, "EventEmitter"), EventEmitter.abi, wsProvider);
      } catch (e) {
        // ...ignore on unsupported chains
      }

      function handleEventLog(sender, eventName, eventNameHash, eventData, txnOpts) {
        if (isDevelopment()) {
          // eslint-disable-next-line no-console
          console.log("handleEventLog", sender, eventName, eventNameHash, eventData, txnOpts);
        }
        eventLogHandlers.current[eventName]?.(parseEventLogData(eventData), txnOpts);
      }

      function handleEventLog1(sender, eventName, eventNameHash, topic1, eventData, txnOpts) {
        if (isDevelopment()) {
          // eslint-disable-next-line no-console
          console.log("handleEventLog1", sender, eventName, eventNameHash, topic1, eventData, txnOpts);
        }

        eventLogHandlers.current[eventName]?.(parseEventLogData(eventData), txnOpts);
      }

      function handleEventLog2(msgSender, eventName, eventNameHash, topic1, topic2, eventData, txnOpts) {
        if (isDevelopment()) {
          // eslint-disable-next-line no-console
          console.log("handleEventLog2", msgSender, eventNameHash, eventName, topic1, topic2, eventData, txnOpts);
        }
        eventLogHandlers.current[eventName]?.(parseEventLogData(eventData), txnOpts);
      }

      EventEmitterContract?.on("EventLog", handleEventLog);
      EventEmitterContract?.on("EventLog1", handleEventLog1);
      EventEmitterContract?.on("EventLog2", handleEventLog2);

      return () => {
        EventEmitterContract?.off("EventLog", handleEventLog);
        EventEmitterContract?.off("EventLog1", handleEventLog1);
        EventEmitterContract?.off("EventLog2", handleEventLog2);
      };
    },
    [active, chainId]
  );

  const contextState: SyntheticsEventsContextType = useMemo(() => {
    if (isDevelopment()) {
      // eslint-disable-next-line no-console
      console.debug("events", {
        orderStatuses,
        depositStatuses,
        withdrawalStatuses,
        increasePositionEvents: positionIncreaseEvents,
        decreasePositionEvents: positionDecreaseEvents,
        pendingPositionsUpdates,
      });
    }

    return {
      orderStatuses,
      depositStatuses,
      withdrawalStatuses,
      pendingPositionsUpdates,
      positionIncreaseEvents,
      positionDecreaseEvents,
      touchOrderStatus: (key: string) => {
        setOrderStatuses((old) => updateByKey(old, key, { isTouched: true }));
      },
      touchDepositStatus: (key: string) => {
        setDepositStatuses((old) => updateByKey(old, key, { isTouched: true }));
      },
      touchWithdrawalStatus: (key: string) => {
        setWithdrawalStatuses((old) => updateByKey(old, key, { isTouched: true }));
      },
      setPendingOrder: (data: PendingOrderData) => {
        setPendingOrders((old) => [...old, data]);
      },
      setPendingDeposit: (data: PendingDepositData) => {
        setPendingDeposits((old) => [...old, data]);
      },
      setPendingWithdrawal: (data: PendingWithdrawalData) => {
        setPendingWithdrawals((old) => [...old, data]);
      },
      async setPendingPosition(update: Omit<PendingPositionUpdate, "updatedAt" | "updatedAtBlock">) {
        const provider = getProvider(undefined, chainId) as StaticJsonRpcProvider;

        const currentBlock = await provider.getBlockNumber();

        setPendingPositionsUpdates((old) =>
          setByKey(old, update.positionKey, {
            ...update,
            updatedAt: Date.now(),
            updatedAtBlock: BigNumber.from(currentBlock),
          })
        );
      },
    };
  }, [
    chainId,
    depositStatuses,
    orderStatuses,
    pendingPositionsUpdates,
    positionDecreaseEvents,
    positionIncreaseEvents,
    withdrawalStatuses,
  ]);

  return <SyntheticsEventsContext.Provider value={contextState}>{children}</SyntheticsEventsContext.Provider>;
}
