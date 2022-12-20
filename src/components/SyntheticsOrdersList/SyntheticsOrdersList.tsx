import { Trans } from "@lingui/macro";
import { SyntheticsOrder } from "components/SyntheticsOrder/SyntheticsOrder";
import { getOrders } from "domain/synthetics/orders";
import { useOrdersData } from "domain/synthetics/orders/useOrdersData";
import { useChainId } from "lib/chains";

export function SyntheticsOrdersList() {
  const { chainId } = useChainId();

  const ordersData = useOrdersData(chainId);
  const orders = getOrders(ordersData);

  return (
    <div>
      <table className="Exchange-list Orders App-box">
        <tbody>
          <tr className="Exchange-list-header">
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
          </tr>
          {orders.map((order) => (
            <SyntheticsOrder key={order.key} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
