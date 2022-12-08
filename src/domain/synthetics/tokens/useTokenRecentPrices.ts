import { getTokenBySymbol } from "config/tokens";
import { jsonFetcher } from "lib/fetcher";
import { expandDecimals } from "lib/numbers";
import { TokenPricesData, TokenPricesMap } from "./types";
import useSWR from "swr";
import { useMemo } from "react";
import { BigNumber } from "ethers";
import { getOracleKeeperUrl } from "config/oracleKeeper";

type BackendResponse = {
  minPrice: string;
  maxPrice: string;
  oracleDecimals: 6;
  tokenSymbol: string;
  updatedAt: number;
}[];

export function useTokenRecentPrices(chainId: number): TokenPricesData {
  const url = getOracleKeeperUrl(chainId, "/prices/tickers");

  const { data } = useSWR<BackendResponse>([url], { fetcher: jsonFetcher });

  return useMemo(() => {
    return {
      tokenPrices: formatResponse(chainId, data),
    };
  }, [data, chainId]);
}

function formatResponse(chainId: number, response: BackendResponse = []) {
  const result = response.reduce((acc, priceItem) => {
    let tokenConfig: any = {};

    try {
      tokenConfig = getTokenBySymbol(chainId, priceItem.tokenSymbol);
    } catch (e) {}

    if (!tokenConfig) {
      return acc;
    }

    acc[tokenConfig.address] = {
      minPrice: parseOraclePrice(priceItem.minPrice, tokenConfig.decimals, priceItem.oracleDecimals),
      maxPrice: parseOraclePrice(priceItem.maxPrice, tokenConfig.decimals, priceItem.oracleDecimals),
    };

    return acc;
  }, {} as TokenPricesMap);

  return result;
}

function parseOraclePrice(price: string, tokenDecimals: number, oracleDecimals: number) {
  try {
    return expandDecimals(price, tokenDecimals + oracleDecimals);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(price);

    return BigNumber.from(0);
  }
}
