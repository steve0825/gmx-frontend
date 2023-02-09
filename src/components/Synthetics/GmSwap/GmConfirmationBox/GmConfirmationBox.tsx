import { Trans, plural, t } from "@lingui/macro";
import { useWeb3React } from "@web3-react/core";
import cx from "classnames";
import { ApproveTokenButton } from "components/ApproveTokenButton/ApproveTokenButton";
import Modal from "components/Modal/Modal";
import { SubmitButton } from "components/SubmitButton/SubmitButton";
import { getContract } from "config/contracts";
import { convertTokenAddress, getToken } from "config/tokens";
import { createDepositTxn } from "domain/synthetics/markets/createDepositTxn";
import { createWithdrawalTxn } from "domain/synthetics/markets/createWithdrawalTxn";
import { convertToUsd, getTokenData, needTokenApprove } from "domain/synthetics/tokens";
import { TokensData } from "domain/synthetics/tokens/types";
import { useTokenAllowanceData } from "domain/synthetics/tokens/useTokenAllowanceData";
import { Token } from "domain/tokens";
import { BigNumber } from "ethers";
import { useChainId } from "lib/chains";
import { useMemo } from "react";
import { GmSwapFees, Operation, PoolDelta, getSubmitError, operationLabels } from "../utils";

import {
  getMarket,
  getMarketTokenData,
  useMarketTokensData,
  useMarketsData,
  useMarketsPoolsData,
} from "domain/synthetics/markets";
import { useAvailableTokensData } from "domain/synthetics/tokens";

import ExchangeInfoRow from "components/Exchange/ExchangeInfoRow";
import { ExecutionFee } from "domain/synthetics/fees";
import { formatTokenAmount, formatTokenAmountWithUsd } from "lib/numbers";
import { GmFees } from "../GmFees/GmFees";
import "./GmConfirmationBox.scss";

type Props = {
  onClose: () => void;
  marketTokenAddress: string;
  marketTokenAmount: BigNumber;
  longDelta?: PoolDelta;
  shortDelta?: PoolDelta;
  fees?: GmSwapFees;
  tokensData: TokensData;
  operationType: Operation;
  executionFee?: ExecutionFee;
  onSubmitted: () => void;
};

function getTokenText(token?: Token, tokenAmount?: BigNumber, price?: BigNumber) {
  if (!token || !price || !tokenAmount?.gt(0)) return undefined;

  const usdAmount = convertToUsd(tokenAmount, token.decimals, price);

  return formatTokenAmountWithUsd(tokenAmount, usdAmount, token.symbol, token.decimals);
}

