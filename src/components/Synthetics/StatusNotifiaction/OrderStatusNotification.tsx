import { t } from "@lingui/macro";
import { TransactionStatus, TransactionStatusType } from "components/TransactionStatus/TransactionStatus";
import { getWrappedToken } from "config/tokens";
import { PendingOrderData, getPendingOrderKey, useSyntheticsEvents } from "context/SyntheticsEvents";
import { MarketsInfoData } from "domain/synthetics/markets";
import {
  isIncreaseOrderType,
  isLimitOrderType,
  isLimitSwapOrderType,
  isMarketOrderType,
  isSwapOrderType,
} from "domain/synthetics/orders";
import { TokensData } from "domain/synthetics/tokens";
import { getSwapPathOutputAddresses } from "domain/synthetics/trade";
import { useChainId } from "lib/chains";
import { formatTokenAmount, formatUsd } from "lib/numbers";
import { getByKey } from "lib/objects";
import { useEffect, useMemo, useState } from "react";
import "./StatusNotification.scss";

type Props = {
  pendingOrderData: PendingOrderData;
  marketsInfoData?: MarketsInfoData;
  tokensData?: TokensData;
};

export function OrderStatusNotification({ pendingOrderData, marketsInfoData, tokensData }: Props) {
  const { chainId } = useChainId();
  const wrappedNativeToken = getWrappedToken(chainId);
  const { orderStatuses, touchOrderStatus } = useSyntheticsEvents();

  const [orderStatusKey, setOrderStatusKey] = useState<string>();

  const pendingOrderKey = useMemo(() => getPendingOrderKey(pendingOrderData), [pendingOrderData]);
  const orderStatus = getByKey(orderStatuses, orderStatusKey);

  const orderData = useMemo(() => {
    if (!marketsInfoData || !orderStatuses || !tokensData || !wrappedNativeToken) {
      return undefined;
    }

    const marketInfo = getByKey(marketsInfoData, pendingOrderData.marketAddress);
    const initialCollateralToken = getByKey(tokensData, pendingOrderData.initialCollateralTokenAddress);
    const { outTokenAddress } = getSwapPathOutputAddresses({
      marketsInfoData,
      initialCollateralAddress: pendingOrderData.initialCollateralTokenAddress,
      swapPath: pendingOrderData.swapPath,
      wrappedNativeTokenAddress: wrappedNativeToken.address,
      shouldUnwrapNativeToken: pendingOrderData.shouldUnwrapNativeToken,
    });
    const targetCollateralToken = getByKey(tokensData, outTokenAddress);

    return {
      ...pendingOrderData,
      marketInfo,
      initialCollateralToken,
      targetCollateralToken,
    };
  }, [marketsInfoData, orderStatuses, pendingOrderData, tokensData, wrappedNativeToken]);

  const title = useMemo(() => {
    if (!orderData) {
      return t`Unknown order`;
    }

    if (isSwapOrderType(orderData.orderType)) {
      const { initialCollateralToken, targetCollateralToken, initialCollateralDeltaAmount, minOutputAmount } =
        orderData;

      const orderTypeText = isLimitSwapOrderType(orderData.orderType) ? t`Limit Swap` : t`Swap`;

      return t`${orderTypeText} ${formatTokenAmount(
        initialCollateralDeltaAmount,
        initialCollateralToken?.decimals,
        initialCollateralToken?.symbol
      )} for ${formatTokenAmount(minOutputAmount, targetCollateralToken?.decimals, targetCollateralToken?.symbol)}`;
    } else {
      const { marketInfo, sizeDeltaUsd, orderType, isLong, initialCollateralDeltaAmount, initialCollateralToken } =
        orderData;

      const longShortText = isLong ? t`Long` : t`Short`;
      const positionText = `${marketInfo?.indexToken.symbol} ${longShortText}`;

      if (sizeDeltaUsd.eq(0)) {
        const symbol = orderData.shouldUnwrapNativeToken
          ? initialCollateralToken?.baseSymbol
          : initialCollateralToken?.symbol;

        if (isIncreaseOrderType(orderType)) {
          return t`Depositing ${formatTokenAmount(
            initialCollateralDeltaAmount,
            initialCollateralToken?.decimals,
            symbol
          )} to ${positionText}`;
        } else {
          return t`Withdrawing ${formatTokenAmount(
            initialCollateralDeltaAmount,
            initialCollateralToken?.decimals,
            symbol
          )} from ${positionText}`;
        }
      } else {
        let orderTypeText = "";

        if (isMarketOrderType(orderType)) {
          orderTypeText = isIncreaseOrderType(orderType) ? t`Increasing` : t`Decreasing`;
        } else {
          orderTypeText = isLimitOrderType(orderType) ? t`Limit order for` : t`Trigger order for`;
        }

        const sign = isIncreaseOrderType(orderType) ? "+" : "-";

        return t`${orderTypeText} ${marketInfo?.indexToken?.symbol} ${longShortText}: ${sign}${formatUsd(
          sizeDeltaUsd
        )}`;
      }
    }
  }, [orderData]);

  const creationStatus = useMemo(() => {
    let text = t`Sending order request`;
    let status: TransactionStatusType = "loading";

    if (orderStatus?.createdTxnHash) {
      status = "success";
      text = t`Order request sent`;
    }

    return <TransactionStatus status={status} txnHash={orderStatus?.createdTxnHash} text={text} />;
  }, [orderStatus?.createdTxnHash]);

  const executionStatus = useMemo(() => {
    if (!orderData || !isMarketOrderType(orderData?.orderType)) {
      return null;
    }

    let text = t`Fulfilling order request`;
    let status: TransactionStatusType = "muted";
    let txnHash: string | undefined;

    if (orderStatus?.createdTxnHash) {
      status = "loading";
    }

    if (orderStatus?.executedTxnHash) {
      text = t`Order executed`;
      status = "success";
      txnHash = orderStatus?.executedTxnHash;
    }

    if (orderStatus?.cancelledTxnHash) {
      text = t`Order cancelled`;
      status = "error";
      txnHash = orderStatus?.cancelledTxnHash;
    }

    return <TransactionStatus status={status} txnHash={txnHash} text={text} />;
  }, [orderData, orderStatus?.cancelledTxnHash, orderStatus?.createdTxnHash, orderStatus?.executedTxnHash]);

  useEffect(
    function getOrderStatusKey() {
      if (orderStatusKey) {
        return;
      }

      const matchedStatusKey = Object.values(orderStatuses).find(
        (orderStatus) => !orderStatus.isTouched && getPendingOrderKey(orderStatus.data) === pendingOrderKey
      )?.key;

      if (matchedStatusKey) {
        setOrderStatusKey(matchedStatusKey);
        touchOrderStatus(matchedStatusKey);
      }
    },
    [orderStatus, orderStatusKey, orderStatuses, pendingOrderKey, touchOrderStatus]
  );

  return (
    <div className="StatusNotification">
      <div className="StatusNotification-title">{title}</div>

      <div className="StatusNotification-items">
        {creationStatus}
        {executionStatus}
      </div>
    </div>
  );
}
