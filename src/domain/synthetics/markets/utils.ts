import { NATIVE_TOKEN_ADDRESS } from "config/tokens";
import { TokensData } from "../tokens/types";
import { getTokenData, getUsdFromTokenAmount } from "../tokens/utils";
import {
  MarketPoolType,
  MarketsData,
  MarketsPoolsData,
  MarketTokensData,
  MarketsOpenInterestData,
  Market,
} from "./types";

export function getMarket(marketsData: MarketsData, marketAddress?: string) {
  if (!marketAddress) return undefined;

  return marketsData[marketAddress];
}

export function getMarkets(marketsData: MarketsData) {
  return Object.values(marketsData);
}

export function getMarketByTokens(marketsData: MarketsData, indexToken?: string, collateralToken?: string) {
  const markets = getMarkets(marketsData);

  return markets.find((market) => {
    const byIndex = indexToken ? market.indexTokenAddress === indexToken : true;

    const byCollateral = collateralToken
      ? [market.longTokenAddress, market.shortTokenAddress].includes(collateralToken)
      : true;

    return byIndex && byCollateral;
  });
}

export function getMarketName(
  marketsData: MarketsData,
  tokensData: TokensData,
  marketAddress?: string,
  fallbackToPlaceholder?: boolean,
  includeGm: boolean = true
) {
  const market = getMarket(marketsData, marketAddress);

  const indexAddress = market?.isIndexWrapped ? NATIVE_TOKEN_ADDRESS : market?.indexTokenAddress;

  const indexToken = getTokenData(tokensData, indexAddress);
  const longToken = getTokenData(tokensData, market?.longTokenAddress);
  const shortToken = getTokenData(tokensData, market?.shortTokenAddress);

  const gmText = includeGm ? "GM: " : "";

  if (!market || !indexToken || !longToken || !shortToken) {
    if (fallbackToPlaceholder) {
      return `${gmText} ---/--- [-------]`;
    }

    return undefined;
  }

  return `${gmText} ${indexToken.symbol}/${market.perp} [${longToken.symbol}-${shortToken.symbol}]`;
}

export function getOppositeCollateral(market: Market, collateralToken: string) {
  if (market.longTokenAddress === collateralToken) {
    return market.shortTokenAddress;
  }

  if (market.shortTokenAddress === collateralToken) {
    return market.longTokenAddress;
  }

  return undefined;
}

export function getMarketPoolData(poolsData: MarketsPoolsData, marketAddress?: string) {
  if (!marketAddress) return undefined;

  return poolsData[marketAddress];
}

export function getOpenInterest(openInterestData: MarketsOpenInterestData, marketAddress?: string) {
  if (!marketAddress) return undefined;

  return openInterestData[marketAddress];
}

export function getTokenPoolAmount(
  marketsData: MarketsData,
  poolsData: MarketsPoolsData,
  marketAddress?: string,
  tokenAddress?: string
) {
  const pools = getMarketPoolData(poolsData, marketAddress);
  const tokenPoolType = getTokenPoolType(marketsData, marketAddress, tokenAddress);

  if (!pools || !tokenPoolType) return undefined;

  if (tokenPoolType === MarketPoolType.Long) {
    return pools.longPoolAmount;
  }

  if (tokenPoolType === MarketPoolType.Short) {
    return pools.shortPoolAmount;
  }

  return undefined;
}

export function getPoolAmountUsd(
  marketsData: MarketsData,
  poolsData: MarketsPoolsData,
  tokensData: TokensData,
  marketAddress?: string,
  tokenAddress?: string,
  useMaxPrice?: boolean
) {
  const tokenAmount = getTokenPoolAmount(marketsData, poolsData, marketAddress, tokenAddress);

  return getUsdFromTokenAmount(tokensData, tokenAddress, tokenAmount, useMaxPrice);
}

export function getTokenPoolType(marketsData: MarketsData, marketAddress?: string, tokenAddress?: string) {
  const market = getMarket(marketsData, marketAddress);

  if (!market) return undefined;

  if (market.longTokenAddress === tokenAddress || (market.isLongWrapped && tokenAddress === NATIVE_TOKEN_ADDRESS)) {
    return MarketPoolType.Long;
  }

  if (market.shortTokenAddress === tokenAddress || (market.isShortWrapped && tokenAddress === NATIVE_TOKEN_ADDRESS)) {
    return MarketPoolType.Short;
  }

  return undefined;
}

export function getMarketTokenData(marketTokensData: MarketTokensData, marketAddress?: string) {
  if (!marketAddress) return undefined;

  return marketTokensData[marketAddress];
}
