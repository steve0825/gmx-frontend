import { t, Trans } from "@lingui/macro";
import cx from "classnames";
import BuyInputSection from "components/BuyInputSection/BuyInputSection";
import Checkbox from "components/Checkbox/Checkbox";
import { Dropdown, DropdownOption } from "components/Dropdown/Dropdown";
import { SubmitButton } from "components/SubmitButton/SubmitButton";
import { GmFees } from "components/Synthetics/GmSwap/GmFees/GmFees";
import Tab from "components/Tab/Tab";
import TokenSelector from "components/TokenSelector/TokenSelector";
import { HIGH_PRICE_IMPACT_BPS } from "config/factors";
import { SYNTHETICS_MARKET_DEPOSIT_TOKEN_KEY } from "config/localStorage";
import { convertTokenAddress, NATIVE_TOKEN_ADDRESS } from "config/tokens";
import {
  estimateExecuteDepositGasLimit,
  estimateExecuteWithdrawalGasLimit,
  FeeItem,
  getExecutionFee,
  getFeeItem,
  getTotalFeeItem,
  useGasPrice,
} from "domain/synthetics/fees";
import { useGasLimitsConfig } from "domain/synthetics/fees/useGasLimitsConfig";
import { useMarketsInfo, useMarketTokensData } from "domain/synthetics/markets";
import { Market } from "domain/synthetics/markets/types";
import { getAvailableUsdLiquidityForCollateral, getPoolUsd } from "domain/synthetics/markets/utils";
import { adaptToV1InfoTokens, convertToUsd, getTokenData, useAvailableTokensData } from "domain/synthetics/tokens";
import { GmSwapFees } from "domain/synthetics/trade";
import {
  getNextDepositAmountsByCollaterals,
  getNextDepositAmountsByMarketToken,
} from "domain/synthetics/trade/utils/deposit";
import {
  getNextWithdrawalAmountsByCollaterals,
  getNextWithdrawalAmountsByMarketToken,
} from "domain/synthetics/trade/utils/withdrawal";
import { Token } from "domain/tokens";
import { BigNumber } from "ethers";
import { useChainId } from "lib/chains";
import { useLocalStorageSerializeKey } from "lib/localStorage";
import { formatAmountFree, formatTokenAmount, formatUsd, parseValue } from "lib/numbers";
import { getByKey } from "lib/objects";
import { usePrevious } from "lib/usePrevious";
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { IoMdSwap } from "react-icons/io";
import { GmConfirmationBox } from "../GmConfirmationBox/GmConfirmationBox";
import { GmOrderStatus } from "../GmOrderStatus/GmOrderStatus";
import "./GmSwapBox.scss";

type Props = {
  selectedMarketAddress?: string;
  markets: Market[];
  onSelectMarket: (marketAddress: string) => void;
  onConnectWallet: () => void;
  setPendingTxns: (txns: any) => void;
};

enum Operation {
  Deposit = "Deposit",
  Withdrawal = "Withdrawal",
}

enum Mode {
  Single = "Single",
  Pair = "Pair",
}

const availableModes = {
  [Operation.Deposit]: [Mode.Single, Mode.Pair],
  [Operation.Withdrawal]: [Mode.Pair],
};

function useSafeState<S>(
  inititalValue?: S | (() => S),
  shouldUpdateFn: (prev: S, next: S) => boolean = (a, b) => a !== b
): [S, Dispatch<SetStateAction<S>>] {
  const [state, _setState] = useState<any>(inititalValue);

  const setState = useCallback(
    (value: S | ((prevState: S) => S)) => {
      if (typeof value === "function") {
        _setState(value);
      } else if (shouldUpdateFn(state, value)) {
        _setState(value);
      }
    },
    [shouldUpdateFn, state]
  );

  return [state, setState];
}

