import { Trans, t } from "@lingui/macro";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Button from "components/Button/Button";
import BuyInputSection from "components/BuyInputSection/BuyInputSection";
import Checkbox from "components/Checkbox/Checkbox";
import ExchangeInfoRow from "components/Exchange/ExchangeInfoRow";
import ExternalLink from "components/ExternalLink/ExternalLink";
import { LeverageSlider } from "components/LeverageSlider/LeverageSlider";
import { MarketSelector } from "components/MarketSelector/MarketSelector";
import { ConfirmationBox } from "components/Synthetics/ConfirmationBox/ConfirmationBox";
import Tab from "components/Tab/Tab";
import ToggleSwitch from "components/ToggleSwitch/ToggleSwitch";
import TokenWithIcon from "components/TokenIcon/TokenWithIcon";
import TokenSelector from "components/TokenSelector/TokenSelector";
import Tooltip from "components/Tooltip/Tooltip";
import { ValueTransition } from "components/ValueTransition/ValueTransition";
import { NATIVE_TOKEN_ADDRESS } from "config/tokens";
import { MAX_METAMASK_MOBILE_DECIMALS } from "config/ui";
import { useSettings } from "context/SettingsContext/SettingsContextProvider";
import {
  useAvailableTradeModes,
  useCollateralAddress,
  useCollateralToken,
  useDecreasePositionAmounts,
  useExistingOrder,
  useFromToken,
  useFromTokenAddress,
  useIncreasePositionAmounts,
  useIsWrapOrUnwrap,
  useLeverage,
  useMarketAddress,
  useMarketInfo,
  useNextPositionValues,
  useSelectedPosition,
  useSetCollateralAddress,
  useSetFromTokenAddress,
  useSetMarketAddress,
  useSetToTokenAddress,
  useSetTradeMode,
  useSetTradeType,
  useSwapAmounts,
  useSwapRoutes,
  useSwitchTokenAddresses,
  useToToken,
  useToTokenAddress,
  useTradeFlags,
  useTradeMode,
  useTradeType,
  useTradeboxState,
  useUiFeeFactor,
} from "context/SyntheticsStateContext/selectors";
import { useHasOutdatedUi } from "domain/legacy";
import {
  estimateExecuteDecreaseOrderGasLimit,
  estimateExecuteIncreaseOrderGasLimit,
  estimateExecuteSwapOrderGasLimit,
  getExecutionFee,
  useGasLimits,
  useGasPrice,
} from "domain/synthetics/fees";
import { MarketsInfoData, getAvailableUsdLiquidityForPosition, getMarketIndexName } from "domain/synthetics/markets";
import { DecreasePositionSwapType, OrdersInfoData } from "domain/synthetics/orders";
import {
  PositionsInfoData,
  formatLeverage,
  formatLiquidationPrice,
  getTriggerNameByOrderType,
  usePositionsConstantsRequest,
} from "domain/synthetics/positions";
import { TokensData, TokensRatio, convertToUsd, getTokensRatioByPrice } from "domain/synthetics/tokens";
import {
  AvailableTokenOptions,
  TradeFeesType,
  TradeMode,
  TradeType,
  getExecutionPriceForDecrease,
  getMarkPrice,
  getTradeFees,
} from "domain/synthetics/trade";
import { useAvailableMarketsOptions } from "domain/synthetics/trade/useAvailableMarketsOptions";
import { usePriceImpactWarningState } from "domain/synthetics/trade/usePriceImpactWarningState";
import {
  ValidationResult,
  getCommonError,
  getDecreaseError,
  getIncreaseError,
  getSwapError,
} from "domain/synthetics/trade/utils/validation";
import { getMinResidualAmount } from "domain/tokens";
import { BigNumber } from "ethers";
import longImg from "img/long.svg";
import shortImg from "img/short.svg";
import swapImg from "img/swap.svg";
import { useChainId } from "lib/chains";
import { USD_DECIMALS } from "lib/legacy";
import {
  formatAmount,
  formatAmountFree,
  formatDeltaUsd,
  formatPercentage,
  formatTokenAmount,
  formatTokenAmountWithUsd,
  formatUsd,
  limitDecimals,
  parseValue,
} from "lib/numbers";
import { getByKey } from "lib/objects";
import { museNeverExist } from "lib/types";
import useIsMetamaskMobile from "lib/wallets/useIsMetamaskMobile";
import useWallet from "lib/wallets/useWallet";
import { ReactNode, useCallback, useEffect, useMemo } from "react";
import { IoMdSwap } from "react-icons/io";
import { useLatest, usePrevious } from "react-use";
import { HighPriceImpactWarning } from "../HighPriceImpactWarning/HighPriceImpactWarning";
import { MarketCard } from "../MarketCard/MarketCard";
import { SwapCard } from "../SwapCard/SwapCard";
import { TradeFeesRow } from "../TradeFeesRow/TradeFeesRow";
import { CollateralSelectorRow } from "./CollateralSelectorRow";
import { MarketPoolSelectorRow } from "./MarketPoolSelectorRow";
import "./TradeBox.scss";

export type Props = {
  avaialbleTokenOptions: AvailableTokenOptions;
  positionsInfo?: PositionsInfoData;
  ordersInfo?: OrdersInfoData;
  allowedSlippage: number;
  isHigherSlippageAllowed: boolean;
  shouldDisableValidation?: boolean;
  marketsInfoData?: MarketsInfoData;
  tokensData?: TokensData;
  setIsHigherSlippageAllowed: (value: boolean) => void;
  setPendingTxns: (txns: any) => void;
};

const tradeTypeIcons = {
  [TradeType.Long]: longImg,
  [TradeType.Short]: shortImg,
  [TradeType.Swap]: swapImg,
};

const emptyArray = [];

const tradeModeLabels = {
  [TradeMode.Market]: t`Market`,
  [TradeMode.Limit]: t`Limit`,
  [TradeMode.Trigger]: t`TP/SL`,
};

const tradeTypeLabels = {
  [TradeType.Long]: t`Long`,
  [TradeType.Short]: t`Short`,
  [TradeType.Swap]: t`Swap`,
};

