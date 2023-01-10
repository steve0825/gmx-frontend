import { Trans, t } from "@lingui/macro";
import { useWeb3React } from "@web3-react/core";
import BuyInputSection from "components/BuyInputSection/BuyInputSection";
import { InfoRow } from "components/InfoRow/InfoRow";
import Modal from "components/Modal/Modal";
import { SubmitButton } from "components/SubmitButton/SubmitButton";
import Tab from "components/Tab/Tab";
import { useTokenInputState } from "domain/synthetics/exchange";
import { getExecutionFee } from "domain/synthetics/fees";
import { OrderType, createIncreaseOrderTxn, getNextCollateralUsdForDecreaseOrder } from "domain/synthetics/orders";
import { AggregatedPositionData, formatLeverage, getLeverage, getLiquidationPrice } from "domain/synthetics/positions";
import {
  formatTokenAmount,
  formatUsdAmount,
  getTokenAmountFromUsd,
  getUsdFromTokenAmount,
  useAvailableTokensData,
} from "domain/synthetics/tokens";
import { BigNumber } from "ethers";
import { useChainId } from "lib/chains";
import { DEFAULT_SLIPPAGE_AMOUNT, USD_DECIMALS } from "lib/legacy";
import { formatAmountFree, parseValue } from "lib/numbers";
import { useEffect, useState } from "react";
import Tooltip from "components/Tooltip/Tooltip";
import { ValueTransition } from "components/ValueTransition/ValueTransition";

import "./PositionEditor.scss";
import { useContractEvents } from "domain/synthetics/contractEvents";

type Props = {
  position: AggregatedPositionData;
  onClose: () => void;
};

enum Operation {
  Deposit = "Deposit",
  Withdraw = "Withdraw",
}

const operationLabels = {
  [Operation.Deposit]: t`Deposit`,
  [Operation.Withdraw]: t`Withdraw`,
};

