import DataStore from "abis/DataStore.json";
import { useMemo } from "react";
import { getContract } from "config/contracts";
import { getMarket } from "./utils";
import { useMulticall } from "lib/multicall";
import { useMarketsData } from "./useMarketsData";
import { MarketsPoolsData } from "./types";
import { poolAmountKey, reserveFactorKey } from "../dataStore";

export function useMarketsPoolsData(chainId: number): MarketsPoolsData {
  const marketsData = useMarketsData(chainId);

  const marketAddresses = Object.keys(marketsData);

  const { data: marketPools } = useMulticall(chainId, "useMarketPools", {
    key: marketAddresses.length > 0 && [marketAddresses.join("-")],
    request: () => ({
      dataStore: {
        contractAddress: getContract(chainId, "DataStore"),
        abi: DataStore.abi,
        calls: marketAddresses.reduce((calls, marketAddress) => {
          const market = getMarket(marketsData, marketAddress);

          if (!market) return calls;

          return Object.assign(calls, {
            [`${marketAddress}-longPoolAmount`]: {
              methodName: "getUint",
              params: [poolAmountKey(marketAddress, market.longTokenAddress)],
            },
            [`${marketAddress}-shortPoolAmount`]: {
              methodName: "getUint",
              params: [poolAmountKey(marketAddress, market!.shortTokenAddress)],
            },
            [`${marketAddress}-reserveFactor-long`]: {
              methodName: "getUint",
              params: [reserveFactorKey(marketAddress, true)],
            },
            [`${marketAddress}-reserveFactor-short`]: {
              methodName: "getUint",
              params: [reserveFactorKey(marketAddress, true)],
            },
          });
        }, {}),
      },
    }),
    parseResponse: (res) =>
      marketAddresses.reduce((acc: MarketsPoolsData, marketAddress: string) => {
        const longPoolAmount = res.dataStore[`${marketAddress}-longPoolAmount`].returnValues[0];
        const shortPoolAmount = res.dataStore[`${marketAddress}-shortPoolAmount`].returnValues[0];
        const reserveFactorLong = res.dataStore[`${marketAddress}-reserveFactor-long`].returnValues[0];
        const reserveFactorShort = res.dataStore[`${marketAddress}-reserveFactor-short`].returnValues[0];

        if (!longPoolAmount || !shortPoolAmount || !reserveFactorLong || !reserveFactorShort) return acc;

        acc[marketAddress] = {
          longPoolAmount,
          shortPoolAmount,
          reserveFactorLong,
          reserveFactorShort,
        };

        return acc;
      }, {} as MarketsPoolsData),
  });

  return useMemo(() => {
    return marketPools || {};
  }, [marketPools]);
}
