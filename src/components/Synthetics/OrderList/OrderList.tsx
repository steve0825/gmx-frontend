import { Trans, t } from "@lingui/macro";
import Checkbox from "components/Checkbox/Checkbox";
import { MarketsInfoData } from "domain/synthetics/markets";
import {
  OrdersInfoData,
  PositionOrderInfo,
  SwapOrderInfo,
  isLimitOrderType,
  isSwapOrderType,
  isTriggerDecreaseOrderType,
} from "domain/synthetics/orders";
import { cancelOrdersTxn } from "domain/synthetics/orders/cancelOrdersTxn";
import { PositionsInfoData } from "domain/synthetics/positions";
import { TokensData } from "domain/synthetics/tokens";
import { useChainId } from "lib/chains";
import useWallet from "lib/wallets/useWallet";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { OrderEditor } from "../OrderEditor/OrderEditor";
import { OrderItem } from "../OrderItem/OrderItem";
import {
  useIsLastSubaccountAction,
  useSubaccount,
  useSubaccountCancelOrdersDetailsMessage,
} from "context/SubaccountContext/SubaccountContext";

type Props = {
  hideActions?: boolean;
  ordersData?: OrdersInfoData;
  marketsInfoData?: MarketsInfoData;
  tokensData?: TokensData;
  positionsData?: PositionsInfoData;
  setSelectedOrdersKeys?: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  selectedOrdersKeys?: { [key: string]: boolean };
  isLoading: boolean;
  setPendingTxns: (txns: any) => void;
};

export function OrderList(p: Props) {
  const { marketsInfoData, tokensData, positionsData } = p;
  const { chainId } = useChainId();
  const { signer } = useWallet();

  const [canellingOrdersKeys, setCanellingOrdersKeys] = useState<string[]>([]);
  const [editingOrderKey, setEditingOrderKey] = useState<string>();

  const subaccount = useSubaccount(null);

  const orders = useMemo(() => {
    const { swapOrders, positionOrders } = Object.values(p.ordersData || {}).reduce(
      (acc, order) => {
        if (isLimitOrderType(order.orderType) || isTriggerDecreaseOrderType(order.orderType)) {
          if (isSwapOrderType(order.orderType)) {
            acc.swapOrders.push(order);
          } else {
            acc.positionOrders.push(order as PositionOrderInfo);
          }
        }
        return acc;
      },
      { swapOrders: [] as SwapOrderInfo[], positionOrders: [] as PositionOrderInfo[] }
    );

    const sortedPositionOrders = positionOrders.sort((a, b) => {
      const nameComparison = a.marketInfo.name.localeCompare(b.marketInfo.name);
      if (nameComparison !== 0) return nameComparison;
      return a.triggerPrice.sub(b.triggerPrice).isNegative() ? -1 : 1;
    });

    const sortedSwapOrders = swapOrders.sort((a, b) => {
      const collateralComparison = a.targetCollateralToken.symbol.localeCompare(b.targetCollateralToken.symbol);
      if (collateralComparison !== 0) return collateralComparison;
      return a.minOutputAmount.sub(b.minOutputAmount).isNegative() ? -1 : 1;
    });

    return [...sortedPositionOrders, ...sortedSwapOrders];
  }, [p.ordersData]);

  const isAllOrdersSelected = orders.length > 0 && orders.every((o) => p.selectedOrdersKeys?.[o.key]);
  const editingOrder = orders.find((o) => o.key === editingOrderKey);
  const isLastSubaccountAction = useIsLastSubaccountAction();
  const cancelOrdersDetailsMessage = useSubaccountCancelOrdersDetailsMessage(undefined, 1);

  function onSelectOrder(key: string) {
    p.setSelectedOrdersKeys?.((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function onSelectAllOrders() {
    if (isAllOrdersSelected) {
      p.setSelectedOrdersKeys?.({});
      return;
    }

    const allSelectedOrders = orders.reduce((acc, order) => ({ ...acc, [order.key]: true }), {});

    p.setSelectedOrdersKeys?.(allSelectedOrders);
  }

  function onCancelOrder(key: string) {
    if (!signer) return;
    setCanellingOrdersKeys((prev) => [...prev, key]);

    cancelOrdersTxn(chainId, signer, subaccount, {
      orderKeys: [key],
      setPendingTxns: p.setPendingTxns,
      isLastSubaccountAction,
      detailsMsg: cancelOrdersDetailsMessage,
    }).finally(() => setCanellingOrdersKeys((prev) => prev.filter((k) => k !== key)));
  }

  return (
    <>
      {orders.length === 0 && (
        <div className="Exchange-empty-positions-list-note App-card small">
          {p.isLoading ? t`Loading...` : t`No open orders`}
        </div>
      )}
      <div className="Exchange-list Orders small">
        {!p.isLoading &&
          orders.map((order) => {
            return (
              <OrderItem
                key={order.key}
                order={order}
                isLarge={false}
                isSelected={p.selectedOrdersKeys?.[order.key]}
                onSelectOrder={() => onSelectOrder(order.key)}
                isCanceling={canellingOrdersKeys.includes(order.key)}
                onCancelOrder={() => onCancelOrder(order.key)}
                onEditOrder={() => setEditingOrderKey(order.key)}
                marketsInfoData={marketsInfoData}
                positionsInfoData={positionsData}
                hideActions={p.hideActions}
              />
            );
          })}
      </div>

      <table className="Exchange-list Orders large App-box">
        <tbody>
          <tr className="Exchange-list-header">
            {!p.hideActions && orders.length > 0 && (
              <th>
                <div className="checkbox-inline ">
                  <Checkbox isChecked={isAllOrdersSelected} setIsChecked={onSelectAllOrders} />
                </div>
              </th>
            )}

            <th>
              <div>
                <Trans>Type</Trans>
              </div>
            </th>
            <th>
              <div>
                <Trans>Order</Trans>
              </div>
            </th>
            <th>
              <div>
                <Trans>Trigger Price</Trans>
              </div>
            </th>
            <th>
              <div>
                <Trans>Mark Price</Trans>
              </div>
            </th>
          </tr>
          {orders.length === 0 && (
            <tr>
              <td colSpan={5}>{p.isLoading ? t`Loading...` : t`No open orders`}</td>
            </tr>
          )}
          {!p.isLoading &&
            orders.map((order) => {
              return (
                <OrderItem
                  isSelected={p.selectedOrdersKeys?.[order.key]}
                  key={order.key}
                  order={order}
                  isLarge={true}
                  onSelectOrder={() => onSelectOrder(order.key)}
                  isCanceling={canellingOrdersKeys.includes(order.key)}
                  onCancelOrder={() => onCancelOrder(order.key)}
                  onEditOrder={() => setEditingOrderKey(order.key)}
                  hideActions={p.hideActions}
                  marketsInfoData={marketsInfoData}
                  positionsInfoData={positionsData}
                />
              );
            })}
        </tbody>
      </table>

      {editingOrder && (
        <OrderEditor
          marketsInfoData={marketsInfoData}
          tokensData={tokensData}
          positionsData={positionsData}
          order={editingOrder}
          onClose={() => setEditingOrderKey(undefined)}
          setPendingTxns={p.setPendingTxns}
        />
      )}
    </>
  );
}
