import { getOracleKeeperUrlKey } from "config/localStorage";
import { getOracleKeeperRandomIndex, getOracleKeeperUrl } from "config/oracleKeeper";
import { timezoneOffset } from "domain/prices";
import { Bar } from "domain/tradingview/types";
import { buildUrl } from "lib/buildUrl";
import { useMemo } from "react";

export type TickersResponse = {
  minPrice: string;
  maxPrice: string;
  oracleDecimals: number;
  tokenSymbol: string;
  tokenAddress: string;
  updatedAt: number;
}[];

export type DayPriceCandle = {
  tokenSymbol: string;
  high: number;
  low: number;
  open: number;
  close: number;
};

export type OracleKeeperFetcher = ReturnType<typeof useOracleKeeperFetcher>;

function parseOracleCandle(rawCandle: number[]): Bar {
  const [timestamp, open, high, low, close] = rawCandle;

  return {
    time: timestamp + timezoneOffset,
    open,
    high,
    low,
    close,
  };
}

export function getCurrentOracleKeeperIndex(chainId: number) {
  let index = Number(localStorage.getItem(getOracleKeeperUrlKey(chainId)));

  if (Number.isNaN(index)) {
    index = getOracleKeeperRandomIndex(chainId);
    localStorage.setItem(getOracleKeeperUrlKey(chainId), String(index));
  }

  return index;
}

export function useOracleKeeperFetcher(chainId: number) {
  const oracleKeeperIndex = getCurrentOracleKeeperIndex(chainId);
  const oracleKeeperUrl = getOracleKeeperUrl(chainId, oracleKeeperIndex);

  return useMemo(() => {
    function updateOracleKeeperUrl(chainId: number) {
      const nextIndex = getOracleKeeperRandomIndex(chainId, [oracleKeeperIndex]);

      // eslint-disable-next-line no-console
      console.log(`switch oracle keeper to ${getOracleKeeperUrl(chainId, nextIndex)}`);

      localStorage.setItem(getOracleKeeperUrlKey(chainId), String(nextIndex));
    }

    function fetchTickers(): Promise<TickersResponse> {
      return fetch(buildUrl(oracleKeeperUrl!, "/prices/tickers"))
        .then((res) => res.json())
        .then((res) => {
          if (!res.length) {
            throw new Error("Invalid tickers response");
          }

          return res;
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error(e);
          updateOracleKeeperUrl(chainId);

          throw e;
        });
    }

    function fetch24hPrices(): Promise<DayPriceCandle[]> {
      return fetch(buildUrl(oracleKeeperUrl!, "/prices/24h"))
        .then((res) => res.json())
        .then((res) => {
          if (!res?.length) {
            throw new Error("Invalid 24h prices response");
          }

          return res;
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error(e);
          updateOracleKeeperUrl(chainId);
          throw e;
        });
    }

    async function fetchOracleCandles(tokenSymbol: string, period: string, limit: number): Promise<Bar[]> {
      return fetch(buildUrl(oracleKeeperUrl!, "/prices/candles", { tokenSymbol, period, limit }))
        .then((res) => res.json())
        .then((res) => {
          if (!Array.isArray(res.candles) || (res.candles.length === 0 && limit > 0)) {
            throw new Error("Invalid candles response");
          }

          return res.candles.map(parseOracleCandle);
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error(e);
          updateOracleKeeperUrl(chainId);
          throw e;
        });
    }

    return {
      oracleKeeperUrl,
      fetchTickers,
      fetch24hPrices,
      fetchOracleCandles,
    };
  }, [chainId, oracleKeeperIndex, oracleKeeperUrl]);
}
