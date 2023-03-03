import { createClient } from "./utils";
import { SUBGRAPH_URLS } from "config/subgraph";
import { ARBITRUM, ARBITRUM_TESTNET, AVALANCHE, AVALANCHE_FUJI } from "config/chains";

export const chainlinkClient = createClient(SUBGRAPH_URLS.common.chainLink);

export const arbitrumGraphClient = createClient(SUBGRAPH_URLS[ARBITRUM].stats);
export const arbitrumReferralsGraphClient = createClient(SUBGRAPH_URLS[ARBITRUM].referrals);
export const nissohGraphClient = createClient(SUBGRAPH_URLS[ARBITRUM].nissohVault);

export const avalancheGraphClient = createClient(SUBGRAPH_URLS[AVALANCHE].stats);
export const avalancheReferralsGraphClient = createClient(SUBGRAPH_URLS[AVALANCHE].referrals);

export const avalancheFujiSyntheticsStatsClient = createClient(SUBGRAPH_URLS[AVALANCHE_FUJI].syntheticsStats);

export function getSyntheticsGraphClient(chainId: number) {
  if (chainId === AVALANCHE_FUJI) {
    return avalancheFujiSyntheticsStatsClient;
  }

  return null;
}

export function getGmxGraphClient(chainId: number) {
  if (chainId === ARBITRUM) {
    return arbitrumGraphClient;
  } else if (chainId === AVALANCHE) {
    return avalancheGraphClient;
  } else if (chainId === ARBITRUM_TESTNET) {
    return null;
  }

  throw new Error(`Unsupported chain ${chainId}`);
}
