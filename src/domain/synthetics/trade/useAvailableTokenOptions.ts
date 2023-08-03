import { NATIVE_TOKEN_ADDRESS, getTokensMap } from "config/tokens";
import { MarketsInfoData } from "domain/synthetics/markets";
import { InfoTokens, Token, getMidPrice } from "domain/tokens";
import { BigNumber } from "ethers";
import { getByKey } from "lib/objects";
import { useMemo } from "react";
import { TokenData, TokensData, adaptToV1InfoTokens, convertToUsd } from "../tokens";

export type AvailableTokenOptions = {
  tokensMap: { [address: string]: Token };
  infoTokens: InfoTokens;
  swapTokens: TokenData[];
  indexTokens: TokenData[];
  sortedIndexTokensWithPoolValue: string[];
  sortedLongAndShortTokens: string[];
};

export function useAvailableTokenOptions(
  chainId: number,
  p: {
    marketsInfoData?: MarketsInfoData;
    tokensData?: TokensData;
  }
): AvailableTokenOptions {
  const { marketsInfoData, tokensData } = p;

  return useMemo(() => {
    const marketsInfo = Object.values(marketsInfoData || {})
      .filter((market) => !market.isDisabled)
      .sort((a, b) => {
        return a.indexToken.symbol.localeCompare(b.indexToken.symbol);
      });

    const tokensMap = getTokensMap(chainId);
    const nativeToken = getByKey(tokensData, NATIVE_TOKEN_ADDRESS);

    const indexTokens = new Set<TokenData>();
    const indexTokensWithPoolValue: { [address: string]: BigNumber } = {};

    const collaterals = new Set<TokenData>();

    const longTokensWithPoolValue: { [address: string]: BigNumber } = {};
    const shortTokensWithPoolValue: { [address: string]: BigNumber } = {};

    for (const marketInfo of marketsInfo) {
      const longToken = marketInfo.longToken;
      const shortToken = marketInfo.shortToken;
      const indexToken = marketInfo.indexToken;

      if (marketInfo.isDisabled || !longToken || !shortToken || !indexToken) {
        continue;
      }

      if ((longToken.isWrapped || shortToken.isWrapped) && nativeToken) {
        collaterals.add(nativeToken);
      }

      collaterals.add(longToken);
      collaterals.add(shortToken);

      const longPoolAmountUsd = convertToUsd(
        marketInfo.longPoolAmount,
        marketInfo.longToken.decimals,
        getMidPrice(marketInfo.longToken.prices)
      )!;

      const shortPoolAmountUsd = convertToUsd(
        marketInfo.shortPoolAmount,
        marketInfo.shortToken.decimals,
        getMidPrice(marketInfo.shortToken.prices)
      )!;

      longTokensWithPoolValue[longToken.address] = (
        longTokensWithPoolValue[longToken.address] || BigNumber.from(0)
      ).add(longPoolAmountUsd);

      shortTokensWithPoolValue[shortToken.address] = (
        shortTokensWithPoolValue[shortToken.address] || BigNumber.from(0)
      ).add(shortPoolAmountUsd);

      if (!marketInfo.isSpotOnly) {
        indexTokens.add(indexToken);
        indexTokensWithPoolValue[indexToken.address] = marketInfo.poolValueMax;
      }
    }

    const sortedIndexTokensWithPoolValue = Object.keys(indexTokensWithPoolValue).sort((a, b) => {
      return indexTokensWithPoolValue[b].gt(indexTokensWithPoolValue[a]) ? 1 : -1;
    });

    const sortedLongTokens = Object.keys(longTokensWithPoolValue).sort((a, b) => {
      return longTokensWithPoolValue[b].gt(longTokensWithPoolValue[a]) ? 1 : -1;
    });

    const sortedShortTokens = Object.keys(shortTokensWithPoolValue).sort((a, b) => {
      return shortTokensWithPoolValue[b].gt(shortTokensWithPoolValue[a]) ? 1 : -1;
    });

    const sortedLongAndShortTokens = sortedLongTokens.concat(sortedShortTokens);

    return {
      tokensMap,
      swapTokens: Array.from(collaterals),
      indexTokens: Array.from(indexTokens),
      infoTokens: adaptToV1InfoTokens(tokensData || {}),
      sortedIndexTokensWithPoolValue,
      sortedLongAndShortTokens,
    };
  }, [chainId, marketsInfoData, tokensData]);
}