export function GmConfirmationBox(p: Props) {
  const { library, account } = useWeb3React();
  const { chainId } = useChainId();
  const routerAddress = getContract(chainId, "SyntheticsRouter");

  const tokenAddresses = [p.longDelta?.tokenAddress, p.shortDelta?.tokenAddress, p.marketTokenAddress]
    .filter(Boolean)
    .map((addr) => convertTokenAddress(chainId, addr!, "wrapped")) as string[];

  const { marketsData } = useMarketsData(chainId);
  const { marketTokensData } = useMarketTokensData(chainId);
  const { poolsData } = useMarketsPoolsData(chainId);
  const { tokensData } = useAvailableTokensData(chainId);

  const { tokenAllowanceData } = useTokenAllowanceData(chainId, {
    spenderAddress: routerAddress,
    tokenAddresses,
  });

  const isDeposit = p.operationType === Operation.Deposit;

  const market = getMarket(marketsData, p.marketTokenAddress);

  const marketToken = getMarketTokenData(marketTokensData, p.marketTokenAddress);
  const longToken = getTokenData(tokensData, market?.longTokenAddress);
  const shortToken = getTokenData(tokensData, market?.shortTokenAddress);

  const longTokenText = getTokenText(longToken, p.longDelta?.tokenAmount, longToken?.prices?.maxPrice);
  const shortTokenText = getTokenText(shortToken, p.shortDelta?.tokenAmount, shortToken?.prices?.maxPrice);
  const marketTokenText = getTokenText(marketToken, p.marketTokenAmount, marketToken?.prices?.maxPrice);

  const isAllowanceLoaded = Object.keys(tokenAllowanceData).length > 0;

  const tokensToApprove = useMemo(() => {
    if (isDeposit) {
      return [p.longDelta, p.shortDelta]
        .filter(
          (delta) => delta?.tokenAddress && needTokenApprove(tokenAllowanceData, delta.tokenAddress, delta.tokenAmount)
        )
        .map((delta) => delta!.tokenAddress);
    } else {
      if (needTokenApprove(tokenAllowanceData, p.marketTokenAddress, p.marketTokenAmount)) {
        return [p.marketTokenAddress];
      }

      return [];
    }
  }, [isDeposit, p.longDelta, p.marketTokenAddress, p.marketTokenAmount, p.shortDelta, tokenAllowanceData]);

  function getSubmitButtonState(): { text: string; disabled?: boolean; onClick?: () => void } {
    const error = getSubmitError({
      operation: p.operationType,
      tokensData,
      marketTokensData,
      poolsData,
      market,
      marketTokenAmount: p.marketTokenAmount,
      longDelta: p.longDelta,
      shortDelta: p.shortDelta,
    });

    if (error) {
      return {
        text: error,
        disabled: true,
      };
    }

    if (!isAllowanceLoaded || !marketToken) {
      return {
        text: t`Loading...`,
        disabled: true,
      };
    }

    if (tokensToApprove.length > 0) {
      const symbols = tokensToApprove.map((address) => {
        return address === p.marketTokenAddress ? "GM" : getTokenData(tokensData, address)!.symbol;
      });

      const symbolsText = symbols.join(", ");

      return {
        text: plural(symbols.length, {
          one: `Pending ${symbolsText} approval`,
          other: `Pending ${symbolsText} approvals`,
        }),
        disabled: true,
      };
    }

    const operationText = p.operationType === Operation.Deposit ? t`Buy` : `Sell`;
    const text = t`Confirm ${operationText} ${formatTokenAmount(p.marketTokenAmount, marketToken.decimals)} GM`;

    return {
      text,
      onClick: () => {
        if (isDeposit) {
          onCreateDeposit();
        } else {
          onCreateWithdrawal();
        }
      },
    };
  }

  function onCreateDeposit() {
    if (!account || !p.executionFee || !market) return;

    createDepositTxn(chainId, library, {
      account,
      initialLongTokenAddress: p.longDelta?.tokenAddress || market.longTokenAddress,
      initialShortTokenAddress: p.shortDelta?.tokenAddress || market.shortTokenAddress,
      longTokenAmount: p.longDelta?.tokenAmount,
      shortTokenAmount: p.shortDelta?.tokenAmount,
      marketTokenAddress: p.marketTokenAddress,
      minMarketTokens: p.marketTokenAmount!,
      executionFee: p.executionFee.feeTokenAmount,
    }).then(p.onSubmitted);
  }

  function onCreateWithdrawal() {
    if (!account || !market || !p.executionFee || !longToken?.prices || !shortToken?.prices) return;

    createWithdrawalTxn(chainId, library, {
      account,
      longTokenAddress: market.longTokenAddress,
      shortTokenAddress: market.shortTokenAddress,
      marketTokenAmount: p.marketTokenAmount,
      minLongTokenAmount: BigNumber.from(0),
      minShortTokenAmount: BigNumber.from(0),
      marketTokenAddress: p.marketTokenAddress,
      executionFee: p.executionFee.feeTokenAmount,
    }).then(p.onSubmitted);
  }

  const submitButtonState = getSubmitButtonState();

  return (
    <div className="Confirmation-box">
      <Modal
        isVisible={true}
        setIsVisible={p.onClose}
        label={t`Confirm ${operationLabels[p.operationType]}`}
        allowContentTouchMove
      >
        <div className={cx("Confirmation-box-main GmConfirmationBox-main")}>
          {p.operationType === Operation.Deposit && (
            <>
              {[longTokenText, shortTokenText].filter(Boolean).map((text) => (
                <div key={text}>
                  <Trans>Pay</Trans>&nbsp;{text}
                </div>
              ))}
              <div className="Confirmation-box-main-icon"></div>
              <div>
                <Trans>Receive</Trans>&nbsp;{marketTokenText}
              </div>
            </>
          )}
          {p.operationType === Operation.Withdrawal && (
            <>
              <div>
                <Trans>Pay</Trans>&nbsp;{marketTokenText}
              </div>
              <div className="Confirmation-box-main-icon"></div>
              {[longTokenText, shortTokenText].filter(Boolean).map((text) => (
                <div key={text}>
                  <Trans>Receive</Trans>&nbsp;{text}
                </div>
              ))}
            </>
          )}
        </div>

        <GmFees totalFees={p.fees?.totalFees} swapFee={p.fees?.swapFee} swapPriceImpact={p.fees?.swapPriceImpact} />

        <ExchangeInfoRow
          label={t`Execution Fee`}
          value={formatTokenAmountWithUsd(
            p.executionFee?.feeTokenAmount,
            p.executionFee?.feeUsd,
            p.executionFee?.feeToken.symbol,
            p.executionFee?.feeToken.decimals
          )}
        />

        {tokensToApprove && tokensToApprove.length > 0 && (
          <>
            <div className="App-card-divider" />

            <div className="GmConfirmationBox-approve-tokens">
              {tokensToApprove.map((address) => (
                <div className="GmConfirmationBox-approve-token">
                  <ApproveTokenButton
                    key={address}
                    tokenAddress={address}
                    tokenSymbol={address === p.marketTokenAddress ? "GM" : getToken(chainId, address).symbol}
                    spenderAddress={routerAddress}
                  />
                </div>
              ))}
            </div>

            <div className="App-card-divider" />
          </>
        )}
        <div className="Confirmation-box-row">
          <SubmitButton onClick={submitButtonState.onClick} disabled={submitButtonState.disabled}>
            {submitButtonState.text}
          </SubmitButton>
        </div>
      </Modal>
    </div>
  );
}
