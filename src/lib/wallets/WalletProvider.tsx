import React, { useEffect } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { connectorsForWallets, darkTheme, RainbowKitProvider, Theme, WalletList } from "@rainbow-me/rainbowkit";
import {
  ledgerWallet,
  safeWallet,
  rabbyWallet,
  injectedWallet,
  metaMaskWallet,
  walletConnectWallet,
  coinbaseWallet,
  rainbowWallet,
  imTokenWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createClient, useAccount, useConnect, WagmiConfig } from "wagmi";
import { arbitrum, arbitrumGoerli, avalanche, avalancheFuji } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import merge from "lodash/merge";
import { isDevelopment } from "config/env";
import { coreWallet } from "./connecters/core/coreWallet";
import { bitKeepWallet } from "./connecters/bitKeep/bitKeepWallet";

const WALLET_CONNECT_PROJECT_ID = "de24cddbaf2a68f027eae30d9bb5df58";
const APP_NAME = "GMX";

const walletTheme = merge(darkTheme(), {
  colors: {
    modalBackground: "#16182e",
    accentColor: "#9da5f2",
    menuItemBackground: "#808aff14",
  },
  radii: {
    modal: "4px",
    menuButton: "4px",
  },
} as Theme);

const { chains, provider } = configureChains(
  [arbitrum, avalanche, ...(isDevelopment() ? [arbitrumGoerli, avalancheFuji] : [])],
  [publicProvider()]
);

const recommendedWalletList: WalletList = [
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      safeWallet({ chains }),
      rabbyWallet({ chains }),
      metaMaskWallet({ chains, projectId: WALLET_CONNECT_PROJECT_ID }),
      walletConnectWallet({ chains, projectId: WALLET_CONNECT_PROJECT_ID }),
    ],
  },
];

const othersWalletList: WalletList = [
  {
    groupName: "Others",
    wallets: [
      coreWallet({ chains, projectId: WALLET_CONNECT_PROJECT_ID }),
      coinbaseWallet({ appName: APP_NAME, chains }),
      ledgerWallet({ chains, projectId: WALLET_CONNECT_PROJECT_ID }),
      rainbowWallet({ chains, projectId: WALLET_CONNECT_PROJECT_ID }),
      bitKeepWallet({ chains, projectId: WALLET_CONNECT_PROJECT_ID }),
      imTokenWallet({ chains, projectId: WALLET_CONNECT_PROJECT_ID }),
    ],
  },
];

const connectors = connectorsForWallets([...recommendedWalletList, ...othersWalletList]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const EthereumProviderChild = ({ children }) => {
  const { connect, connectors } = useConnect();
  const { connector } = useAccount();

  console.log("connectors", connectors, connector);

  // If the Safe connector is available, connect to it even if other connectors are available
  // (if another connector auto-connects (or user disconnects), we still override it with the Safe connector)
  useEffect(() => {
    const safeConnector = connectors?.find((connector) => connector.id === "safe" && connector.ready);
    if (!safeConnector || connector === safeConnector) return;
    connect({ connector: safeConnector });
  }, [connectors, connector, connect]);

  return <>{children}</>;
};

export default function WalletProvider({ children }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider theme={walletTheme} chains={chains} modalSize="compact">
        <EthereumProviderChild>{children}</EthereumProviderChild>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
