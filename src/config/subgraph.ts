import { ARBITRUM, ARBITRUM_GOERLI, AVALANCHE, AVALANCHE_FUJI, ETH_MAINNET } from "./chains";
import { isDevelopment } from "./env";
import { getSubgraphUrlKey } from "./localStorage";

const SUBGRAPH_URLS = {
  [ARBITRUM]: {
    stats: "https://subgraph.satsuma-prod.com/3b2ced13c8d9/gmx/gmx-arbitrum-stats/api",
    referrals: "https://subgraph.satsuma-prod.com/3b2ced13c8d9/gmx/gmx-arbitrum-referrals/api",
    nissohVault: "https://api.thegraph.com/subgraphs/name/nissoh/gmx-vault",
    syntheticsStats:
      "https://subgraph.satsuma-prod.com/713b540e7060/gmx-2/synthetics-arbitrum-stats/version/trade-actions-pr-230926133847-8cb1dc2/api",
  },

  [ARBITRUM_GOERLI]: {
    stats: "https://subgraph.satsuma-prod.com/3b2ced13c8d9/gmx/gmx-arbitrum-stats/api",
    referrals: "https://subgraph.satsuma-prod.com/3b2ced13c8d9/gmx/gmx-goerli-referrals/api",
    syntheticsStats:
      "https://subgraph.satsuma-prod.com/713b540e7060/gmx-2/synthetics-goerli-stats/version/trade-actions-pr-230926145029-cc56ebf/api",
  },

  [AVALANCHE]: {
    stats: "https://subgraph.satsuma-prod.com/3b2ced13c8d9/gmx/gmx-avalanche-stats/api",
    referrals: "https://subgraph.satsuma-prod.com/3b2ced13c8d9/gmx/gmx-avalanche-referrals/api",
    syntheticsStats:
      "https://subgraph.satsuma-prod.com/713b540e7060/gmx-2/synthetics-avalanche-stats/version/trade-actions-pr-230926145100-cc56ebf/api",
  },

  [AVALANCHE_FUJI]: {
    stats: "https://api.thegraph.com/subgraphs/name/gmx-io/gmx-avalanche-stats",
    referrals: "https://subgraph.satsuma-prod.com/3b2ced13c8d9/gmx/gmx-fuji-referrals/api",
    syntheticsStats:
      "https://subgraph.satsuma-prod.com/713b540e7060/gmx-2/synthetics-fuji-stats/version/trade-actions-pr-230926144944-cc56ebf/api",
  },

  common: {
    [ETH_MAINNET]: {
      chainLink: "https://api.thegraph.com/subgraphs/name/deividask/chainlink",
    },
  },
};

export function getSubgraphUrl(chainId: number, subgraph: string) {
  if (isDevelopment()) {
    const localStorageKey = getSubgraphUrlKey(chainId, subgraph);
    const url = localStorage.getItem(localStorageKey);
    if (url) {
      // eslint-disable-next-line no-console
      console.warn("%s subgraph on chain %s url is overriden: %s", subgraph, chainId, url);
      return url;
    }
  }

  return SUBGRAPH_URLS?.[chainId]?.[subgraph];
}
