import { Trans, t } from "@lingui/macro";
import cx from "classnames";
import PositionDropdown from "components/Exchange/PositionDropdown";
import StatsTooltipRow from "components/StatsTooltip/StatsTooltipRow";
import Tooltip from "components/Tooltip/Tooltip";
import {
  AggregatedOrdersData,
  getPositionOrders,
  getTriggerPricePrefix,
  isIncreaseOrder,
} from "domain/synthetics/orders";
import { AggregatedPositionData, formatLeverage, formatPnl } from "domain/synthetics/positions";
import { formatUsdAmount } from "domain/synthetics/tokens";
import { AiOutlineEdit } from "react-icons/ai";

import "./PositionItem.scss";
import { ImSpinner2 } from "react-icons/im";

export type Props = {
  position: AggregatedPositionData;
  ordersData: AggregatedOrdersData;
  positionOrders?: any[];
  hideActions?: boolean;
  showPnlAfterFees?: boolean;
  onClosePositionClick?: () => void;
  onEditCollateralClick?: () => void;
  onShareClick?: () => void;
  onSelectMarketClick?: () => void;
  onOrdersClick?: () => void;
  isLarge: boolean;
};

export function PositionItem(p: Props) {
  const positionOrders = getPositionOrders(
    p.ordersData,
    p.position.marketAddress,
    p.position.collateralTokenAddress,
    p.position.isLong
  );

  // TODO:
  const hasOrderError = false;

  function renderNetValue() {
    return (
      <Tooltip
        handle={formatUsdAmount(p.position.netValue)}
        position={p.isLarge ? "left-bottom" : "right-bottom"}
        handleClassName="plain"
        renderContent={() => (
          <div>
            {p.showPnlAfterFees
              ? t`Net Value: Initial Collateral + PnL - Fees`
              : t`Net Value: Initial Collateral + PnL - Borrow Fee - Funding Fee`}
            <br />
            <br />
            <StatsTooltipRow
              label={t`Initial Collateral`}
              value={formatUsdAmount(p.position.collateralUsd)}
              showDollar={false}
            />
            <StatsTooltipRow label={t`PnL`} value={formatUsdAmount(p.position?.pnl)} showDollar={false} />
            <StatsTooltipRow
              label={t`Borrow fee:`}
              value={formatUsdAmount(p.position.pendingBorrowingFees?.mul(-1))}
              showDollar={false}
            />
            <StatsTooltipRow
              label={t`Funding fee:`}
              value={formatUsdAmount(p.position.pendingFundingFeesUsd?.mul(-1))}
              showDollar={false}
            />
            <StatsTooltipRow label={t`Open + Close fee`} showDollar={false} value={"-$0.00"} />
            <br />
            <StatsTooltipRow
              label={t`PnL After Fees`}
              value={formatPnl(p.position.pnlAfterFees, p.position.pnlAfterFeesPercentage)}
              showDollar={false}
            />
          </div>
        )}
      />
    );
  }

  function renderCollateral() {
    return (
      <>
        <Tooltip
          handle={`${formatUsdAmount(p.position.collateralUsdAfterFees)}`}
          position={p.isLarge ? "left-bottom" : "right-bottom"}
          handleClassName={cx("plain", { negative: p.position.hasLowCollateral })}
          renderContent={() => {
            return (
              <>
                {p.position.hasLowCollateral && (
                  <div>
                    <Trans>
                      WARNING: This position has a low amount of collateral after deducting fees, deposit more
                      collateral to reduce the position's liquidation risk.
                    </Trans>
                    <br />
                    <br />
                  </div>
                )}
                <StatsTooltipRow
                  label={t`Initial Collateral`}
                  value={formatUsdAmount(p.position.collateralUsd)}
                  showDollar={false}
                />
                <StatsTooltipRow label={t`Borrow Fee`} showDollar={false} value={"..."} />
                <StatsTooltipRow showDollar={false} label={t`Borrow Fee / Day`} value={"..."} />
                <br />
                <StatsTooltipRow
                  label={t`Collateral In`}
                  value={p.position.collateralToken?.symbol || "..."}
                  showDollar={false}
                />
                <br />
                <Trans>Use the Edit Collateral icon to deposit or withdraw collateral.</Trans>
              </>
            );
          }}
        />
        {!p.hideActions && p.onEditCollateralClick && (
          <span className="edit-icon" onClick={p.onEditCollateralClick}>
            <AiOutlineEdit fontSize={16} />
          </span>
        )}
      </>
    );
  }

  function renderPositionOrders() {
    if (positionOrders.length === 0) return null;

    return (
      <div onClick={p.onOrdersClick}>
        <Tooltip
          handle={t`Orders (${positionOrders.length})`}
          position="left-bottom"
          handleClassName={cx(["Exchange-list-info-label", "Exchange-position-list-orders", "plain", "clickable"], {
            muted: !hasOrderError,
            negative: hasOrderError,
          })}
          renderContent={() => {
            return (
              <>
                <strong>
                  <Trans>Active Orders</Trans>
                </strong>
                {positionOrders.map((order) => {
                  return (
                    <div key={order.key} className="Position-list-order active-order-tooltip">
                      {getTriggerPricePrefix(order.orderType, order.isLong)} {formatUsdAmount(order.triggerPrice)}:
                      {isIncreaseOrder(order.orderType) ? "+" : "-"}
                      {formatUsdAmount(order.sizeDeltaUsd)}
                      {/* TODO: */}
                      {/* {order.error && <div className="negative active-oredr-error">{order.error}</div>} */}
                    </div>
                  );
                })}
              </>
            );
          }}
        />
      </div>
    );
  }

  function renderLarge() {
    return (
      <tr className="Exhange-list-item">
        <td className="clickable" onClick={p.onSelectMarketClick}>
          {/* title */}
          <div className="Exchange-list-title">
            <Tooltip
              handle={p.position.indexToken?.symbol}
              position="left-bottom"
              handleClassName="plain"
              renderContent={() => (
                <div>
                  <StatsTooltipRow label={t`Market`} value={p.position.marketName || ""} showDollar={false} />
                </div>
              )}
            />
            {p.position.pendingUpdate && <ImSpinner2 className="spin position-loading-icon" />}
          </div>
          <div className="Exchange-list-info-label" onClick={p.onSelectMarketClick}>
            <span className="muted">{formatLeverage(p.position.leverage)}&nbsp;</span>
            <span className={cx({ positive: p.position.isLong, negative: !p.position.isLong })}>
              {p.position.isLong ? t`Long` : t`Short`}
            </span>
          </div>
        </td>
        <td>
          {/* netValue */}
          {!p.position.netValue && t`Updating...`}
          {p.position.netValue && renderNetValue()}
          {p.position.pnl && (
            <div
              className={cx("Exchange-list-info-label", {
                positive: p.position.pnl.gt(0),
                negative: p.position.pnl.lt(0),
                muted: p.position.pnl.eq(0),
              })}
            >
              {formatPnl(p.position.pnl, p.position.pnlPercentage)}
            </div>
          )}
        </td>
        <td>
          {/* size */}
          {formatUsdAmount(p.position.sizeInUsd)}
          {renderPositionOrders()}
        </td>
        <td>
          {/* collateral */}
          <div className="position-list-collateral">{renderCollateral()}</div>
        </td>
        <td className="clickable" onClick={p.onSelectMarketClick}>
          {/* markPrice */}
          <Tooltip
            handle={formatUsdAmount(p.position.markPrice)}
            position="left-bottom"
            handleClassName="plain clickable"
            renderContent={() => {
              return (
                <div>
                  <Trans>
                    Click on a row to select the position's market, then use the swap box to increase your position
                    size, or to set stop-loss / take-profit orders. if needed.
                  </Trans>
                  <br />
                  <br />
                  <Trans>Use the "Close" button to reduce your position size</Trans>
                </div>
              );
            }}
          />
        </td>
        <td>
          {/* entryPrice */}
          {formatUsdAmount(p.position.entryPrice)}
        </td>
        <td>
          {/* liqPrice */}
          {formatUsdAmount(p.position.liqPrice)}
        </td>
        <td>
          {/* Close */}
          <button
            className="Exchange-list-action"
            onClick={p.onClosePositionClick}
            disabled={p.position.sizeInUsd.eq(0)}
          >
            <Trans>Close</Trans>
          </button>
        </td>
        <td>
          <PositionDropdown handleEditCollateral={p.onEditCollateralClick} handleMarketSelect={p.onSelectMarketClick} />
        </td>
      </tr>
    );
  }

  function renderSmall() {
    return (
      <div className="App-card">
        <div className="App-card-title">
          <span className="Exchange-list-title">{p.position.indexToken?.symbol}</span>
          {p.position.pendingUpdate && <ImSpinner2 className="spin position-loading-icon" />}
        </div>
        <div className="App-card-divider" />
        <div className="App-card-content">
          <div className="App-card-row">
            <div className="label">
              <Trans>Market</Trans>
            </div>
            <div>{p.position.marketName}</div>
          </div>
          <div className="App-card-row">
            <div className="label">
              <Trans>Leverage</Trans>
            </div>
            <div>
              {formatLeverage(p.position.leverage)}&nbsp;
              <span
                className={cx("Exchange-list-side", {
                  positive: p.position.isLong,
                  negative: !p.position.isLong,
                })}
              >
                {p.position.isLong ? t`Long` : t`Short`}
              </span>
            </div>
          </div>
          <div className="App-card-row">
            <div className="label">
              <Trans>Size</Trans>
            </div>
            <div>{formatUsdAmount(p.position.sizeInUsd)}</div>
          </div>
          <div className="App-card-row">
            <div className="label">
              <Trans>Collateral</Trans>
            </div>
            <div className="position-list-collateral">{renderCollateral()}</div>
          </div>
          <div className="App-card-row">
            <div className="label">
              <Trans>PnL</Trans>
            </div>
            <div>
              <span
                className={cx("Exchange-list-info-label", {
                  positive: p.position.pnl?.gt(0),
                  negative: p.position.pnl && p.position.pnl.lt(0),
                  muted: p.position.pnl?.eq(0),
                })}
              >
                {formatPnl(p.position.pnl, p.position.pnlPercentage)}
              </span>
            </div>
          </div>
          <div className="App-card-row">
            <div className="label">
              <Trans>Net Value</Trans>
            </div>
            <div>{renderNetValue()}</div>
          </div>
          <div className="App-card-row">
            <div className="label">
              <Trans>Orders</Trans>
            </div>
            <div>
              {!p.positionOrders?.length && "None"}
              {renderPositionOrders()}
            </div>
          </div>
        </div>
        <div className="App-card-divider" />
        <div className="App-card-content">
          <div className="App-card-row">
            <div className="label">
              <Trans>Mark Price</Trans>
            </div>
            <div>{formatUsdAmount(p.position.markPrice)}</div>
          </div>
          <div className="App-card-row">
            <div className="label">
              <Trans>Entry Price</Trans>
            </div>
            <div>{formatUsdAmount(p.position.entryPrice)}</div>
          </div>
          <div className="App-card-row">
            <div className="label">
              <Trans>Liq. Price</Trans>
            </div>
            <div>{formatUsdAmount(p.position.liqPrice)}</div>
          </div>
        </div>
        {!p.hideActions && (
          <>
            <div className="App-card-divider"></div>
            <div className="App-card-options Position-buttons-container">
              <button
                className="App-button-option App-card-option"
                disabled={p.position.sizeInUsd.eq(0)}
                onClick={p.onClosePositionClick}
              >
                <Trans>Close</Trans>
              </button>
              <button
                className="App-button-option App-card-option"
                disabled={p.position.sizeInUsd.eq(0)}
                onClick={p.onEditCollateralClick}
              >
                <Trans>Edit Collateral</Trans>
              </button>
              {/* <button
                  className="Exchange-list-action App-button-option App-card-option"
                  onClick={p.onShareClick}
                  disabled={p.position.sizeInUsd.eq(0)}
                >
                  <Trans>Share</Trans>
                </button> */}
            </div>
          </>
        )}
      </div>
    );
  }

  return p.isLarge ? renderLarge() : renderSmall();
}