export function TradeBox(p: Props) {
  const {
    tokensData,
    avaialbleTokenOptions,
    positionsInfo,
    ordersInfo,
    shouldDisableValidation,
    allowedSlippage,
    isHigherSlippageAllowed,
    marketsInfoData,
    setIsHigherSlippageAllowed,
    setPendingTxns,
  } = p;

  const selectedPosition = useSelectedPosition();
  const existingOrder = useExistingOrder();

  const { openConnectModal } = useConnectModal();
  const {
    swapTokens,
    indexTokens,
    infoTokens,
    sortedIndexTokensWithPoolValue,
    sortedLongAndShortTokens,
    sortedAllMarkets,
  } = avaialbleTokenOptions;

  const tradeType = useTradeType();
  const tradeMode = useTradeMode();
  const tradeFlags = useTradeFlags();
  const isWrapOrUnwrap = useIsWrapOrUnwrap();
  const fromTokenAddress = useFromTokenAddress();
  const fromToken = useFromToken();
  const toTokenAddress = useToTokenAddress();
  const toToken = useToToken();
  const marketAddress = useMarketAddress();
  const marketInfo = useMarketInfo();
  const collateralAddress = useCollateralAddress();
  const collateralToken = useCollateralToken();
  const availalbleTradeModes = useAvailableTradeModes();
  const switchTokenAddresses = useSwitchTokenAddresses();
  const onSelectMarketAddress = useSetMarketAddress();
  const onSelectCollateralAddress = useSetCollateralAddress();
  const onSelectFromTokenAddress = useSetFromTokenAddress();
  const onSelectToTokenAddress = useSetToTokenAddress();
  const onSelectTradeMode = useSetTradeMode();
  const onSelectTradeType = useSetTradeType();

  const { isLong, isSwap, isIncrease, isPosition, isLimit, isTrigger, isMarket } = tradeFlags;

  const { chainId } = useChainId();
  const { account } = useWallet();
  const isMetamaskMobile = useIsMetamaskMobile();
  const { gasPrice } = useGasPrice(chainId);
  const { gasLimits } = useGasLimits(chainId);
  const { showDebugValues } = useSettings();
  const { data: hasOutdatedUi } = useHasOutdatedUi();

  const { minCollateralUsd } = usePositionsConstantsRequest(chainId);

  const nativeToken = getByKey(tokensData, NATIVE_TOKEN_ADDRESS);
  const minResidualAmount = getMinResidualAmount(nativeToken?.decimals, nativeToken?.prices.maxPrice);
  const {
    fromTokenInputValue,
    setFromTokenInputValue: setFromTokenInputValueRaw,
    toTokenInputValue,
    setToTokenInputValue: setToTokenInputValueRaw,
    stage,
    setStage,
    focusedInput,
    setFocusedInput,
    fixedTriggerThresholdType,
    setFixedTriggerThresholdType,
    fixedTriggerOrderType,
    setFixedTriggerOrderType,
    defaultTriggerAcceptablePriceImpactBps,
    setDefaultTriggerAcceptablePriceImapctBps,
    selectedTriggerAcceptablePriceImpactBps,
    setSelectedAcceptablePriceImapctBps,
    closeSizeInputValue,
    setCloseSizeInputValue,
    triggerPriceInputValue,
    setTriggerPriceInputValue,
    triggerRatioInputValue,
    setTriggerRatioInputValue,
    leverageOption,
    setLeverageOption,
    isLeverageEnabled,
    setIsLeverageEnabled,
    keepLeverage,
    setKeepLeverage,
  } = useTradeboxState();

  const fromTokenAmount = fromToken ? parseValue(fromTokenInputValue || "0", fromToken.decimals)! : BigNumber.from(0);
  const toTokenAmount = toToken ? parseValue(toTokenInputValue || "0", toToken.decimals)! : BigNumber.from(0);
  const fromTokenPrice = fromToken?.prices.minPrice;
  const fromUsd = convertToUsd(fromTokenAmount, fromToken?.decimals, fromTokenPrice);
  const isNotMatchAvailableBalance =
    fromToken?.balance?.gt(0) &&
    !fromToken.balance.eq(fromTokenAmount) &&
    (fromToken?.isNative ? minResidualAmount && fromToken.balance.gt(minResidualAmount) : true);

  const markPrice = useMemo(() => {
    if (!toToken) {
      return undefined;
    }

    if (isSwap) {
      return toToken.prices.minPrice;
    }

    return getMarkPrice({ prices: toToken.prices, isIncrease, isLong });
  }, [isIncrease, isLong, isSwap, toToken]);

  const closeSizeUsd = parseValue(closeSizeInputValue || "0", USD_DECIMALS)!;
  const triggerPrice = parseValue(triggerPriceInputValue, USD_DECIMALS);

  const { markRatio, triggerRatio } = useMemo(() => {
    if (!isSwap || !fromToken || !toToken || !fromTokenPrice || !markPrice) {
      return {};
    }

    const markRatio = getTokensRatioByPrice({
      fromToken,
      toToken,
      fromPrice: fromTokenPrice,
      toPrice: markPrice,
    });

    const triggerRatioValue = parseValue(triggerRatioInputValue, USD_DECIMALS);

    if (!triggerRatioValue) {
      return { markRatio };
    }

    const triggerRatio: TokensRatio = {
      ratio: triggerRatioValue?.gt(0) ? triggerRatioValue : markRatio.ratio,
      largestToken: markRatio.largestToken,
      smallestToken: markRatio.smallestToken,
    };

    return {
      markRatio,
      triggerRatio,
    };
  }, [fromToken, fromTokenPrice, isSwap, markPrice, toToken, triggerRatioInputValue]);

  const leverage = useLeverage();
  const uiFeeFactor = useUiFeeFactor();

  const swapRoute = useSwapRoutes(fromTokenAddress, isPosition ? collateralAddress : toTokenAddress);
  const swapAmounts = useSwapAmounts(fromTokenAddress, toTokenAddress);
  const increaseAmounts = useIncreasePositionAmounts(fromTokenAddress, toTokenAddress, selectedPosition);
  const decreaseAmounts = useDecreasePositionAmounts(selectedPosition);
  const nextPositionValues = useNextPositionValues(fromTokenAddress, toTokenAddress, selectedPosition);

  const { fees, feesType, executionFee } = useMemo(() => {
    if (!gasLimits || !gasPrice || !tokensData) {
      return {};
    }

    if (isSwap && swapAmounts?.swapPathStats) {
      const estimatedGas = estimateExecuteSwapOrderGasLimit(gasLimits, {
        swapsCount: swapAmounts.swapPathStats.swapPath.length,
      });

      return {
        fees: getTradeFees({
          isIncrease: false,
          initialCollateralUsd: swapAmounts.usdIn,
          sizeDeltaUsd: BigNumber.from(0),
          swapSteps: swapAmounts.swapPathStats.swapSteps,
          positionFeeUsd: BigNumber.from(0),
          swapPriceImpactDeltaUsd: swapAmounts.swapPathStats.totalSwapPriceImpactDeltaUsd,
          positionPriceImpactDeltaUsd: BigNumber.from(0),
          borrowingFeeUsd: BigNumber.from(0),
          fundingFeeUsd: BigNumber.from(0),
          feeDiscountUsd: BigNumber.from(0),
          swapProfitFeeUsd: BigNumber.from(0),
          uiFeeFactor,
        }),
        executionFee: getExecutionFee(chainId, gasLimits, tokensData, estimatedGas, gasPrice),
        feesType: "swap" as TradeFeesType,
      };
    }

    if (isIncrease && increaseAmounts) {
      const estimatedGas = estimateExecuteIncreaseOrderGasLimit(gasLimits, {
        swapsCount: increaseAmounts.swapPathStats?.swapPath.length,
      });

      return {
        fees: getTradeFees({
          isIncrease: true,
          initialCollateralUsd: increaseAmounts.initialCollateralUsd,
          sizeDeltaUsd: increaseAmounts.sizeDeltaUsd,
          swapSteps: increaseAmounts.swapPathStats?.swapSteps || [],
          positionFeeUsd: increaseAmounts.positionFeeUsd,
          swapPriceImpactDeltaUsd: increaseAmounts.swapPathStats?.totalSwapPriceImpactDeltaUsd || BigNumber.from(0),
          positionPriceImpactDeltaUsd: increaseAmounts.positionPriceImpactDeltaUsd,
          borrowingFeeUsd: selectedPosition?.pendingBorrowingFeesUsd || BigNumber.from(0),
          fundingFeeUsd: selectedPosition?.pendingFundingFeesUsd || BigNumber.from(0),
          feeDiscountUsd: increaseAmounts.feeDiscountUsd,
          swapProfitFeeUsd: BigNumber.from(0),
          uiFeeFactor,
        }),
        executionFee: getExecutionFee(chainId, gasLimits, tokensData, estimatedGas, gasPrice),
        feesType: "increase" as TradeFeesType,
      };
    }

    if (isTrigger && decreaseAmounts) {
      const swapsCount = decreaseAmounts.decreaseSwapType === DecreasePositionSwapType.NoSwap ? 0 : 1;
      const estimatedGas = estimateExecuteDecreaseOrderGasLimit(gasLimits, {
        swapsCount,
      });

      return {
        fees: getTradeFees({
          isIncrease: false,
          initialCollateralUsd: selectedPosition?.collateralUsd || BigNumber.from(0),
          sizeDeltaUsd: decreaseAmounts.sizeDeltaUsd,
          swapSteps: [],
          positionFeeUsd: decreaseAmounts.positionFeeUsd,
          swapPriceImpactDeltaUsd: BigNumber.from(0),
          positionPriceImpactDeltaUsd: decreaseAmounts.positionPriceImpactDeltaUsd,
          borrowingFeeUsd: decreaseAmounts.borrowingFeeUsd,
          fundingFeeUsd: decreaseAmounts.fundingFeeUsd,
          feeDiscountUsd: decreaseAmounts.feeDiscountUsd,
          swapProfitFeeUsd: decreaseAmounts.swapProfitFeeUsd,
          uiFeeFactor,
        }),
        executionFee: getExecutionFee(chainId, gasLimits, tokensData, estimatedGas, gasPrice),
        feesType: "decrease" as TradeFeesType,
      };
    }

    return {};
  }, [
    gasLimits,
    gasPrice,
    tokensData,
    isSwap,
    swapAmounts?.swapPathStats,
    swapAmounts?.usdIn,
    isIncrease,
    increaseAmounts,
    isTrigger,
    decreaseAmounts,
    uiFeeFactor,
    chainId,
    selectedPosition?.pendingBorrowingFeesUsd,
    selectedPosition?.pendingFundingFeesUsd,
    selectedPosition?.collateralUsd,
  ]);

  const priceImpactWarningState = usePriceImpactWarningState({
    positionPriceImpact: fees?.positionPriceImpact,
    swapPriceImpact: fees?.swapPriceImpact,
    place: "tradeBox",
  });

  const setIsHighPositionImpactAcceptedRef = useLatest(priceImpactWarningState.setIsHighPositionImpactAccepted);
  const setIsHighSwapImpactAcceptedRef = useLatest(priceImpactWarningState.setIsHighSwapImpactAccepted);

  const setFromTokenInputValue = useCallback(
    (value: string, shouldResetPriceImpactWarning: boolean) => {
      setFromTokenInputValueRaw(value);
      if (shouldResetPriceImpactWarning) {
        setIsHighPositionImpactAcceptedRef.current(false);
        setIsHighSwapImpactAcceptedRef.current(false);
      }
    },
    [setFromTokenInputValueRaw, setIsHighPositionImpactAcceptedRef, setIsHighSwapImpactAcceptedRef]
  );
  const setToTokenInputValue = useCallback(
    (value: string, shouldResetPriceImpactWarning: boolean) => {
      setToTokenInputValueRaw(value);
      if (shouldResetPriceImpactWarning) {
        setIsHighPositionImpactAcceptedRef.current(false);
        setIsHighSwapImpactAcceptedRef.current(false);
      }
    },
    [setToTokenInputValueRaw, setIsHighPositionImpactAcceptedRef, setIsHighSwapImpactAcceptedRef]
  );

  const marketsOptions = useAvailableMarketsOptions({
    marketsInfoData,
    isIncrease,
    disable: !isPosition,
    indexToken: toToken,
    isLong,
    increaseSizeUsd: increaseAmounts?.sizeDeltaUsd,
    positionsInfo,
    ordersInfo,
    hasExistingOrder: Boolean(existingOrder),
    hasExistingPosition: Boolean(selectedPosition),
  });
  const { availableMarkets } = marketsOptions;

  const availableCollaterals = useMemo(() => {
    if (!marketInfo) {
      return [];
    }

    if (marketInfo.isSameCollaterals) {
      return [marketInfo.longToken];
    }

    return [marketInfo.longToken, marketInfo.shortToken];
  }, [marketInfo]);

  const swapOutLiquidity = swapRoute.maxSwapLiquidity;

  const { longLiquidity, shortLiquidity, isOutPositionLiquidity } = useMemo(() => {
    if (!marketInfo || !isIncrease) {
      return {};
    }
    const longLiquidity = getAvailableUsdLiquidityForPosition(marketInfo, true);
    const shortLiquidity = getAvailableUsdLiquidityForPosition(marketInfo, false);

    const isOutPositionLiquidity = isLong
      ? longLiquidity.lt(increaseAmounts?.sizeDeltaUsd || 0)
      : shortLiquidity.lt(increaseAmounts?.sizeDeltaUsd || 0);

    return {
      longLiquidity,
      shortLiquidity,
      isOutPositionLiquidity,
    };
  }, [increaseAmounts, isIncrease, isLong, marketInfo]);

  const { buttonErrorText, tooltipContent } = useMemo(() => {
    const commonError = getCommonError({
      chainId,
      isConnected: Boolean(account),
      hasOutdatedUi,
    });

    let tradeError: ValidationResult = [undefined];

    if (isSwap) {
      tradeError = getSwapError({
        fromToken,
        toToken,
        fromTokenAmount,
        fromUsd: swapAmounts?.usdIn,
        toTokenAmount,
        toUsd: swapAmounts?.usdOut,
        swapPathStats: swapAmounts?.swapPathStats,
        swapLiquidity: swapOutLiquidity,
        priceImpactWarning: priceImpactWarningState,
        isLimit,
        isWrapOrUnwrap,
        triggerRatio,
        markRatio,
        fees,
      });
    } else if (isIncrease) {
      tradeError = getIncreaseError({
        marketInfo,
        indexToken: toToken,
        initialCollateralToken: fromToken,
        initialCollateralAmount: fromTokenAmount,
        initialCollateralUsd: increaseAmounts?.initialCollateralUsd,
        targetCollateralToken: collateralToken,
        collateralUsd: increaseAmounts?.collateralDeltaUsd,
        sizeDeltaUsd: increaseAmounts?.sizeDeltaUsd,
        existingPosition: selectedPosition,
        fees,
        swapPathStats: increaseAmounts?.swapPathStats,
        collateralLiquidity: swapOutLiquidity,
        minCollateralUsd,
        longLiquidity,
        shortLiquidity,
        isLong,
        markPrice,
        triggerPrice,
        priceImpactWarning: priceImpactWarningState,
        isLimit,
        nextPositionValues,
      });
    } else if (isTrigger) {
      tradeError = getDecreaseError({
        marketInfo,
        inputSizeUsd: closeSizeUsd,
        sizeDeltaUsd: decreaseAmounts?.sizeDeltaUsd,
        triggerPrice,
        markPrice,
        existingPosition: selectedPosition,
        isContractAccount: false,
        receiveToken: selectedPosition?.collateralToken,
        nextPositionValues,
        isLong,
        isTrigger: true,
        minCollateralUsd,
        priceImpactWarning: priceImpactWarningState,
        isNotEnoughReceiveTokenLiquidity: false,
        fixedTriggerThresholdType: stage === "confirmation" ? fixedTriggerThresholdType : undefined,
      });
    }

    const buttonErrorText = commonError[0] || tradeError[0];
    const tooltipName = commonError[1] || tradeError[1];

    let tooltipContent: ReactNode = null;
    if (tooltipName) {
      switch (tooltipName) {
        case "maxLeverage":
          tooltipContent = (
            <>
              <Trans>
                Decrease the Leverage by using the slider. If the Leverage slider is disabled, you can increase the Pay
                amount or reduce the Order size.
              </Trans>
              <br />
              <br />
              <ExternalLink href="https://docs.gmx.io/docs/trading/v2/#max-leverage">More Info</ExternalLink>.
            </>
          );
          break;

        default:
          museNeverExist(tooltipName);
      }
    }

    return { buttonErrorText, tooltipContent };
  }, [
    chainId,
    account,
    hasOutdatedUi,
    isSwap,
    isIncrease,
    isTrigger,
    fromToken,
    toToken,
    fromTokenAmount,
    swapAmounts?.usdIn,
    swapAmounts?.usdOut,
    swapAmounts?.swapPathStats,
    toTokenAmount,
    swapOutLiquidity,
    isLimit,
    isWrapOrUnwrap,
    triggerRatio,
    markRatio,
    fees,
    marketInfo,
    increaseAmounts?.initialCollateralUsd,
    increaseAmounts?.collateralDeltaUsd,
    increaseAmounts?.sizeDeltaUsd,
    increaseAmounts?.swapPathStats,
    collateralToken,
    selectedPosition,
    minCollateralUsd,
    longLiquidity,
    shortLiquidity,
    isLong,
    markPrice,
    triggerPrice,
    priceImpactWarningState,
    nextPositionValues,
    closeSizeUsd,
    decreaseAmounts?.sizeDeltaUsd,
    stage,
    fixedTriggerThresholdType,
  ]);

  const isSubmitButtonDisabled = useMemo(() => {
    if (!account) {
      return false;
    }
    if (buttonErrorText) {
      return true;
    }
  }, [buttonErrorText, account]);

  const submitButtonText = useMemo(() => {
    if (buttonErrorText) {
      return buttonErrorText;
    }

    if (isMarket) {
      if (isSwap) {
        return t`Swap ${fromToken?.symbol}`;
      } else {
        return `${tradeTypeLabels[tradeType!]} ${toToken?.symbol}`;
      }
    } else if (isLimit) {
      return t`Create Limit order`;
    } else {
      return t`Create ${getTriggerNameByOrderType(decreaseAmounts?.triggerOrderType)} Order`;
    }
  }, [
    decreaseAmounts?.triggerOrderType,
    buttonErrorText,
    fromToken?.symbol,
    isLimit,
    isMarket,
    isSwap,
    toToken?.symbol,
    tradeType,
  ]);

  function onSubmit() {
    if (!account) {
      openConnectModal?.();
      return;
    }

    if (
      isTrigger &&
      decreaseAmounts?.triggerThresholdType &&
      decreaseAmounts?.triggerOrderType &&
      decreaseAmounts.acceptablePrice
    ) {
      setFixedTriggerOrderType(decreaseAmounts.triggerOrderType);
      setFixedTriggerThresholdType(decreaseAmounts.triggerThresholdType);
      setSelectedAcceptablePriceImapctBps(decreaseAmounts.recommendedAcceptablePriceDeltaBps.abs());
      setDefaultTriggerAcceptablePriceImapctBps(decreaseAmounts.recommendedAcceptablePriceDeltaBps.abs());
    }

    if (isLimit && increaseAmounts?.acceptablePrice) {
      setSelectedAcceptablePriceImapctBps(increaseAmounts.acceptablePriceDeltaBps.abs());
      setDefaultTriggerAcceptablePriceImapctBps(increaseAmounts.acceptablePriceDeltaBps.abs());
    }

    setStage("confirmation");
  }

  const prevIsISwap = usePrevious(isSwap);

  useEffect(
    function updateInputAmounts() {
      if (!fromToken || !toToken || (!isSwap && !isIncrease)) {
        return;
      }

      // reset input values when switching between swap and position tabs
      if (isSwap !== prevIsISwap) {
        setFocusedInput("from");
        setFromTokenInputValue("", true);
        return;
      }

      if (isSwap && swapAmounts) {
        if (focusedInput === "from") {
          setToTokenInputValue(
            swapAmounts.amountOut.gt(0) ? formatAmountFree(swapAmounts.amountOut, toToken.decimals) : "",
            false
          );
        } else {
          setFromTokenInputValue(
            swapAmounts.amountIn.gt(0) ? formatAmountFree(swapAmounts.amountIn, fromToken.decimals) : "",
            false
          );
        }
      }

      if (isIncrease && increaseAmounts) {
        if (focusedInput === "from") {
          setToTokenInputValue(
            increaseAmounts.indexTokenAmount?.gt(0)
              ? formatAmountFree(increaseAmounts.indexTokenAmount, toToken.decimals)
              : "",
            false
          );
        } else {
          setFromTokenInputValue(
            increaseAmounts.initialCollateralAmount.gt(0)
              ? formatAmountFree(increaseAmounts.initialCollateralAmount, fromToken.decimals)
              : "",
            false
          );
        }
      }
    },
    [
      focusedInput,
      fromToken,
      increaseAmounts,
      isIncrease,
      isSwap,
      prevIsISwap,
      setFocusedInput,
      setFromTokenInputValue,
      setToTokenInputValue,
      swapAmounts,
      toToken,
    ]
  );

  useEffect(
    function updatePositionMarket() {
      if (!isPosition || !marketsOptions.availableMarkets) {
        return;
      }

      const needUpdateMarket =
        !marketAddress || !marketsOptions.availableMarkets.find((m) => m.marketTokenAddress === marketAddress);

      if (needUpdateMarket && marketsOptions.marketWithPosition) {
        onSelectMarketAddress(marketsOptions.marketWithPosition.marketTokenAddress);
        return;
      }

      const optimalMarket =
        marketsOptions.minPriceImpactMarket || marketsOptions.maxLiquidityMarket || marketsOptions.availableMarkets[0];

      if (needUpdateMarket && optimalMarket) {
        onSelectMarketAddress(optimalMarket.marketTokenAddress);
        return;
      }
    },
    [
      availableMarkets,
      chainId,
      isLong,
      isPosition,
      marketAddress,
      marketsOptions.availableMarkets,
      marketsOptions.collateralWithPosition,
      marketsOptions.marketWithPosition,
      marketsOptions.maxLiquidityMarket,
      marketsOptions.minPriceImpactMarket,
      onSelectCollateralAddress,
      onSelectMarketAddress,
    ]
  );

  const prevMarketAddress = usePrevious(marketAddress);
  useEffect(
    function updatePositionCollateral() {
      if (!isPosition) {
        return;
      }

      if (marketAddress && prevMarketAddress !== marketAddress && marketsOptions.collateralWithPosition) {
        onSelectCollateralAddress(marketsOptions.collateralWithPosition.address);
      }
    },
    [isPosition, marketAddress, marketsOptions.collateralWithPosition, onSelectCollateralAddress, prevMarketAddress]
  );

  useEffect(
    function resetTriggerPrice() {
      setTriggerPriceInputValue("");
    },
    [setTriggerPriceInputValue, toTokenAddress, tradeMode]
  );

  function onSwitchTokens() {
    setFocusedInput((old) => (old === "from" ? "to" : "from"));
    switchTokenAddresses();
    setFromTokenInputValue(toTokenInputValue || "", true);
    setToTokenInputValue(fromTokenInputValue || "", true);
  }

  const onConfirmationClose = useCallback(() => {
    setSelectedAcceptablePriceImapctBps(undefined);
    setDefaultTriggerAcceptablePriceImapctBps(undefined);
    setFixedTriggerOrderType(undefined);
    setFixedTriggerThresholdType(undefined);
    setStage("trade");
  }, [
    setDefaultTriggerAcceptablePriceImapctBps,
    setFixedTriggerOrderType,
    setFixedTriggerThresholdType,
    setSelectedAcceptablePriceImapctBps,
    setStage,
  ]);

  const onConfirmed = useCallback(() => {
    if (isMarket) {
      setStage("processing");
      return;
    }
    setStage("trade");
  }, [isMarket, setStage]);

  if (showDebugValues) {
    const swapPathStats = swapAmounts?.swapPathStats || increaseAmounts?.swapPathStats;

    if (swapPathStats) {
      // eslint-disable-next-line no-console
      console.log("Swap Path", {
        path: swapPathStats.swapPath.map((marketAddress) => marketsInfoData?.[marketAddress]?.name).join(" -> "),
        priceImpact: swapPathStats.swapSteps.map((step) => formatDeltaUsd(step.priceImpactDeltaUsd)).join(" -> "),
        usdOut: swapPathStats.swapSteps.map((step) => formatUsd(step.usdOut)).join(" -> "),
      });
    }
  }

  function onMaxClick() {
    if (fromToken?.balance) {
      let maxAvailableAmount = fromToken.isNative
        ? fromToken.balance.sub(BigNumber.from(minResidualAmount || 0))
        : fromToken.balance;

      if (maxAvailableAmount.isNegative()) {
        maxAvailableAmount = BigNumber.from(0);
      }

      setFocusedInput("from");
      const formattedAmount = formatAmountFree(maxAvailableAmount, fromToken.decimals);
      const finalAmount = isMetamaskMobile
        ? limitDecimals(formattedAmount, MAX_METAMASK_MOBILE_DECIMALS)
        : formattedAmount;
      setFromTokenInputValue(finalAmount, true);
    }
  }

  function renderTokenInputs() {
    return (
      <>
        <BuyInputSection
          topLeftLabel={t`Pay`}
          topLeftValue={fromUsd?.gt(0) ? formatUsd(isIncrease ? increaseAmounts?.initialCollateralUsd : fromUsd) : ""}
          topRightLabel={t`Balance`}
          topRightValue={formatTokenAmount(fromToken?.balance, fromToken?.decimals, "", {
            useCommas: true,
          })}
          onClickTopRightLabel={onMaxClick}
          inputValue={fromTokenInputValue}
          onInputValueChange={(e) => {
            setFocusedInput("from");
            setFromTokenInputValue(e.target.value, true);
          }}
          showMaxButton={isNotMatchAvailableBalance}
          onClickMax={onMaxClick}
        >
          {fromTokenAddress && (
            <TokenSelector
              label={t`Pay`}
              chainId={chainId}
              tokenAddress={fromTokenAddress}
              onSelectToken={(token) => onSelectFromTokenAddress(token.address)}
              tokens={swapTokens}
              infoTokens={infoTokens}
              className="GlpSwap-from-token"
              showSymbolImage={true}
              showTokenImgInDropdown={true}
              extendedSortSequence={sortedLongAndShortTokens}
            />
          )}
        </BuyInputSection>

        <div className="Exchange-swap-ball-container">
          <button type="button" className="Exchange-swap-ball" onClick={onSwitchTokens}>
            <IoMdSwap className="Exchange-swap-ball-icon" />
          </button>
        </div>

        {isSwap && (
          <BuyInputSection
            topLeftLabel={t`Receive`}
            topLeftValue={swapAmounts?.usdOut.gt(0) ? formatUsd(swapAmounts?.usdOut) : ""}
            topRightLabel={t`Balance`}
            topRightValue={formatTokenAmount(toToken?.balance, toToken?.decimals, "", {
              useCommas: true,
            })}
            inputValue={toTokenInputValue}
            onInputValueChange={(e) => {
              setFocusedInput("to");
              setToTokenInputValue(e.target.value, true);
            }}
            showMaxButton={false}
            preventFocusOnLabelClick="right"
          >
            {toTokenAddress && (
              <TokenSelector
                label={t`Receive`}
                chainId={chainId}
                tokenAddress={toTokenAddress}
                onSelectToken={(token) => onSelectToTokenAddress(token.address)}
                tokens={swapTokens}
                infoTokens={infoTokens}
                className="GlpSwap-from-token"
                showSymbolImage={true}
                showBalances={true}
                showTokenImgInDropdown={true}
                extendedSortSequence={sortedLongAndShortTokens}
              />
            )}
          </BuyInputSection>
        )}

        {isIncrease && (
          <BuyInputSection
            topLeftLabel={tradeTypeLabels[tradeType!]}
            topLeftValue={
              increaseAmounts?.sizeDeltaUsd.gt(0)
                ? formatUsd(increaseAmounts?.sizeDeltaUsd, { fallbackToZero: true })
                : ""
            }
            topRightLabel={t`Leverage`}
            topRightValue={formatLeverage(isLeverageEnabled ? leverage : increaseAmounts?.estimatedLeverage) || "-"}
            inputValue={toTokenInputValue}
            onInputValueChange={(e) => {
              setFocusedInput("to");
              setToTokenInputValue(e.target.value, true);
            }}
            showMaxButton={false}
          >
            {toTokenAddress && (
              <TokenSelector
                label={tradeTypeLabels[tradeType!]}
                chainId={chainId}
                tokenAddress={toTokenAddress}
                onSelectToken={(token) => onSelectToTokenAddress(token.address)}
                tokens={indexTokens}
                infoTokens={infoTokens}
                className="GlpSwap-from-token"
                showSymbolImage={true}
                showBalances={false}
                showTokenImgInDropdown={true}
                extendedSortSequence={sortedIndexTokensWithPoolValue}
              />
            )}
          </BuyInputSection>
        )}
      </>
    );
  }

  function renderDecreaseSizeInput() {
    return (
      <BuyInputSection
        topLeftLabel={t`Close`}
        topRightLabel={selectedPosition?.sizeInUsd ? `Max` : undefined}
        topRightValue={selectedPosition?.sizeInUsd ? formatUsd(selectedPosition.sizeInUsd) : undefined}
        inputValue={closeSizeInputValue}
        onInputValueChange={(e) => setCloseSizeInputValue(e.target.value)}
        onClickTopRightLabel={() => setCloseSizeInputValue(formatAmount(selectedPosition?.sizeInUsd, USD_DECIMALS, 2))}
        showMaxButton={selectedPosition?.sizeInUsd.gt(0) && !closeSizeUsd?.eq(selectedPosition.sizeInUsd)}
        onClickMax={() => setCloseSizeInputValue(formatAmount(selectedPosition?.sizeInUsd, USD_DECIMALS, 2))}
        showPercentSelector={selectedPosition?.sizeInUsd.gt(0)}
        onPercentChange={(percent) =>
          setCloseSizeInputValue(formatAmount(selectedPosition?.sizeInUsd.mul(percent).div(100), USD_DECIMALS, 2))
        }
      >
        USD
      </BuyInputSection>
    );
  }

  function renderTriggerPriceInput() {
    return (
      <BuyInputSection
        topLeftLabel={t`Price`}
        topRightLabel={t`Mark`}
        topRightValue={formatUsd(markPrice, {
          displayDecimals: toToken?.priceDecimals,
        })}
        onClickTopRightLabel={() => {
          setTriggerPriceInputValue(formatAmount(markPrice, USD_DECIMALS, toToken?.priceDecimals || 2));
        }}
        inputValue={triggerPriceInputValue}
        onInputValueChange={(e) => {
          setTriggerPriceInputValue(e.target.value);
        }}
      >
        USD
      </BuyInputSection>
    );
  }

  function renderTriggerRatioInput() {
    return (
      <BuyInputSection
        topLeftLabel={t`Price`}
        topRightLabel={t`Mark`}
        topRightValue={formatAmount(markRatio?.ratio, USD_DECIMALS, 4)}
        onClickTopRightLabel={() => {
          setTriggerRatioInputValue(formatAmount(markRatio?.ratio, USD_DECIMALS, 10));
        }}
        inputValue={triggerRatioInputValue}
        onInputValueChange={(e) => {
          setTriggerRatioInputValue(e.target.value);
        }}
      >
        {markRatio && (
          <>
            <TokenWithIcon symbol={markRatio.smallestToken.symbol} displaySize={20} />
             per 
            <TokenWithIcon symbol={markRatio.largestToken.symbol} displaySize={20} />
          </>
        )}
      </BuyInputSection>
    );
  }

  function renderPositionControls() {
    return (
      <>
        {isIncrease && (
          <>
            <ToggleSwitch
              className="Exchange-leverage-slider-settings"
              isChecked={isLeverageEnabled ?? false}
              setIsChecked={setIsLeverageEnabled}
            >
              <span className="muted">
                <Trans>Leverage slider</Trans>
              </span>
            </ToggleSwitch>

            {isLeverageEnabled && (
              <LeverageSlider value={leverageOption} onChange={setLeverageOption} isPositive={isLong} />
            )}
          </>
        )}
        {isTrigger && (
          <ExchangeInfoRow
            className="SwapBox-info-row"
            label={t`Market`}
            value={
              <MarketSelector
                label={t`Market`}
                className="SwapBox-info-dropdown"
                selectedIndexName={toToken ? getMarketIndexName({ indexToken: toToken, isSpotOnly: false }) : undefined}
                markets={sortedAllMarkets || emptyArray}
                isSideMenu
                onSelectMarket={(indexName, marketInfo) => onSelectToTokenAddress(marketInfo.indexToken.address)}
              />
            }
          />
        )}

        <MarketPoolSelectorRow
          selectedMarket={marketInfo}
          indexToken={toToken}
          marketsOptions={marketsOptions}
          hasExistingOrder={Boolean(existingOrder)}
          hasExistingPosition={Boolean(selectedPosition)}
          isOutPositionLiquidity={isOutPositionLiquidity}
          currentPriceImpactBps={increaseAmounts?.acceptablePriceDeltaBps}
          onSelectMarketAddress={onSelectMarketAddress}
        />

        <CollateralSelectorRow
          selectedMarketAddress={marketInfo?.marketTokenAddress}
          selectedCollateralAddress={collateralAddress}
          availableCollaterals={availableCollaterals}
          marketsOptions={marketsOptions}
          hasExistingOrder={Boolean(existingOrder)}
          hasExistingPosition={Boolean(selectedPosition)}
          onSelectCollateralAddress={onSelectCollateralAddress}
          isMarket={isMarket}
        />

        {isTrigger && selectedPosition?.leverage && (
          <Checkbox asRow isChecked={keepLeverage} setIsChecked={setKeepLeverage}>
            <span className="muted font-sm">
              <Trans>Keep leverage at {formatLeverage(selectedPosition.leverage)} </Trans>
            </span>
          </Checkbox>
        )}
      </>
    );
  }

  function renderIncreaseOrderInfo() {
    return (
      <>
        <ExchangeInfoRow
          className="SwapBox-info-row"
          label={t`Leverage`}
          value={
            nextPositionValues?.nextLeverage && increaseAmounts?.sizeDeltaUsd.gt(0) ? (
              <ValueTransition
                from={formatLeverage(selectedPosition?.leverage)}
                to={formatLeverage(nextPositionValues?.nextLeverage) || "-"}
              />
            ) : (
              formatLeverage(isLeverageEnabled ? leverage : increaseAmounts?.estimatedLeverage) || "-"
            )
          }
        />

        <ExchangeInfoRow
          className="SwapBox-info-row"
          label={t`Entry Price`}
          value={
            nextPositionValues?.nextEntryPrice || selectedPosition?.entryPrice ? (
              <ValueTransition
                from={formatUsd(selectedPosition?.entryPrice, {
                  displayDecimals: toToken?.priceDecimals,
                })}
                to={formatUsd(nextPositionValues?.nextEntryPrice, {
                  displayDecimals: toToken?.priceDecimals,
                })}
              />
            ) : (
              formatUsd(markPrice, {
                displayDecimals: toToken?.priceDecimals,
              })
            )
          }
        />

        <ExchangeInfoRow
          className="SwapBox-info-row"
          label={t`Liq. Price`}
          value={
            <ValueTransition
              from={
                selectedPosition
                  ? formatLiquidationPrice(selectedPosition?.liquidationPrice, {
                      displayDecimals: selectedPosition?.indexToken?.priceDecimals,
                    })
                  : undefined
              }
              to={
                increaseAmounts?.sizeDeltaUsd.gt(0)
                  ? formatLiquidationPrice(nextPositionValues?.nextLiqPrice, {
                      displayDecimals: toToken?.priceDecimals,
                    })
                  : selectedPosition
                  ? undefined
                  : "-"
              }
            />
          }
        />
      </>
    );
  }

  const executionPriceUsd = useMemo(() => {
    if (!marketInfo) return null;
    if (!fees?.positionPriceImpact?.deltaUsd) return null;
    if (!decreaseAmounts) return null;
    if (!triggerPrice) return null;

    return getExecutionPriceForDecrease(
      triggerPrice,
      fees.positionPriceImpact.deltaUsd,
      decreaseAmounts.sizeDeltaUsd,
      isLong
    );
  }, [decreaseAmounts, fees?.positionPriceImpact?.deltaUsd, isLong, marketInfo, triggerPrice]);

  function renderTriggerOrderInfo() {
    return (
      <>
        <ExchangeInfoRow
          className="SwapBox-info-row"
          label={t`Trigger Price`}
          value={`${decreaseAmounts?.triggerThresholdType || ""} ${
            formatUsd(decreaseAmounts?.triggerPrice, {
              displayDecimals: toToken?.priceDecimals,
            }) || "-"
          }`}
        />

        <ExchangeInfoRow
          className="SwapBox-info-row"
          label={t`Execution Price`}
          value={
            executionPriceUsd
              ? formatUsd(executionPriceUsd, {
                  displayDecimals: toToken?.priceDecimals,
                })
              : "-"
          }
        />

        {selectedPosition && (
          <ExchangeInfoRow
            className="SwapBox-info-row"
            label={t`Liq. Price`}
            value={
              <ValueTransition
                from={
                  selectedPosition
                    ? formatLiquidationPrice(selectedPosition?.liquidationPrice, {
                        displayDecimals: selectedPosition?.indexToken?.priceDecimals,
                      })
                    : undefined
                }
                to={
                  decreaseAmounts?.isFullClose
                    ? "-"
                    : decreaseAmounts?.sizeDeltaUsd.gt(0)
                    ? formatLiquidationPrice(nextPositionValues?.nextLiqPrice, {
                        displayDecimals: toToken?.priceDecimals,
                      })
                    : undefined
                }
              />
            }
          />
        )}

        {selectedPosition?.sizeInUsd.gt(0) && (
          <ExchangeInfoRow
            className="SwapBox-info-row"
            label={t`Size`}
            value={
              <ValueTransition
                from={formatUsd(selectedPosition.sizeInUsd)!}
                to={formatUsd(nextPositionValues?.nextSizeUsd)}
              />
            }
          />
        )}

        {selectedPosition && (
          <ExchangeInfoRow
            className="SwapBox-info-row"
            label={t`Collateral (${selectedPosition?.collateralToken?.symbol})`}
            value={
              <ValueTransition
                from={formatUsd(selectedPosition.collateralUsd)}
                to={formatUsd(nextPositionValues?.nextCollateralUsd)}
              />
            }
          />
        )}

        {selectedPosition && (
          <ExchangeInfoRow
            className="SwapBox-info-row"
            label={t`Leverage`}
            value={
              selectedPosition.sizeInUsd.eq(decreaseAmounts?.sizeDeltaUsd || 0) ? (
                "-"
              ) : (
                <ValueTransition
                  from={formatLeverage(selectedPosition.leverage)}
                  to={formatLeverage(nextPositionValues?.nextLeverage)}
                />
              )
            }
          />
        )}

        {selectedPosition && (
          <ExchangeInfoRow
            label={t`PnL`}
            value={
              <ValueTransition
                from={
                  <>
                    {formatDeltaUsd(decreaseAmounts?.estimatedPnl)} (
                    {formatPercentage(decreaseAmounts?.estimatedPnlPercentage, { signed: true })})
                  </>
                }
                to={
                  decreaseAmounts?.sizeDeltaUsd.gt(0) ? (
                    <>
                      {formatDeltaUsd(nextPositionValues?.nextPnl)} (
                      {formatPercentage(nextPositionValues?.nextPnlPercentage, { signed: true })})
                    </>
                  ) : undefined
                }
              />
            }
          />
        )}
      </>
    );
  }

  const buttonContent = (
    <Button
      variant="primary-action"
      className="w-full"
      onClick={onSubmit}
      disabled={isSubmitButtonDisabled && !shouldDisableValidation}
    >
      {buttonErrorText || submitButtonText}
    </Button>
  );
  const button = tooltipContent ? (
    <Tooltip
      className="w-full"
      renderContent={() => tooltipContent}
      handle={buttonContent}
      handleClassName="w-full"
      position="center-bottom"
    />
  ) : (
    buttonContent
  );

  return (
    <>
      <div>
        <div className={`App-box SwapBox`}>
          <Tab
            icons={tradeTypeIcons}
            options={Object.values(TradeType)}
            optionLabels={tradeTypeLabels}
            option={tradeType}
            onChange={onSelectTradeType}
            className="SwapBox-option-tabs"
          />

          <Tab
            options={availalbleTradeModes}
            optionLabels={tradeModeLabels}
            className="SwapBox-asset-options-tabs"
            type="inline"
            option={tradeMode}
            onChange={onSelectTradeMode}
          />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            {(isSwap || isIncrease) && renderTokenInputs()}
            {isTrigger && renderDecreaseSizeInput()}

            {isSwap && isLimit && renderTriggerRatioInput()}
            {isPosition && (isLimit || isTrigger) && renderTriggerPriceInput()}

            <div className="SwapBox-info-section">
              {isPosition && (
                <>
                  {renderPositionControls()}
                  <div className="App-card-divider" />
                </>
              )}

              {isIncrease && renderIncreaseOrderInfo()}
              {isTrigger && renderTriggerOrderInfo()}

              <div className="App-card-divider" />

              {feesType && <TradeFeesRow {...fees} executionFee={executionFee} feesType={feesType} />}

              {isTrigger && selectedPosition && decreaseAmounts?.receiveUsd && (
                <ExchangeInfoRow
                  className="SwapBox-info-row"
                  label={t`Receive`}
                  value={formatTokenAmountWithUsd(
                    decreaseAmounts.receiveTokenAmount,
                    decreaseAmounts.receiveUsd,
                    collateralToken?.symbol,
                    collateralToken?.decimals
                  )}
                />
              )}

              {priceImpactWarningState.shouldShowWarning && (
                <>
                  <div className="App-card-divider" />
                  <HighPriceImpactWarning
                    priceImpactWarinigState={priceImpactWarningState}
                    className="PositionEditor-allow-higher-slippage"
                  />
                </>
              )}
            </div>

            <div className="Exchange-swap-button-container">{button}</div>
          </form>
        </div>
      </div>

      {isSwap && <SwapCard maxLiquidityUsd={swapOutLiquidity} fromToken={fromToken} toToken={toToken} />}
      <div className="Exchange-swap-info-group">
        {isPosition && <MarketCard isLong={isLong} marketInfo={marketInfo} allowedSlippage={allowedSlippage} />}
      </div>

      <ConfirmationBox
        isVisible={stage === "confirmation"}
        isWrapOrUnwrap={isWrapOrUnwrap}
        fromToken={fromToken}
        toToken={toToken}
        markPrice={markPrice}
        markRatio={markRatio}
        triggerPrice={triggerPrice}
        fixedTriggerThresholdType={fixedTriggerThresholdType}
        fixedTriggerOrderType={fixedTriggerOrderType}
        selectedTriggerAcceptablePriceImpactBps={selectedTriggerAcceptablePriceImpactBps}
        setSelectedTriggerAcceptablePriceImapctBps={setSelectedAcceptablePriceImapctBps}
        defaultTriggerAcceptablePriceImpactBps={defaultTriggerAcceptablePriceImpactBps}
        triggerRatio={triggerRatio}
        marketInfo={marketInfo}
        collateralToken={collateralToken}
        marketsOptions={marketsOptions}
        swapAmounts={swapAmounts}
        increaseAmounts={increaseAmounts}
        decreaseAmounts={decreaseAmounts}
        nextPositionValues={nextPositionValues}
        swapLiquidityUsd={swapOutLiquidity}
        longLiquidityUsd={longLiquidity}
        shortLiquidityUsd={shortLiquidity}
        keepLeverage={keepLeverage}
        fees={fees}
        executionFee={executionFee}
        error={buttonErrorText}
        existingPosition={selectedPosition}
        shouldDisableValidation={shouldDisableValidation!}
        isHigherSlippageAllowed={isHigherSlippageAllowed}
        ordersData={ordersInfo}
        tokensData={tokensData}
        setIsHigherSlippageAllowed={setIsHigherSlippageAllowed}
        setKeepLeverage={setKeepLeverage}
        onClose={onConfirmationClose}
        onSubmitted={onConfirmed}
        setPendingTxns={setPendingTxns}
      />
    </>
  );
}