export function PositionEditor(p: Props) {
  const { chainId } = useChainId();
  const { account, library } = useWeb3React();
  const { setPendingPositionUpdate } = useContractEvents();
  const [operation, setOperation] = useState(Operation.Deposit);
  const isDeposit = operation === Operation.Deposit;

  const { tokensData } = useAvailableTokensData(chainId);

  const depositInput = useTokenInputState(tokensData, { useMaxPrice: false });

  const [withdrawUsdInputValue, setWithdrawUsdInputValue] = useState("");
  const maxWithdrawUsd = p.position.collateralUsd;
  const withdrawUsd = parseValue(withdrawUsdInputValue, USD_DECIMALS);
  const withdrawTokenAmount = getTokenAmountFromUsd(tokensData, p.position.collateralToken?.address, withdrawUsd);

  const executionFee = getExecutionFee(tokensData);

  const collateralDeltaAmount = isDeposit ? depositInput.tokenAmount : withdrawTokenAmount;
  const collateralDeltaUsd = getUsdFromTokenAmount(
    tokensData,
    p.position.collateralToken?.address,
    collateralDeltaAmount
  );

  const nextCollateralUsd = isDeposit
    ? p.position.collateralUsd?.add(collateralDeltaUsd || BigNumber.from(0))
    : getNextCollateralUsdForDecreaseOrder({
        sizeDeltaUsd: BigNumber.from(0),
        collateralUsd: p.position.collateralUsd,
        collateralDeltaUsd,
        pnl: p.position.pnl,
      });

  const nextLeverage = getLeverage({
    sizeUsd: p.position.sizeInUsd,
    collateralUsd: nextCollateralUsd,
  });

  const nextLiqPrice = getLiquidationPrice({
    sizeUsd: p.position.sizeInUsd,
    collateralUsd: nextCollateralUsd,
    averagePrice: p.position.averagePrice,
    isLong: p.position.isLong,
  });

  // needApproval = isDeposit && tokenAllowance && fromAmount && fromAmount.gt(tokenAllowance);

  function getError() {
    if (!collateralDeltaAmount || collateralDeltaAmount.eq(0)) {
      return [t`Enter an amount`];
    }

    if (collateralDeltaAmount.lte(0)) {
      return [t`Amount should be greater than zero`];
    }

    // if (!isDeposit && fromAmount) {
    //   if (position.collateralAfterFee.sub(fromAmount).lt(MIN_ORDER_USD)) {
    //     return [t`Min residual collateral: 10 USD`];
    //   }
    // }

    // if (!isDeposit && fromAmount && nextLiquidationPrice) {
    //   if (position.isLong && position.markPrice.lt(nextLiquidationPrice)) {
    //     return [t`Invalid liq. price`, ErrorDisplayType.Tooltip, ErrorCode.InvalidLiqPrice];
    //   }
    //   if (!position.isLong && position.markPrice.gt(nextLiquidationPrice)) {
    //     return [t`Invalid liq. price`, ErrorDisplayType.Tooltip, ErrorCode.InvalidLiqPrice];
    //   }
    // }

    // if (nextLeverageExcludingPnl && nextLeverageExcludingPnl.lt(1.1 * BASIS_POINTS_DIVISOR)) {
    //   return [t`Min leverage: 1.1x`];
    // }

    // if (nextLeverage && nextLeverage.gt(MAX_ALLOWED_LEVERAGE)) {
    //   return [t`Max leverage: ${(MAX_ALLOWED_LEVERAGE / BASIS_POINTS_DIVISOR).toFixed(1)}x`];
    // }
  }

  function getSubmitButtonState(): { text: string; disabled?: boolean; onClick?: () => void } {
    const error = getError();

    if (error) {
      return {
        text: error[0],
        disabled: true,
      };
    }

    return {
      text: operationLabels[operation],
      disabled: false,
      onClick: onSubmit,
    };
  }

  function onSubmit() {
    if (!account || !executionFee?.feeTokenAmount || !p.position.indexToken) return;

    if (operation === Operation.Deposit) {
      createIncreaseOrderTxn(chainId, library, {
        account,
        market: p.position.marketAddress,
        indexTokenAddress: p.position.indexToken.address,
        swapPath: [],
        initialCollateralAddress: p.position.collateralTokenAddress,
        initialCollateralAmount: depositInput.tokenAmount,
        priceImpactDelta: BigNumber.from(1),
        allowedSlippage: DEFAULT_SLIPPAGE_AMOUNT,
        orderType: OrderType.MarketIncrease,
        sizeDeltaUsd: BigNumber.from(0),
        isLong: p.position.isLong,
        executionFee: executionFee.feeTokenAmount,
        tokensData,
        setPendingPositionUpdate,
      });
    } else {
      if (!withdrawTokenAmount) return;

      // createDecreaseOrderTxn(chainId, library, {
      //   account,
      //   market: position.marketAddress,
      //   indexTokenAddress: indexToken.address,
      //   swapPath: [],
      //   initialCollateralAddress: position.collateralTokenAddress,
      //   initialCollateralAmount: withdrawTokenAmount,
      //   receiveTokenAddress: position.collateralTokenAddress,
      //   sizeDeltaUsd: BigNumber.from(0),
      //   acceptablePrice: acceptablePrice!,
      //   minOutputAmount: withdrawTokenAmount,
      //   orderType: OrderType.MarketDecrease,
      //   isLong: position.isLong,
      //   executionFee: executionFee.feeTokenAmount,
      //   tokensData,
      // });
    }
  }

  useEffect(
    function updateInputsByPosition() {
      if (p.position.collateralToken?.address) {
        if (p.position.collateralToken.address !== depositInput.tokenAddress) {
          depositInput.setTokenAddress(p.position.collateralToken.address);
        }
      }
    },
    [depositInput, p.position.collateralToken?.address]
  );

  const submitButtonState = getSubmitButtonState();

  return (
    <div className="PositionEditor">
      <Modal
        className="PositionSeller-modal"
        isVisible={true}
        setIsVisible={p.onClose}
        label={
          <Trans>
            Edit {p.position?.isLong ? t`Long` : t`Short`} {p.position.indexToken?.symbol}
          </Trans>
        }
        allowContentTouchMove
      >
        <Tab
          onChange={setOperation}
          option={operation}
          options={Object.values(Operation)}
          optionLabels={operationLabels}
          className="SwapBox-option-tabs PositionEditor-tabs"
        />

        {operation === Operation.Deposit && (
          <BuyInputSection
            topLeftLabel={t`Deposit`}
            topLeftValue={formatUsdAmount(depositInput.usdAmount)}
            topRightLabel={t`Max`}
            topRightValue={formatTokenAmount(depositInput.balance, depositInput.token?.decimals)}
            inputValue={depositInput.inputValue}
            onInputValueChange={(e) => depositInput.setInputValue(e.target.value)}
            showMaxButton={depositInput.shouldShowMaxButton}
            onClickMax={() => depositInput.setValueByTokenAmount(depositInput.balance)}
          >
            {depositInput.token?.symbol}
          </BuyInputSection>
        )}

        {operation === Operation.Withdraw && (
          <BuyInputSection
            topLeftLabel={t`Withdraw`}
            topLeftValue={formatTokenAmount(
              withdrawTokenAmount,
              p.position.collateralToken?.decimals,
              p.position.collateralToken?.symbol
            )}
            topRightLabel={t`Max`}
            topRightValue={formatUsdAmount(maxWithdrawUsd)}
            inputValue={withdrawUsdInputValue}
            onInputValueChange={(e) => setWithdrawUsdInputValue(e.target.value)}
            showMaxButton={maxWithdrawUsd?.gt(0) && !withdrawUsd?.eq(maxWithdrawUsd)}
            onClickMax={() =>
              maxWithdrawUsd && setWithdrawUsdInputValue(formatAmountFree(maxWithdrawUsd, USD_DECIMALS, 2))
            }
          >
            USD
          </BuyInputSection>
        )}

        <div className="PositionEditor-info-box">
          {/* {minExecutionFeeErrorMessage && <div className="Confirmation-box-warning">{minExecutionFeeErrorMessage}</div>} */}
          <InfoRow label={t`Size`} value={formatUsdAmount(p.position.sizeInUsd)} />
          <InfoRow
            label={t`Collateral (${p.position.collateralToken?.symbol})`}
            value={
              <ValueTransition
                from={formatUsdAmount(p.position.collateralUsdAfterFees)}
                to={
                  nextCollateralUsd &&
                  p.position.collateralUsdAfterFees &&
                  !nextCollateralUsd.eq(p.position.collateralUsdAfterFees)
                    ? formatUsdAmount(nextCollateralUsd)
                    : undefined
                }
              />
            }
          />
          <InfoRow
            label={t`Leverage`}
            value={
              <ValueTransition
                from={formatLeverage(p.position.leverage)}
                to={
                  p.position.leverage && nextLeverage && !nextLeverage.eq(p.position.leverage)
                    ? formatLeverage(nextLeverage)
                    : undefined
                }
              />
            }
          />
          <InfoRow label={t`Mark Price`} value={formatUsdAmount(p.position.markPrice)} />
          <InfoRow
            label={t`Liq Price`}
            value={
              <ValueTransition
                from={formatUsdAmount(p.position.liqPrice)}
                to={
                  nextLiqPrice && p.position.liqPrice && !nextLiqPrice.eq(p.position.liqPrice)
                    ? formatUsdAmount(nextLiqPrice)
                    : undefined
                }
              />
            }
          />

          {p.position.pendingBorrowingFees?.gt(0) && withdrawUsd?.gt(0) && (
            <InfoRow
              label={t`Borrow Fee`}
              value={
                <Tooltip
                  handle={
                    <ValueTransition
                      from={formatUsdAmount(p.position.pendingBorrowingFees)}
                      to={formatUsdAmount(BigNumber.from(0))}
                    />
                  }
                  position="right-top"
                  renderContent={() => <Trans>The pending borrow fee will be charged on this transaction.</Trans>}
                />
              }
            />
          )}

          {p.position.pendingFundingFeesUsd?.gt(0) && withdrawUsd?.gt(0) && (
            <InfoRow
              label={t`Funding Fee`}
              value={
                <Tooltip
                  handle={
                    <ValueTransition
                      from={formatUsdAmount(p.position.pendingFundingFeesUsd)}
                      to={formatUsdAmount(BigNumber.from(0))}
                    />
                  }
                  position="right-top"
                  renderContent={() => <Trans>The pending funding fee will be charged on this transaction.</Trans>}
                />
              }
            />
          )}

          <InfoRow
            label={t`Fees and price impact`}
            value={<Tooltip handle={"$0.00"} position="right-top" renderContent={() => "TODO"} />}
          />
        </div>

        <div className="Exchange-swap-button-container">
          <SubmitButton onClick={submitButtonState.onClick} disabled={submitButtonState.disabled} authRequired>
            {submitButtonState.text}
          </SubmitButton>
        </div>
      </Modal>
    </div>
  );
}