export function GmSwapBox(p: Props) {
  const marketAddress = p.selectedMarketAddress;

  const { chainId } = useChainId();
  const { marketsInfoData } = useMarketsInfo(chainId);
  const { marketTokensData } = useMarketTokensData(chainId);
  const { tokensData } = useAvailableTokensData(chainId);

  const infoTokens = adaptToV1InfoTokens(tokensData);

  const { gasLimits } = useGasLimitsConfig(chainId);
  const { gasPrice } = useGasPrice(chainId);

  const [operation, setOperation] = useState<Operation>(Operation.Deposit);
  const [mode, setMode] = useState<Mode>(Mode.Single);
  const [focusedInput, setFocusedInput] = useState<"longCollateral" | "shortCollateral" | "market">();
  const [stage, setStage] = useState<"swap" | "confirmation" | "processing">();
  const [isHighPriceImpactAccepted, setIsHighPriceImpactAccepted] = useState(false);

  const operationLabels = {
    [Operation.Deposit]: t`Deposit`,
    [Operation.Withdrawal]: t`Withdraw`,
  };

  const modeLabels = {
    [Mode.Single]: t`Single`,
    [Mode.Pair]: t`Pair`,
  };

  const isDeposit = operation === Operation.Deposit;
  const isWithdrawal = operation === Operation.Withdrawal;
  const isSingle = mode === Mode.Single;
  const isPair = mode === Mode.Pair;

  const marketInfo = getByKey(marketsInfoData, marketAddress);

  const marketsOptions: DropdownOption[] = Object.values(marketsInfoData).map((marketInfo) => ({
    label: marketInfo.name,
    value: marketInfo.marketTokenAddress,
  }));

  const [firstTokenAddress, setFirstTokenAddress] = useLocalStorageSerializeKey<string | undefined>(
    [chainId, SYNTHETICS_MARKET_DEPOSIT_TOKEN_KEY, isDeposit, marketAddress, "first"],
    undefined
  );
  const firstToken = getTokenData(tokensData, firstTokenAddress);
  const [firstTokenInputValue, setFirstTokenInputValue] = useSafeState<string>("");
  const firstTokenAmount = parseValue(firstTokenInputValue, firstToken?.decimals || 0);
  const firstTokenUsd = convertToUsd(
    firstTokenAmount,
    firstToken?.decimals,
    isDeposit ? firstToken?.prices?.minPrice : firstToken?.prices?.maxPrice
  );

  const [secondTokenAddress, setSecondTokenAddress] = useLocalStorageSerializeKey<string | undefined>(
    [chainId, SYNTHETICS_MARKET_DEPOSIT_TOKEN_KEY, isDeposit, marketAddress, "second"],
    undefined
  );
  const secondToken = getTokenData(tokensData, secondTokenAddress);
  const [secondTokenInputValue, setSecondTokenInputValue] = useSafeState<string>("");
  const secondTokenAmount = parseValue(secondTokenInputValue, secondToken?.decimals || 0);
  const secondTokenUsd = convertToUsd(
    secondTokenAmount,
    secondToken?.decimals,
    isDeposit ? secondToken?.prices?.minPrice : secondToken?.prices?.maxPrice
  );

  const longTokenInputState = getInputStateByCollateralType("long");
  const longTokenAmount = longTokenInputState?.amount;
  const longTokenUsd = longTokenInputState?.usd;

  const shortTokenInputState = getInputStateByCollateralType("short");
  const shortTokenAmount = shortTokenInputState?.amount;
  const shortTokenUsd = shortTokenInputState?.usd;

  const tokenOptions: Token[] = (function getTokenOptions() {
    const longToken = getTokenData(tokensData, marketInfo?.longTokenAddress);
    const shortToken = getTokenData(tokensData, marketInfo?.shortTokenAddress);

    if (!longToken || !shortToken) return [];

    const result = [longToken, shortToken];

    if (result.some((token) => token.isWrapped)) {
      result.unshift(getTokenData(tokensData, NATIVE_TOKEN_ADDRESS)!);
    }

    return result;
  })();

  const [marketTokenInputValue, setMarketTokenInputValue] = useSafeState<string>();
  const marketToken = getTokenData(marketTokensData, marketInfo?.marketTokenAddress);
  const marketTokenAmount = parseValue(marketTokenInputValue || "0", marketToken?.decimals || 0);
  const prevMarketTokenAmount = usePrevious(marketTokenAmount);
  const marketTokenUsd = convertToUsd(
    marketTokenAmount,
    marketToken?.decimals,
    isDeposit ? marketToken?.prices?.maxPrice : marketToken?.prices?.minPrice
  );

  const [swapFeeUsd, setSwapFeeUsd] = useSafeState<BigNumber | undefined>(
    undefined,
    (a, b) => Boolean(a) !== Boolean(b) || a?.toString() !== b?.toString()
  );

  const [swapPriceImpactDeltaUsd, setSwapPriceImpactDeltaUsd] = useSafeState<BigNumber | undefined>(
    undefined,
    (a, b) => Boolean(a) !== Boolean(b) || a?.toString() !== b?.toString()
  );

  const { longCollateralLiquidityUsd, shortCollateralLiquidityUsd, longPoolUsd, shortPoolUsd } = useMemo(() => {
    if (!marketInfo) return {};

    return {
      longCollateralLiquidityUsd: getAvailableUsdLiquidityForCollateral(marketInfo, true),
      shortCollateralLiquidityUsd: getAvailableUsdLiquidityForCollateral(marketInfo, false),
      longPoolUsd: getPoolUsd(marketInfo, true, "midPrice"),
      shortPoolUsd: getPoolUsd(marketInfo, false, "midPrice"),
    };
  }, [marketInfo]);

  const fees: GmSwapFees | undefined = useMemo(() => {
    if (!marketTokenUsd?.gt(0)) return undefined;

    const basisUsd = isDeposit
      ? BigNumber.from(0)
          .add(longTokenUsd || 0)
          .add(shortTokenUsd || 0)
      : marketTokenUsd;

    const swapFee = getFeeItem(swapFeeUsd?.mul(-1), basisUsd);
    const swapPriceImpact = getFeeItem(swapPriceImpactDeltaUsd, basisUsd);
    const totalFees = getTotalFeeItem([swapPriceImpact, swapFee].filter(Boolean) as FeeItem[]);

    return {
      totalFees,
      swapFee,
      swapPriceImpact,
    };
  }, [isDeposit, longTokenUsd, marketTokenUsd, shortTokenUsd, swapFeeUsd, swapPriceImpactDeltaUsd]);

  const isHighPriceImpact =
    fees?.swapPriceImpact?.deltaUsd.lt(0) && fees.swapPriceImpact.bps.abs().gte(HIGH_PRICE_IMPACT_BPS);

  const executionFee = useMemo(() => {
    if (!gasLimits || !gasPrice) return undefined;

    if (isDeposit) {
      const estimatedGasLimit = estimateExecuteDepositGasLimit(gasLimits, {
        initialLongTokenAmount: longTokenAmount,
        initialShortTokenAmount: shortTokenAmount,
      });

      return getExecutionFee(chainId, gasLimits, tokensData, estimatedGasLimit, gasPrice);
    } else {
      const estimatedGasLimit = estimateExecuteWithdrawalGasLimit(gasLimits, {});

      return getExecutionFee(chainId, gasLimits, tokensData, estimatedGasLimit, gasPrice);
    }
  }, [chainId, gasLimits, gasPrice, isDeposit, longTokenAmount, shortTokenAmount, tokensData]);

  const error = (function getError() {
    if (!marketInfo) {
      return t`Loading...`;
    }

    if (!marketTokenAmount?.gt(0)) {
      return t`Enter an amount`;
    }

    if (isHighPriceImpact && !isHighPriceImpactAccepted) {
      return t`Need to accept price impact`;
    }

    if (isDeposit) {
      if (longTokenInputState?.amount?.gt(longTokenInputState.token?.balance || 0)) {
        return t`Insufficient ${longTokenInputState.token?.symbol} balance`;
      }

      if (shortTokenInputState?.amount?.gt(shortTokenInputState.token?.balance || 0)) {
        return t`Insufficient ${shortTokenInputState.token?.symbol} balance`;
      }
    } else {
      if (marketTokenAmount.gt(marketToken?.balance || BigNumber.from(0))) {
        return t`Insufficient ${marketToken?.symbol} balance`;
      }

      if (longTokenUsd?.gt(longCollateralLiquidityUsd || BigNumber.from(0))) {
        return t`Insufficient ${longTokenInputState?.token?.symbol} liquidity`;
      }

      if (shortTokenUsd?.gt(shortCollateralLiquidityUsd || BigNumber.from(0))) {
        return t`Insufficient ${shortTokenInputState?.token?.symbol} liquidity`;
      }
    }
  })();

  const submitButtonState = (function getSubmitButtonState() {
    if (error) {
      return {
        text: error,
        disabled: true,
      };
    }

    return {
      text: isDeposit ? t`Buy GM` : t`Sell GM`,
      disabled: false,
      onClick: () => {
        setStage("confirmation");
      },
    };
  })();

  function getInputStateByCollateralType(type: "long" | "short") {
    if (!marketInfo) return undefined;

    const inputs = [
      {
        address: firstTokenAddress,
        value: firstTokenInputValue,
        setValue: setFirstTokenInputValue,
        amount: firstTokenAmount,
        usd: firstTokenUsd,
        token: firstToken,
      },
      {
        address: secondTokenAddress,
        value: secondTokenInputValue,
        setValue: setSecondTokenInputValue,
        amount: secondTokenAmount,
        usd: secondTokenUsd,
        token: secondToken,
      },
    ];

    return inputs.find((input) => {
      return (
        input.address &&
        convertTokenAddress(chainId, input.address, "wrapped") ===
          (type === "long" ? marketInfo.longTokenAddress : marketInfo.shortTokenAddress)
      );
    });
  }

  function onFocusedCollateralInputChange(tokenAddress: string) {
    if (convertTokenAddress(chainId, tokenAddress, "wrapped") === marketInfo?.longTokenAddress) {
      setFocusedInput("longCollateral");
    } else if (convertTokenAddress(chainId, tokenAddress, "wrapped") === marketInfo?.shortTokenAddress) {
      setFocusedInput("shortCollateral");
    }
  }

  useEffect(
    function updateAmounts() {
      const longToken = getTokenData(tokensData, marketInfo?.longTokenAddress);
      const shortToken = getTokenData(tokensData, marketInfo?.shortTokenAddress);

      if (
        !marketInfo ||
        !longToken?.prices ||
        !shortToken?.prices ||
        !marketToken?.prices ||
        !longPoolUsd ||
        !shortPoolUsd ||
        !focusedInput
      ) {
        return;
      }

      if (isDeposit) {
        if (["longCollateral", "shortCollateral"].includes(focusedInput)) {
          if (!longTokenUsd?.gt(0) && !shortTokenUsd?.gt(0)) {
            setMarketTokenInputValue("");
            return;
          }

          const amounts = getNextDepositAmountsByCollaterals({
            marketInfo,
            marketToken,
            longTokenAmount,
            shortTokenAmount,
          });

          if (amounts) {
            setMarketTokenInputValue(
              amounts.marketTokenAmount.gt(0) ? formatAmountFree(amounts.marketTokenAmount, marketToken.decimals) : ""
            );
            setSwapFeeUsd(amounts.swapFeeUsd);
            setSwapPriceImpactDeltaUsd(amounts.swapPriceImpactDeltaUsd);
          }
        }

        if (focusedInput === "market" && !marketTokenAmount?.eq(prevMarketTokenAmount || 0)) {
          if (!marketTokenAmount?.gt(0)) {
            longTokenInputState?.setValue("");
            shortTokenInputState?.setValue("");
            return;
          }

          const amounts = getNextDepositAmountsByMarketToken({
            marketInfo,
            marketToken,
            marketTokenAmount,
            includeLongToken: Boolean(longTokenInputState?.address),
            includeShortToken: Boolean(shortTokenInputState?.address),
            previousLongTokenAmount: longTokenAmount,
            previousShortTokenAmount: shortTokenAmount,
          });

          if (amounts) {
            longTokenInputState?.setValue(
              amounts.longTokenAmount?.gt(0) ? formatAmountFree(amounts.longTokenAmount, longToken.decimals) : ""
            );
            shortTokenInputState?.setValue(
              amounts.shortTokenAmount?.gt(0) ? formatAmountFree(amounts.shortTokenAmount, shortToken.decimals) : ""
            );
            setSwapFeeUsd(amounts.swapFeeUsd);
            setSwapPriceImpactDeltaUsd(amounts.swapPriceImpactDeltaUsd);
          }
        }
      }

      if (isWithdrawal) {
        if (focusedInput === "market") {
          if (!marketTokenAmount?.gt(0)) {
            longTokenInputState?.setValue("");
            shortTokenInputState?.setValue("");
            return;
          }

          if (!longPoolUsd.gt(0) || !shortPoolUsd.gt(0)) {
            return;
          }

          const amounts = getNextWithdrawalAmountsByMarketToken({
            marketInfo,
            marketToken,
            marketTokenAmount,
          });

          if (amounts) {
            longTokenInputState?.setValue(
              amounts.longTokenAmount?.gt(0) ? formatAmountFree(amounts.longTokenAmount, longToken.decimals) : ""
            );
            shortTokenInputState?.setValue(
              amounts.shortTokenAmount?.gt(0) ? formatAmountFree(amounts.shortTokenAmount, shortToken.decimals) : ""
            );
            setSwapFeeUsd(amounts.swapFeeUsd);
            setSwapPriceImpactDeltaUsd(undefined);
          }
        }

        if (["longCollateral", "shortCollateral"].includes(focusedInput)) {
          if (focusedInput === "longCollateral" && !longTokenAmount?.gt(0)) {
            shortTokenInputState?.setValue("");
            setMarketTokenInputValue("");
            return;
          }

          if (focusedInput === "shortCollateral" && !shortTokenAmount?.gt(0)) {
            longTokenInputState?.setValue("");
            setMarketTokenInputValue("");
            return;
          }

          if (!longPoolUsd.gt(0) || !shortPoolUsd.gt(0)) {
            return;
          }

          const amounts = getNextWithdrawalAmountsByCollaterals({
            marketInfo,
            marketToken,
            longTokenAmount: focusedInput === "longCollateral" ? longTokenAmount : undefined,
            shortTokenAmount: focusedInput === "shortCollateral" ? shortTokenAmount : undefined,
          });

          if (amounts) {
            setMarketTokenInputValue(
              amounts.marketTokenAmount.gt(0) ? formatAmountFree(amounts.marketTokenAmount, marketToken.decimals) : ""
            );
            if (amounts.longTokenAmount) {
              longTokenInputState?.setValue(
                amounts.longTokenAmount.gt(0) ? formatAmountFree(amounts.longTokenAmount, longToken.decimals) : ""
              );
            }
            if (amounts.shortTokenAmount) {
              shortTokenInputState?.setValue(
                amounts.shortTokenAmount.gt(0) ? formatAmountFree(amounts.shortTokenAmount, shortToken.decimals) : ""
              );
            }
            setSwapFeeUsd(amounts.swapFeeUsd);
            setSwapPriceImpactDeltaUsd(undefined);
          }
        }
      }
    },
    [
      focusedInput,
      isDeposit,
      isWithdrawal,
      longPoolUsd,
      longTokenAmount,
      longTokenInputState,
      longTokenUsd,
      marketInfo,
      marketToken,
      marketTokenAmount,
      prevMarketTokenAmount,
      setMarketTokenInputValue,
      setSwapFeeUsd,
      setSwapPriceImpactDeltaUsd,
      shortPoolUsd,
      shortTokenAmount,
      shortTokenInputState,
      shortTokenUsd,
      tokensData,
    ]
  );

  useEffect(
    function updateMode() {
      if (!availableModes[operation].includes(mode)) {
        setMode(availableModes[operation][0]);
      }
    },
    [mode, operation]
  );

  useEffect(
    function updateTokens() {
      if (!tokenOptions.length) return;

      if (!tokenOptions.find((token) => token.address === firstTokenAddress)) {
        setFirstTokenAddress(tokenOptions[0].address);
      }

      if (isSingle && secondTokenAddress) {
        setSecondTokenAddress(undefined);
        setSecondTokenInputValue("");
      }

      if (isPair && firstTokenAddress) {
        if (
          !secondTokenAddress ||
          !tokenOptions.find((token) => token.address === secondTokenAddress) ||
          convertTokenAddress(chainId, firstTokenAddress, "wrapped") ===
            convertTokenAddress(chainId, secondTokenAddress, "wrapped")
        ) {
          const secondToken = tokenOptions.find((token) => {
            return (
              convertTokenAddress(chainId, token.address, "wrapped") !==
              convertTokenAddress(chainId, firstTokenAddress, "wrapped")
            );
          });
          setSecondTokenAddress(secondToken?.address);
        }
      }
    },
    [
      chainId,
      firstTokenAddress,
      isPair,
      isSingle,
      secondTokenAddress,
      setFirstTokenAddress,
      setSecondTokenAddress,
      setSecondTokenInputValue,
      tokenOptions,
    ]
  );

  return (
    <div className={`App-box GmSwapBox`}>
      <Dropdown
        className="GmSwapBox-market-dropdown"
        selectedOption={marketsOptions.find((o) => o.value === p.selectedMarketAddress)}
        options={marketsOptions}
        onSelect={(o) => p.onSelectMarket(o.value)}
      />

      <Tab
        options={Object.values(Operation)}
        optionLabels={operationLabels}
        option={operation}
        onChange={setOperation}
        className="Exchange-swap-option-tabs"
      />

      <Tab
        options={availableModes[operation]}
        optionLabels={modeLabels}
        className="GmSwapBox-asset-options-tabs"
        type="inline"
        option={mode}
        onChange={setMode}
      />

      <div className={cx("GmSwapBox-form-layout", { reverse: isWithdrawal })}>
        <BuyInputSection
          topLeftLabel={isDeposit ? t`Pay` : t`Receive`}
          topLeftValue={formatUsd(firstTokenUsd)}
          topRightLabel={t`Balance:`}
          topRightValue={formatTokenAmount(firstToken?.balance, firstToken?.decimals)}
          showMaxButton={isDeposit && firstToken?.balance?.gt(0) && !firstTokenAmount?.eq(firstToken.balance)}
          inputValue={firstTokenInputValue}
          onInputValueChange={(e) => {
            if (firstToken) {
              setFirstTokenInputValue(e.target.value);
              onFocusedCollateralInputChange(firstToken.address);
            }
          }}
          onClickMax={() => {
            if (firstToken?.balance) {
              setFirstTokenInputValue(formatAmountFree(firstToken.balance, firstToken.decimals));
              onFocusedCollateralInputChange(firstToken.address);
            }
          }}
        >
          {firstTokenAddress && isSingle ? (
            <TokenSelector
              label={t`Pay`}
              chainId={chainId}
              tokenAddress={firstTokenAddress}
              onSelectToken={(token) => setFirstTokenAddress(token.address)}
              tokens={tokenOptions}
              infoTokens={infoTokens}
              className="GlpSwap-from-token"
              showSymbolImage={true}
              showTokenImgInDropdown={true}
            />
          ) : (
            <div className="selected-token">{firstToken?.symbol}</div>
          )}
        </BuyInputSection>

        {isPair && secondTokenAddress && (
          <BuyInputSection
            topLeftLabel={isDeposit ? t`Pay` : t`Receive`}
            topLeftValue={formatUsd(secondTokenUsd)}
            topRightLabel={t`Balance:`}
            topRightValue={formatTokenAmount(secondToken?.balance, secondToken?.decimals)}
            inputValue={secondTokenInputValue}
            showMaxButton={isDeposit && secondToken?.balance?.gt(0) && !secondTokenAmount?.eq(secondToken.balance)}
            onInputValueChange={(e) => {
              if (secondToken) {
                setSecondTokenInputValue(e.target.value);
                onFocusedCollateralInputChange(secondToken.address);
              }
            }}
            onClickMax={() => {
              if (secondToken?.balance) {
                setSecondTokenInputValue(formatAmountFree(secondToken.balance, secondToken.decimals));
                onFocusedCollateralInputChange(secondToken.address);
              }
            }}
          >
            <div className="selected-token">{secondToken?.symbol}</div>
          </BuyInputSection>
        )}

        <div
          className="AppOrder-ball-container"
          onClick={() => {
            setOperation((prev) => (prev === Operation.Deposit ? Operation.Withdrawal : Operation.Deposit));
          }}
        >
          <div className="AppOrder-ball">
            <IoMdSwap className="Exchange-swap-ball-icon" />
          </div>
        </div>

        <BuyInputSection
          topLeftLabel={isWithdrawal ? t`Pay` : t`Receive`}
          topLeftValue={formatUsd(marketTokenUsd)}
          topRightLabel={t`Balance:`}
          topRightValue={formatTokenAmount(marketToken?.balance, marketToken?.decimals)}
          showMaxButton={isWithdrawal && marketToken?.balance?.gt(0) && !marketTokenAmount?.eq(marketToken.balance)}
          inputValue={marketTokenInputValue}
          onInputValueChange={(e) => {
            setMarketTokenInputValue(e.target.value);
            setFocusedInput("market");
          }}
          onClickMax={() => {
            if (marketToken?.balance) {
              setMarketTokenInputValue(formatAmountFree(marketToken.balance, marketToken.decimals));
              setFocusedInput("market");
            }
          }}
        >
          <div className="selected-token">GM</div>
        </BuyInputSection>
      </div>

      <div className="GmSwapBox-info-section">
        <GmFees totalFees={fees?.totalFees} swapFee={fees?.swapFee} swapPriceImpact={fees?.swapPriceImpact} />
      </div>

      {isHighPriceImpact && (
        <div className="GmSwapBox-warnings">
          <Checkbox asRow isChecked={isHighPriceImpactAccepted} setIsChecked={setIsHighPriceImpactAccepted}>
            <span className="muted font-sm">
              <Trans>I am aware of the high price impact</Trans>
            </span>
          </Checkbox>
        </div>
      )}

      <div className="Exchange-swap-button-container">
        <SubmitButton
          authRequired
          onConnectWallet={p.onConnectWallet}
          onClick={submitButtonState.onClick}
          disabled={submitButtonState.disabled}
        >
          {submitButtonState.text}
        </SubmitButton>
      </div>

      {stage === "confirmation" && (
        <GmConfirmationBox
          marketToken={marketToken!}
          longToken={longTokenInputState?.token}
          shortToken={shortTokenInputState?.token}
          marketTokenAmount={marketTokenAmount!}
          marketTokenUsd={marketTokenUsd!}
          longTokenAmount={longTokenAmount}
          longTokenUsd={longTokenUsd}
          shortTokenAmount={shortTokenAmount}
          shortTokenUsd={shortTokenUsd}
          fees={fees!}
          error={error}
          isDeposit={isDeposit}
          executionFee={executionFee}
          setPendingTxns={p.setPendingTxns}
          onSubmitted={() => {
            setStage("processing");
          }}
          onClose={() => {
            setStage("swap");
          }}
        />
      )}

      {stage === "processing" && (
        <GmOrderStatus
          firstToken={firstTokenAddress!}
          secondToken={secondTokenAmount?.gt(0) ? secondTokenAddress : undefined}
          market={marketInfo?.marketTokenAddress!}
          isDeposit={isDeposit}
          onClose={() => {
            setStage("swap");
          }}
        />
      )}
    </div>
  );
}
