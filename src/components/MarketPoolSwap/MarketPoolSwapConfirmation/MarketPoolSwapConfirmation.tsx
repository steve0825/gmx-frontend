import { t, Trans } from "@lingui/macro";
import cx from "classnames";
import { InfoRow } from "components/InfoRow/InfoRow";
import Modal from "components/Modal/Modal";
import { SubmitButton } from "components/SubmitButton/SubmitButton";
import { formatPriceImpact } from "domain/synthetics/priceImpact/utils";
import { TokenAllowanceData, TokensData } from "domain/synthetics/tokens/types";

import { ApproveTokenButton } from "components/ApproveTokenButton/ApproveTokenButton";
import {
  convertToUsdByPrice,
  formatTokenAmount,
  formatTokenAmountWithUsd,
  getTokenAllowance,
  getTokenConfig,
  getUsdFromTokenAmount,
  MOCK_GM_PRICE,
} from "domain/synthetics/tokens/utils";
import { BigNumber } from "ethers";
import { GM_DECIMALS } from "lib/legacy";
import { OperationType, operationTypesTexts } from "../constants";

import { useWeb3React } from "@web3-react/core";
import { getContract } from "config/contracts";
import { getToken } from "config/tokens";
import { createMarketDepositTxn } from "domain/synthetics/markets/createMarketDepositTxn";
import { useMarkets } from "domain/synthetics/markets/useMarkets";
import { getMarket } from "domain/synthetics/markets/utils";
import { PriceImpactData } from "domain/synthetics/priceImpact/types";
import { useTokenAllowance } from "domain/synthetics/tokens/useTokenAllowance";
import { useChainId } from "lib/chains";
import "./MarketPoolSwapConfirmation.scss";

type Props = {
  onClose: () => void;
  priceImpact?: PriceImpactData;
  firstSwapTokenAddress: string;
  firstSwapTokenAmount: BigNumber;
  secondSwapTokenAddress?: string;
  secondSwapTokenAmount?: BigNumber;
  marketTokenAddress: string;
  gmSwapAmount: BigNumber;
  tokensData: TokensData;
  operationType: OperationType;
  onSubmit: () => void;
};

function getTokenText(tokensData: TokensData, tokenAddress?: string, swapAmount?: BigNumber) {
  if (!tokenAddress || !swapAmount) return undefined;

  const usdAmount = getUsdFromTokenAmount(tokensData, tokenAddress, swapAmount);
  const token = getTokenConfig(tokensData, tokenAddress);

  if (!usdAmount || !token) return undefined;

  return formatTokenAmountWithUsd(swapAmount, usdAmount, token.symbol, token.decimals);
}

function needTokenApprove(tokenAllowanceData: TokenAllowanceData, tokenAddress?: string, tokenAmount?: BigNumber) {
  if (!tokenAddress || !tokenAmount) return false;

  const allowance = getTokenAllowance(tokenAllowanceData, tokenAddress);

  return !allowance || tokenAmount.gt(allowance);
}

