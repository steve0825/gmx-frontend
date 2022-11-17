import { useEffect, useState } from "react";
import { FALLBACK_PROVIDERS, getRpcUrl, RPC_PROVIDERS } from "config/chains";
import _ from "lodash";
import { ethers } from "ethers";
import { StaticJsonRpcProvider, Web3Provider } from "@ethersproject/providers";

export function getProvider(library: Web3Provider | undefined, chainId: number) {
  let provider;

  if (library) {
    return library.getSigner();
  }

  provider = _.sample(RPC_PROVIDERS[chainId]);

  return new ethers.providers.StaticJsonRpcProvider(
    provider,
    // @ts-ignore incorrect Network param types
    { chainId }
  );
}

export function getFallbackProvider(chainId: number) {
  if (!FALLBACK_PROVIDERS[chainId]) {
    return;
  }

  const provider = _.sample(FALLBACK_PROVIDERS[chainId]);

  return new ethers.providers.StaticJsonRpcProvider(
    provider,
    // @ts-ignore incorrect Network param types
    { chainId }
  );
}

export function useJsonRpcProvider(p: { chainId: number }) {
  const [provider, setProvider] = useState<StaticJsonRpcProvider>();

  useEffect(() => {
    async function initializeProvider() {
      const provider = new ethers.providers.JsonRpcProvider(getRpcUrl(p.chainId));

      await provider.ready;

      setProvider(provider);
    }

    initializeProvider();
  }, [p.chainId]);

  return { provider };
}