export function MarketPoolSwapConfirmation(p: Props) {
  const { library, account } = useWeb3React();
  const { chainId } = useChainId();
  const routerAddress = getContract(chainId, "SyntheticsRouter");

  const tokenAllowanceData = useTokenAllowance(chainId, {
    spenderAddress: routerAddress,
    tokenAddresses: [p.firstSwapTokenAddress, p.marketTokenAddress, p.secondSwapTokenAddress!].filter(Boolean),
  });

  const marketsData = useMarkets(chainId);

  const isDeposit = p.operationType === OperationType.deposit;

  const firstTokenText = getTokenText(p.tokensData, p.firstSwapTokenAddress, p.firstSwapTokenAmount);
  const secondTokenText = getTokenText(p.tokensData, p.secondSwapTokenAddress, p.secondSwapTokenAmount);

  const gmUsdAmount = convertToUsdByPrice(p.gmSwapAmount, GM_DECIMALS, MOCK_GM_PRICE);
  const gmTokenText = formatTokenAmountWithUsd(p.gmSwapAmount, gmUsdAmount, "GM", GM_DECIMALS);

  const market = getMarket(marketsData, p.marketTokenAddress);
  const firstToken = p.firstSwapTokenAddress ? getToken(chainId, p.firstSwapTokenAddress) : undefined;
  const secondToken = p.secondSwapTokenAddress ? getToken(chainId, p.secondSwapTokenAddress) : undefined;

  const needFirstApprove =
    isDeposit && needTokenApprove(tokenAllowanceData, p.firstSwapTokenAddress, p.firstSwapTokenAmount);
  const needSecondApprove =
    isDeposit && needTokenApprove(tokenAllowanceData, p.secondSwapTokenAddress, p.secondSwapTokenAmount);
  const needMarketTokenApprove =
    !isDeposit && needTokenApprove(tokenAllowanceData, p.marketTokenAddress, p.gmSwapAmount);

  const submitButtonState = getSubmitButtonState();

  function getSubmitButtonState(): { text: string; disabled?: boolean; onClick?: () => void } {
    const operationText = p.operationType === OperationType.deposit ? t`Buy` : `Sell`;
    const text = t`Confirm ${operationText} ${formatTokenAmount(p.gmSwapAmount, GM_DECIMALS)} GM`;

    if (needFirstApprove || needSecondApprove || needMarketTokenApprove) {
      return {
        text: t`Need tokens approval`,
        disabled: true,
      };
    }

    return {
      text,
      onClick: onCreateDeposit,
    };
  }

  function onCreateDeposit() {
    if (!account) return;

    let longTokenAmount;
    let shortTokenAmount;

    if (p.firstSwapTokenAddress === market?.longTokenAddress) {
      longTokenAmount = p.firstSwapTokenAmount;
    } else if (p.firstSwapTokenAddress === market?.shortTokenAddress) {
      shortTokenAmount = p.firstSwapTokenAmount;
    }

    if (p.secondSwapTokenAddress === market?.longTokenAddress) {
      longTokenAmount = p.firstSwapTokenAmount;
    } else if (p.secondSwapTokenAddress === market?.shortTokenAddress) {
      shortTokenAmount = p.firstSwapTokenAmount;
    }

    createMarketDepositTxn(
      chainId,
      library,
      {
        account,
        longTokenAddress: market?.longTokenAddress!,
        shortTokenAddress: market?.shortTokenAddress!,
        longTokenAmount,
        shortTokenAmount,
        marketTokenAddress: p.marketTokenAddress,
        minMarketTokens: p.gmSwapAmount,
      },
      {
        successMsg: t`Deposit created`,
        failMsg: t`Deposit failed`,
        sentMsg: t`Deposit submitted`,
      }
    );
  }

  return (
    <div className="Confirmation-box">
      <Modal
        isVisible={true}
        setIsVisible={p.onClose}
        label={t`Confirm ${operationTypesTexts[p.operationType]}`}
        allowContentTouchMove
      >
        <div className={cx("Confirmation-box-main MarketPoolSwapConfirmation-main")}>
          {p.operationType === OperationType.deposit && (
            <>
              <div>
                <Trans>Pay</Trans>&nbsp;{firstTokenText}
              </div>
              {secondTokenText && (
                <div>
                  <Trans>Pay</Trans>&nbsp;{secondTokenText}
                </div>
              )}
              <div className="Confirmation-box-main-icon"></div>
              <div>
                <Trans>Receive</Trans>&nbsp;{gmTokenText}
              </div>
            </>
          )}
          {p.operationType === OperationType.withdraw && (
            <>
              <div>
                <Trans>Pay</Trans>&nbsp;{gmTokenText}
              </div>
              <div className="Confirmation-box-main-icon"></div>
              <div>
                <Trans>Receive</Trans>&nbsp;{firstTokenText}
              </div>
              {secondTokenText && (
                <div>
                  <Trans>Receive</Trans>&nbsp;{secondTokenText}
                </div>
              )}
            </>
          )}
        </div>

        <InfoRow
          label={t`Price impact`}
          value={p.priceImpact?.priceImpact.gt(0) ? formatPriceImpact(p.priceImpact) : "..."}
        />

        <div className="App-card-divider" />

        <div className="MarketPoolSwapConfirmation-approve-tokens">
          {needFirstApprove && firstToken && (
            <div className="MarketPoolSwapConfirmation-approve-token">
              <ApproveTokenButton
                tokenAddress={p.firstSwapTokenAddress}
                tokenSymbol={firstToken?.symbol}
                spenderAddress={routerAddress}
              />
            </div>
          )}

          {needSecondApprove && secondToken && (
            <div className="MarketPoolSwapConfirmation-approve-token">
              <ApproveTokenButton
                tokenAddress={p.secondSwapTokenAddress!}
                tokenSymbol={secondToken?.symbol}
                spenderAddress={routerAddress}
              />
            </div>
          )}

          {needMarketTokenApprove && p.marketTokenAddress && (
            <div className="MarketPoolSwapConfirmation-approve-token">
              <ApproveTokenButton
                tokenAddress={p.marketTokenAddress}
                tokenSymbol={"GM"}
                spenderAddress={routerAddress}
              />
            </div>
          )}
        </div>

        <div className="App-card-divider" />

        <div className="Confirmation-box-row">
          <SubmitButton onClick={submitButtonState.onClick} disabled={submitButtonState.disabled}>
            {submitButtonState.text}
          </SubmitButton>
        </div>
      </Modal>
    </div>
  );
}
