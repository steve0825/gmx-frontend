import { PositionTradeAction } from "domain/synthetics/tradeHistory";
import { BigNumber } from "ethers";
import { bigNumberify } from "lib/numbers";

const big = (hex: string) => bigNumberify(hex) as BigNumber;
const mapValues = <T, U>(obj: Record<string, T>, fn: (value: T) => U) => {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)])) as Record<string, U>;
};

const prepare = (action: any): PositionTradeAction => {
  const prepareHelper = (value: any) => {
    if (typeof value === "object" && value && value.type === "BigNumber") {
      return big(value.hex);
    }

    if (typeof value === "object" && value) {
      return mapValues(value, prepareHelper);
    } else {
      return value;
    }
  };
  return prepareHelper(action) as PositionTradeAction;
};

export const requestIncreasePosition = prepare({
  id: "0xde5c5f634b81dd10eb96a2cc1b08a9d15d09a35a8d07f8252498855b68b4f3df:19",
  eventName: "OrderCreated",
  account: "0xc9e1ce91d3f782499cfe787b6f1d2af0ca76c049",
  marketAddress: "0x339eF6aAcF8F4B2AD15BdcECBEED1842Ec4dBcBf",
  marketInfo: {
    marketTokenAddress: "0x339eF6aAcF8F4B2AD15BdcECBEED1842Ec4dBcBf",
    indexTokenAddress: "0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
    longTokenAddress: "0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
    shortTokenAddress: "0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
    isSameCollaterals: false,
    isSpotOnly: false,
    name: "BTC/USD [BTC-USDC]",
    data: "",
    isDisabled: false,
    longToken: {
      name: "Bitcoin",
      symbol: "BTC",
      decimals: 8,
      address: "0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png?1548822744",
      coingeckoUrl: "https://www.coingecko.com/en/coins/bitcoin",
      explorerUrl: "https://goerli.arbiscan.io/address/0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x0516af396904d1b6510b3ce0000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x0516af396904d1b6510b3ce0000000",
        },
      },
      balance: {
        type: "BigNumber",
        hex: "0x04b571c0",
      },
    },
    shortToken: {
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: "0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
      isStable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
      coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
      explorerUrl: "https://goerli.arbiscan.io/address/0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x0c9f2c9cd04674edea40000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x0c9f456d8f88b0f1c31e000000",
        },
      },
      balance: {
        type: "BigNumber",
        hex: "0x03312adc93",
      },
    },
    indexToken: {
      name: "Bitcoin",
      symbol: "BTC",
      decimals: 8,
      address: "0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png?1548822744",
      coingeckoUrl: "https://www.coingecko.com/en/coins/bitcoin",
      explorerUrl: "https://goerli.arbiscan.io/address/0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x0516af396904d1b6510b3ce0000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x0516af396904d1b6510b3ce0000000",
        },
      },
      balance: {
        type: "BigNumber",
        hex: "0x04b571c0",
      },
    },
    longInterestUsd: {
      type: "BigNumber",
      hex: "0x8d151dda39e2f3d6ca7318000000",
    },
    shortInterestUsd: {
      type: "BigNumber",
      hex: "0xdbe32f323e0c4c6831d2dc900000",
    },
    longInterestInTokens: {
      type: "BigNumber",
      hex: "0xa3ea16",
    },
    shortInterestInTokens: {
      type: "BigNumber",
      hex: "0x0107657e",
    },
    longPoolAmount: {
      type: "BigNumber",
      hex: "0x02b24068",
    },
    shortPoolAmount: {
      type: "BigNumber",
      hex: "0x06102f5c1c",
    },
    maxLongPoolAmount: {
      type: "BigNumber",
      hex: "0x033b2e3c9fd0803ce8000000",
    },
    maxShortPoolAmount: {
      type: "BigNumber",
      hex: "0x033b2e3c9fd0803ce8000000",
    },
    longPoolAmountAdjustment: {
      type: "BigNumber",
      hex: "0x00",
    },
    shortPoolAmountAdjustment: {
      type: "BigNumber",
      hex: "0x00",
    },
    poolValueMin: {
      type: "BigNumber",
      hex: "0x0756183d9182a41c17e70e0d050c2e",
    },
    poolValueMax: {
      type: "BigNumber",
      hex: "0x07562219e455012cdbbe016d250c2e",
    },
    reserveFactorLong: {
      type: "BigNumber",
      hex: "0x0b5c0e8d21d902d61fa0000000",
    },
    reserveFactorShort: {
      type: "BigNumber",
      hex: "0x0b5c0e8d21d902d61fa0000000",
    },
    openInterestReserveFactorLong: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    openInterestReserveFactorShort: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    totalBorrowingFees: {
      type: "BigNumber",
      hex: "0x2adc767eea32cd45c3bd39ca32",
    },
    positionImpactPoolAmount: {
      type: "BigNumber",
      hex: "0x0197ea",
    },
    swapImpactPoolAmountLong: {
      type: "BigNumber",
      hex: "0x49",
    },
    swapImpactPoolAmountShort: {
      type: "BigNumber",
      hex: "0x04b76bc737",
    },
    borrowingFactorLong: {
      type: "BigNumber",
      hex: "0x0152d02c7e14af680000",
    },
    borrowingFactorShort: {
      type: "BigNumber",
      hex: "0x0152d02c7e14af680000",
    },
    borrowingExponentFactorLong: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    borrowingExponentFactorShort: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    fundingFactor: {
      type: "BigNumber",
      hex: "0x043c33c1937564800000",
    },
    fundingExponentFactor: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    pnlLongMax: {
      type: "BigNumber",
      hex: "-0x0124f0436c81ae646eba34c00000",
    },
    pnlLongMin: {
      type: "BigNumber",
      hex: "-0x0124f0436c81ae646eba34c00000",
    },
    pnlShortMax: {
      type: "BigNumber",
      hex: "-0x04fb36ab0d2e7114ad5bc1b00000",
    },
    pnlShortMin: {
      type: "BigNumber",
      hex: "-0x04fb36ab0d2e7114ad5bc1b00000",
    },
    netPnlMax: {
      type: "BigNumber",
      hex: "-0x062026ee79b01f791c15f6700000",
    },
    netPnlMin: {
      type: "BigNumber",
      hex: "-0x062026ee79b01f791c15f6700000",
    },
    maxPnlFactorForTradersLong: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    maxPnlFactorForTradersShort: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    minCollateralFactor: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    minCollateralFactorForOpenInterestLong: {
      type: "BigNumber",
      hex: "0x00",
    },
    minCollateralFactorForOpenInterestShort: {
      type: "BigNumber",
      hex: "0x00",
    },
    claimableFundingAmountLong: {
      type: "BigNumber",
      hex: "0x00",
    },
    claimableFundingAmountShort: {
      type: "BigNumber",
      hex: "0x0bbc20",
    },
    positionFeeFactorForPositiveImpact: {
      type: "BigNumber",
      hex: "0x019d971e4fe8401e74000000",
    },
    positionFeeFactorForNegativeImpact: {
      type: "BigNumber",
      hex: "0x024306c4097859c43c000000",
    },
    positionImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x0a968163f0a57b400000",
    },
    positionImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x152d02c7e14af6800000",
    },
    maxPositionImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    maxPositionImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    maxPositionImpactFactorForLiquidations: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    positionImpactExponentFactor: {
      type: "BigNumber",
      hex: "0x193e5939a08ce9dbd480000000",
    },
    swapFeeFactorForPositiveImpact: {
      type: "BigNumber",
      hex: "0x019d971e4fe8401e74000000",
    },
    swapFeeFactorForNegativeImpact: {
      type: "BigNumber",
      hex: "0x024306c4097859c43c000000",
    },
    swapImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x0422ca8b0a00a425000000",
    },
    swapImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x084595161401484a000000",
    },
    swapImpactExponentFactor: {
      type: "BigNumber",
      hex: "0x193e5939a08ce9dbd480000000",
    },
    borrowingFactorPerSecondForLongs: {
      type: "BigNumber",
      hex: "0x00",
    },
    borrowingFactorPerSecondForShorts: {
      type: "BigNumber",
      hex: "0x3a06759dd7f012b91a",
    },
    fundingFactorPerSecond: {
      type: "BigNumber",
      hex: "0xecb26eec42fc7658e0",
    },
    longsPayShorts: false,
    virtualPoolAmountForLongToken: {
      type: "BigNumber",
      hex: "0x02b24068",
    },
    virtualPoolAmountForShortToken: {
      type: "BigNumber",
      hex: "0x06102f5c1c",
    },
    virtualInventoryForPositions: {
      type: "BigNumber",
      hex: "-0x3885f95a824cd6d349eb2ab00000",
    },
    virtualMarketId: "0x11111137e2e8ae1c70c421e7a0dd36e023e0d6217198f889f9eb9c2a6727481f",
    virtualLongTokenId: "0x04533137e2e8ae1c11111111a0dd36e023e0d6217198f889f9eb9c2a6727481d",
    virtualShortTokenId: "0x0000000000000000000000000000000000000000000000000000000000000000",
  },
  indexToken: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 8,
    address: "0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
    isShortable: true,
    imageUrl: "https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png?1548822744",
    coingeckoUrl: "https://www.coingecko.com/en/coins/bitcoin",
    explorerUrl: "https://goerli.arbiscan.io/address/0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0516af396904d1b6510b3ce0000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0516af396904d1b6510b3ce0000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x04b571c0",
    },
  },
  swapPath: ["0x339eF6aAcF8F4B2AD15BdcECBEED1842Ec4dBcBf"],
  initialCollateralTokenAddress: "0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
  initialCollateralToken: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 8,
    address: "0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
    isShortable: true,
    imageUrl: "https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png?1548822744",
    coingeckoUrl: "https://www.coingecko.com/en/coins/bitcoin",
    explorerUrl: "https://goerli.arbiscan.io/address/0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0516af396904d1b6510b3ce0000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0516af396904d1b6510b3ce0000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x04b571c0",
    },
  },
  targetCollateralToken: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
    isStable: true,
    imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
    explorerUrl: "https://goerli.arbiscan.io/address/0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0c9f456d8f88b0f1c31e000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x03312adc93",
    },
  },
  initialCollateralDeltaAmount: {
    type: "BigNumber",
    hex: "0x0f4240",
  },
  sizeDeltaUsd: {
    type: "BigNumber",
    hex: "0xb82beb3e1d7ddda8e3d6f3400000",
  },
  triggerPrice: {
    type: "BigNumber",
    hex: "0x00",
  },
  acceptablePrice: {
    type: "BigNumber",
    hex: "0x04f8c47b7d14785de1d2f9796d9d00",
  },
  minOutputAmount: {
    type: "BigNumber",
    hex: "0x00",
  },
  orderType: 2,
  orderKey: "0xf8e636c761363279c51f48a5d584964c4b1ce1a4003c8baa03f0dacef7e1f651",
  isLong: true,
  reason: null,
  transaction: {
    timestamp: 1694168065,
    hash: "0xde5c5f634b81dd10eb96a2cc1b08a9d15d09a35a8d07f8252498855b68b4f3df",
    __typename: "Transaction",
  },
});

export const withdraw1Usd = prepare({
  id: "0x99776b15021a80a63b477ae7ebbdeabc472354c415a49b89137d8a27bbc48bb5:2",
  eventName: "OrderCreated",
  account: "0xc9e1ce91d3f782499cfe787b6f1d2af0ca76c049",
  marketAddress: "0x339eF6aAcF8F4B2AD15BdcECBEED1842Ec4dBcBf",
  marketInfo: {
    marketTokenAddress: "0x339eF6aAcF8F4B2AD15BdcECBEED1842Ec4dBcBf",
    indexTokenAddress: "0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
    longTokenAddress: "0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
    shortTokenAddress: "0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
    isSameCollaterals: false,
    isSpotOnly: false,
    name: "BTC/USD [BTC-USDC]",
    data: "",
    isDisabled: false,
    longToken: {
      name: "Bitcoin",
      symbol: "BTC",
      decimals: 8,
      address: "0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png?1548822744",
      coingeckoUrl: "https://www.coingecko.com/en/coins/bitcoin",
      explorerUrl: "https://goerli.arbiscan.io/address/0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x0515d0732f350f4127a40990000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x0515d0732f350f4127a40990000000",
        },
      },
      balance: {
        type: "BigNumber",
        hex: "0x04b571c0",
      },
    },
    shortToken: {
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: "0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
      isStable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
      coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
      explorerUrl: "https://goerli.arbiscan.io/address/0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x0c9f2c9cd04674edea40000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x0c9f456d8f88b0f1c31e000000",
        },
      },
      balance: {
        type: "BigNumber",
        hex: "0x03312adc93",
      },
    },
    indexToken: {
      name: "Bitcoin",
      symbol: "BTC",
      decimals: 8,
      address: "0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png?1548822744",
      coingeckoUrl: "https://www.coingecko.com/en/coins/bitcoin",
      explorerUrl: "https://goerli.arbiscan.io/address/0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x0515d0732f350f4127a40990000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x0515d0732f350f4127a40990000000",
        },
      },
      balance: {
        type: "BigNumber",
        hex: "0x04b571c0",
      },
    },
    longInterestUsd: {
      type: "BigNumber",
      hex: "0x8d151dda39e2f3d6ca7318000000",
    },
    shortInterestUsd: {
      type: "BigNumber",
      hex: "0xdbe32f323e0c4c6831d2dc900000",
    },
    longInterestInTokens: {
      type: "BigNumber",
      hex: "0xa3ea16",
    },
    shortInterestInTokens: {
      type: "BigNumber",
      hex: "0x0107657e",
    },
    longPoolAmount: {
      type: "BigNumber",
      hex: "0x02b24068",
    },
    shortPoolAmount: {
      type: "BigNumber",
      hex: "0x06102f5c1c",
    },
    maxLongPoolAmount: {
      type: "BigNumber",
      hex: "0x033b2e3c9fd0803ce8000000",
    },
    maxShortPoolAmount: {
      type: "BigNumber",
      hex: "0x033b2e3c9fd0803ce8000000",
    },
    longPoolAmountAdjustment: {
      type: "BigNumber",
      hex: "0x00",
    },
    shortPoolAmountAdjustment: {
      type: "BigNumber",
      hex: "0x00",
    },
    poolValueMin: {
      type: "BigNumber",
      hex: "0x0755a5289305f59bb14033003391fe",
    },
    poolValueMax: {
      type: "BigNumber",
      hex: "0x0755af04e5d852ac751726605391fe",
    },
    reserveFactorLong: {
      type: "BigNumber",
      hex: "0x0b5c0e8d21d902d61fa0000000",
    },
    reserveFactorShort: {
      type: "BigNumber",
      hex: "0x0b5c0e8d21d902d61fa0000000",
    },
    openInterestReserveFactorLong: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    openInterestReserveFactorShort: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    totalBorrowingFees: {
      type: "BigNumber",
      hex: "0x2ad61f91d4709979147d61187f",
    },
    positionImpactPoolAmount: {
      type: "BigNumber",
      hex: "0x0197ea",
    },
    swapImpactPoolAmountLong: {
      type: "BigNumber",
      hex: "0x49",
    },
    swapImpactPoolAmountShort: {
      type: "BigNumber",
      hex: "0x04b76bc737",
    },
    borrowingFactorLong: {
      type: "BigNumber",
      hex: "0x0152d02c7e14af680000",
    },
    borrowingFactorShort: {
      type: "BigNumber",
      hex: "0x0152d02c7e14af680000",
    },
    borrowingExponentFactorLong: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    borrowingExponentFactorShort: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    fundingFactor: {
      type: "BigNumber",
      hex: "0x043c33c1937564800000",
    },
    fundingExponentFactor: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    pnlLongMax: {
      type: "BigNumber",
      hex: "-0x013cde9e2ecc08d9367d19a00000",
    },
    pnlLongMin: {
      type: "BigNumber",
      hex: "-0x013cde9e2ecc08d9367d19a00000",
    },
    pnlShortMax: {
      type: "BigNumber",
      hex: "-0x04d4c2239c3e66717d1484500000",
    },
    pnlShortMin: {
      type: "BigNumber",
      hex: "-0x04d4c2239c3e66717d1484500000",
    },
    netPnlMax: {
      type: "BigNumber",
      hex: "-0x0611a0c1cb0a6f4ab3919df00000",
    },
    netPnlMin: {
      type: "BigNumber",
      hex: "-0x0611a0c1cb0a6f4ab3919df00000",
    },
    maxPnlFactorForTradersLong: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    maxPnlFactorForTradersShort: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    minCollateralFactor: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    minCollateralFactorForOpenInterestLong: {
      type: "BigNumber",
      hex: "0x00",
    },
    minCollateralFactorForOpenInterestShort: {
      type: "BigNumber",
      hex: "0x00",
    },
    claimableFundingAmountLong: {
      type: "BigNumber",
      hex: "0x00",
    },
    claimableFundingAmountShort: {
      type: "BigNumber",
      hex: "0x0bbc20",
    },
    positionFeeFactorForPositiveImpact: {
      type: "BigNumber",
      hex: "0x019d971e4fe8401e74000000",
    },
    positionFeeFactorForNegativeImpact: {
      type: "BigNumber",
      hex: "0x024306c4097859c43c000000",
    },
    positionImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x0a968163f0a57b400000",
    },
    positionImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x152d02c7e14af6800000",
    },
    maxPositionImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    maxPositionImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    maxPositionImpactFactorForLiquidations: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    positionImpactExponentFactor: {
      type: "BigNumber",
      hex: "0x193e5939a08ce9dbd480000000",
    },
    swapFeeFactorForPositiveImpact: {
      type: "BigNumber",
      hex: "0x019d971e4fe8401e74000000",
    },
    swapFeeFactorForNegativeImpact: {
      type: "BigNumber",
      hex: "0x024306c4097859c43c000000",
    },
    swapImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x0422ca8b0a00a425000000",
    },
    swapImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x084595161401484a000000",
    },
    swapImpactExponentFactor: {
      type: "BigNumber",
      hex: "0x193e5939a08ce9dbd480000000",
    },
    borrowingFactorPerSecondForLongs: {
      type: "BigNumber",
      hex: "0x00",
    },
    borrowingFactorPerSecondForShorts: {
      type: "BigNumber",
      hex: "0x3a06759dd7f012b91a",
    },
    fundingFactorPerSecond: {
      type: "BigNumber",
      hex: "0xecb26eec42fc7658e0",
    },
    longsPayShorts: false,
    virtualPoolAmountForLongToken: {
      type: "BigNumber",
      hex: "0x02b24068",
    },
    virtualPoolAmountForShortToken: {
      type: "BigNumber",
      hex: "0x06102f5c1c",
    },
    virtualInventoryForPositions: {
      type: "BigNumber",
      hex: "-0x3885f95a824cd6d349eb2ab00000",
    },
    virtualMarketId: "0x11111137e2e8ae1c70c421e7a0dd36e023e0d6217198f889f9eb9c2a6727481f",
    virtualLongTokenId: "0x04533137e2e8ae1c11111111a0dd36e023e0d6217198f889f9eb9c2a6727481d",
    virtualShortTokenId: "0x0000000000000000000000000000000000000000000000000000000000000000",
  },
  indexToken: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 8,
    address: "0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
    isShortable: true,
    imageUrl: "https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png?1548822744",
    coingeckoUrl: "https://www.coingecko.com/en/coins/bitcoin",
    explorerUrl: "https://goerli.arbiscan.io/address/0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0515d0732f350f4127a40990000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0515d0732f350f4127a40990000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x04b571c0",
    },
  },
  swapPath: [],
  initialCollateralTokenAddress: "0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
  initialCollateralToken: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
    isStable: true,
    imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
    explorerUrl: "https://goerli.arbiscan.io/address/0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0c9f456d8f88b0f1c31e000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x03312adc93",
    },
  },
  targetCollateralToken: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
    isStable: true,
    imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
    explorerUrl: "https://goerli.arbiscan.io/address/0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0c9f456d8f88b0f1c31e000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x03312adc93",
    },
  },
  initialCollateralDeltaAmount: {
    type: "BigNumber",
    hex: "0x0f4240",
  },
  sizeDeltaUsd: {
    type: "BigNumber",
    hex: "0x00",
  },
  triggerPrice: {
    type: "BigNumber",
    hex: "0x00",
  },
  acceptablePrice: {
    type: "BigNumber",
    hex: "0x05053c5e0696d43545b589da000000",
  },
  minOutputAmount: {
    type: "BigNumber",
    hex: "0x0c957b121a67036d3388000000",
  },
  orderType: 4,
  orderKey: "0x0e3ec97a0bcaf2ac18f02d24804e7ee90bead927c9cf5ab9f86fe1f73d4396fb",
  isLong: false,
  reason: null,
  transaction: {
    timestamp: 1694590697,
    hash: "0x99776b15021a80a63b477ae7ebbdeabc472354c415a49b89137d8a27bbc48bb5",
    __typename: "Transaction",
  },
});

export const createOrderDecreaseLong = prepare({
  id: "0x72899a3e8e11ebdcbd98fa5d97ff7d59770a0d891142b494e92a71ca67575955:2",
  eventName: "OrderCreated",
  account: "0xc9e1ce91d3f782499cfe787b6f1d2af0ca76c049",
  marketAddress: "0x339eF6aAcF8F4B2AD15BdcECBEED1842Ec4dBcBf",
  marketInfo: {
    marketTokenAddress: "0x339eF6aAcF8F4B2AD15BdcECBEED1842Ec4dBcBf",
    indexTokenAddress: "0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
    longTokenAddress: "0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
    shortTokenAddress: "0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
    isSameCollaterals: false,
    isSpotOnly: false,
    name: "BTC/USD [BTC-USDC]",
    data: "",
    isDisabled: false,
    longToken: {
      name: "Bitcoin",
      symbol: "BTC",
      decimals: 8,
      address: "0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png?1548822744",
      coingeckoUrl: "https://www.coingecko.com/en/coins/bitcoin",
      explorerUrl: "https://goerli.arbiscan.io/address/0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x0516893b936002a4cd3f1d10000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x0516893b936002a4cd3f1d10000000",
        },
      },
      balance: {
        type: "BigNumber",
        hex: "0x04b571c0",
      },
    },
    shortToken: {
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: "0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
      isStable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
      coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
      explorerUrl: "https://goerli.arbiscan.io/address/0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x0c9f2c9cd04674edea40000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x0c9f456d8f88b0f1c31e000000",
        },
      },
      balance: {
        type: "BigNumber",
        hex: "0x03312adc93",
      },
    },
    indexToken: {
      name: "Bitcoin",
      symbol: "BTC",
      decimals: 8,
      address: "0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png?1548822744",
      coingeckoUrl: "https://www.coingecko.com/en/coins/bitcoin",
      explorerUrl: "https://goerli.arbiscan.io/address/0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x0516893b936002a4cd3f1d10000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x0516893b936002a4cd3f1d10000000",
        },
      },
      balance: {
        type: "BigNumber",
        hex: "0x04b571c0",
      },
    },
    longInterestUsd: {
      type: "BigNumber",
      hex: "0x8d151dda39e2f3d6ca7318000000",
    },
    shortInterestUsd: {
      type: "BigNumber",
      hex: "0xdbe32f323e0c4c6831d2dc900000",
    },
    longInterestInTokens: {
      type: "BigNumber",
      hex: "0xa3ea16",
    },
    shortInterestInTokens: {
      type: "BigNumber",
      hex: "0x0107657e",
    },
    longPoolAmount: {
      type: "BigNumber",
      hex: "0x02b24068",
    },
    shortPoolAmount: {
      type: "BigNumber",
      hex: "0x06102f5c1c",
    },
    maxLongPoolAmount: {
      type: "BigNumber",
      hex: "0x033b2e3c9fd0803ce8000000",
    },
    maxShortPoolAmount: {
      type: "BigNumber",
      hex: "0x033b2e3c9fd0803ce8000000",
    },
    longPoolAmountAdjustment: {
      type: "BigNumber",
      hex: "0x00",
    },
    shortPoolAmountAdjustment: {
      type: "BigNumber",
      hex: "0x00",
    },
    poolValueMin: {
      type: "BigNumber",
      hex: "0x075604a051118873263d1c8933c137",
    },
    poolValueMax: {
      type: "BigNumber",
      hex: "0x07560e7ca3e3e583ea140fe953c137",
    },
    reserveFactorLong: {
      type: "BigNumber",
      hex: "0x0b5c0e8d21d902d61fa0000000",
    },
    reserveFactorShort: {
      type: "BigNumber",
      hex: "0x0b5c0e8d21d902d61fa0000000",
    },
    openInterestReserveFactorLong: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    openInterestReserveFactorShort: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    totalBorrowingFees: {
      type: "BigNumber",
      hex: "0x2ae01a651ad1a71f94202c9027",
    },
    positionImpactPoolAmount: {
      type: "BigNumber",
      hex: "0x0197ea",
    },
    swapImpactPoolAmountLong: {
      type: "BigNumber",
      hex: "0x49",
    },
    swapImpactPoolAmountShort: {
      type: "BigNumber",
      hex: "0x04b76bc737",
    },
    borrowingFactorLong: {
      type: "BigNumber",
      hex: "0x0152d02c7e14af680000",
    },
    borrowingFactorShort: {
      type: "BigNumber",
      hex: "0x0152d02c7e14af680000",
    },
    borrowingExponentFactorLong: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    borrowingExponentFactorShort: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    fundingFactor: {
      type: "BigNumber",
      hex: "0x043c33c1937564800000",
    },
    fundingExponentFactor: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    pnlLongMax: {
      type: "BigNumber",
      hex: "-0x0129050a86888f42898acca00000",
    },
    pnlLongMin: {
      type: "BigNumber",
      hex: "-0x0129050a86888f42898acca00000",
    },
    pnlShortMax: {
      type: "BigNumber",
      hex: "-0x04f4a7ccaa4afb166f9abd500000",
    },
    pnlShortMin: {
      type: "BigNumber",
      hex: "-0x04f4a7ccaa4afb166f9abd500000",
    },
    netPnlMax: {
      type: "BigNumber",
      hex: "-0x061dacd730d38a58f92589f00000",
    },
    netPnlMin: {
      type: "BigNumber",
      hex: "-0x061dacd730d38a58f92589f00000",
    },
    maxPnlFactorForTradersLong: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    maxPnlFactorForTradersShort: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    minCollateralFactor: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    minCollateralFactorForOpenInterestLong: {
      type: "BigNumber",
      hex: "0x00",
    },
    minCollateralFactorForOpenInterestShort: {
      type: "BigNumber",
      hex: "0x00",
    },
    claimableFundingAmountLong: {
      type: "BigNumber",
      hex: "0x00",
    },
    claimableFundingAmountShort: {
      type: "BigNumber",
      hex: "0x0bbc20",
    },
    positionFeeFactorForPositiveImpact: {
      type: "BigNumber",
      hex: "0x019d971e4fe8401e74000000",
    },
    positionFeeFactorForNegativeImpact: {
      type: "BigNumber",
      hex: "0x024306c4097859c43c000000",
    },
    positionImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x0a968163f0a57b400000",
    },
    positionImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x152d02c7e14af6800000",
    },
    maxPositionImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    maxPositionImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    maxPositionImpactFactorForLiquidations: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    positionImpactExponentFactor: {
      type: "BigNumber",
      hex: "0x193e5939a08ce9dbd480000000",
    },
    swapFeeFactorForPositiveImpact: {
      type: "BigNumber",
      hex: "0x019d971e4fe8401e74000000",
    },
    swapFeeFactorForNegativeImpact: {
      type: "BigNumber",
      hex: "0x024306c4097859c43c000000",
    },
    swapImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x0422ca8b0a00a425000000",
    },
    swapImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x084595161401484a000000",
    },
    swapImpactExponentFactor: {
      type: "BigNumber",
      hex: "0x193e5939a08ce9dbd480000000",
    },
    borrowingFactorPerSecondForLongs: {
      type: "BigNumber",
      hex: "0x00",
    },
    borrowingFactorPerSecondForShorts: {
      type: "BigNumber",
      hex: "0x3a06759dd7f012b91a",
    },
    fundingFactorPerSecond: {
      type: "BigNumber",
      hex: "0xecb26eec42fc7658e0",
    },
    longsPayShorts: false,
    virtualPoolAmountForLongToken: {
      type: "BigNumber",
      hex: "0x02b24068",
    },
    virtualPoolAmountForShortToken: {
      type: "BigNumber",
      hex: "0x06102f5c1c",
    },
    virtualInventoryForPositions: {
      type: "BigNumber",
      hex: "-0x3885f95a824cd6d349eb2ab00000",
    },
    virtualMarketId: "0x11111137e2e8ae1c70c421e7a0dd36e023e0d6217198f889f9eb9c2a6727481f",
    virtualLongTokenId: "0x04533137e2e8ae1c11111111a0dd36e023e0d6217198f889f9eb9c2a6727481d",
    virtualShortTokenId: "0x0000000000000000000000000000000000000000000000000000000000000000",
  },
  indexToken: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 8,
    address: "0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
    isShortable: true,
    imageUrl: "https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png?1548822744",
    coingeckoUrl: "https://www.coingecko.com/en/coins/bitcoin",
    explorerUrl: "https://goerli.arbiscan.io/address/0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0516893b936002a4cd3f1d10000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0516893b936002a4cd3f1d10000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x04b571c0",
    },
  },
  swapPath: [],
  initialCollateralTokenAddress: "0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
  initialCollateralToken: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
    isStable: true,
    imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
    explorerUrl: "https://goerli.arbiscan.io/address/0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0c9f456d8f88b0f1c31e000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x03312adc93",
    },
  },
  targetCollateralToken: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
    isStable: true,
    imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
    explorerUrl: "https://goerli.arbiscan.io/address/0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0c9f456d8f88b0f1c31e000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x03312adc93",
    },
  },
  initialCollateralDeltaAmount: {
    type: "BigNumber",
    hex: "0x019632cc",
  },
  sizeDeltaUsd: {
    type: "BigNumber",
    hex: "0x0d204b867ae0cad26c1ef0000000",
  },
  triggerPrice: {
    type: "BigNumber",
    hex: "0x05c71d3c089740a6a8ab2c00000000",
  },
  acceptablePrice: {
    type: "BigNumber",
    hex: "0x05b852b3c0d32e15a1dca900000000",
  },
  minOutputAmount: {
    type: "BigNumber",
    hex: "0x00",
  },
  orderType: 5,
  orderKey: "0x2cb19912edeb90ae392a715ca4770a8510e7bc05418a3d16c4cbda3fb4438acf",
  isLong: true,
  reason: null,
  transaction: {
    timestamp: 1694770176,
    hash: "0x72899a3e8e11ebdcbd98fa5d97ff7d59770a0d891142b494e92a71ca67575955",
    __typename: "Transaction",
  },
});

export const cancelOrderIncreaseLong = prepare({
  id: "0xe9444461179ef70b01b080c5fb6e044c3acb01696a1cf7f2e6445363a453aba4:1",
  eventName: "OrderCancelled",
  account: "0x9a68746711b1314edbbdbcc8f1e1887276bd361e",
  marketAddress: "0x1529876A9348D61C6c4a3EEe1fe6CbF1117Ca315",
  marketInfo: {
    marketTokenAddress: "0x1529876A9348D61C6c4a3EEe1fe6CbF1117Ca315",
    indexTokenAddress: "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3",
    longTokenAddress: "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3",
    shortTokenAddress: "0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
    isSameCollaterals: false,
    isSpotOnly: false,
    name: "ETH/USD [WETH-USDC]",
    data: "",
    isDisabled: false,
    longToken: {
      name: "Wrapped Ethereum",
      symbol: "WETH",
      decimals: 18,
      address: "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3",
      isWrapped: true,
      baseSymbol: "ETH",
      imageUrl: "https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1628852295",
      coingeckoUrl: "https://www.coingecko.com/en/coins/ethereum",
      explorerUrl: "https://goerli.arbiscan.io/address/0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x4fffe06fdbae5caf74e5d8000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x4fffe06fdbae5caf74e5d8000000",
        },
      },
    },
    shortToken: {
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: "0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
      isStable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
      coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
      explorerUrl: "https://goerli.arbiscan.io/address/0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x0c9f2c9cd04674edea40000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x0c9f456d8f88b0f1c31e000000",
        },
      },
    },
    indexToken: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
      address: "0x0000000000000000000000000000000000000000",
      isNative: true,
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
      wrappedAddress: "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x4fffe06fdbae5caf74e5d8000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x4fffe06fdbae5caf74e5d8000000",
        },
      },
    },
    longInterestUsd: {
      type: "BigNumber",
      hex: "0x01af50ec949321a889571b153c0000",
    },
    shortInterestUsd: {
      type: "BigNumber",
      hex: "0x77a266f7371cc95bf30190200000",
    },
    longInterestInTokens: {
      type: "BigNumber",
      hex: "0x44cf820531daea33",
    },
    shortInterestInTokens: {
      type: "BigNumber",
      hex: "0x13a39f8e7b584ed3",
    },
    longPoolAmount: {
      type: "BigNumber",
      hex: "0xcdf8585f19fbef21",
    },
    shortPoolAmount: {
      type: "BigNumber",
      hex: "0xa92af2a9",
    },
    maxLongPoolAmount: {
      type: "BigNumber",
      hex: "0x033b2e3c9fd0803ce8000000",
    },
    maxShortPoolAmount: {
      type: "BigNumber",
      hex: "0x033b2e3c9fd0803ce8000000",
    },
    longPoolAmountAdjustment: {
      type: "BigNumber",
      hex: "0x00",
    },
    shortPoolAmountAdjustment: {
      type: "BigNumber",
      hex: "0x00",
    },
    poolValueMin: {
      type: "BigNumber",
      hex: "0x054c4c094100f0e6f4710d1d4be8fd",
    },
    poolValueMax: {
      type: "BigNumber",
      hex: "0x054c4d1c5f3bf1b60002522bc3e8fd",
    },
    reserveFactorLong: {
      type: "BigNumber",
      hex: "0x0b5c0e8d21d902d61fa0000000",
    },
    reserveFactorShort: {
      type: "BigNumber",
      hex: "0x0b5c0e8d21d902d61fa0000000",
    },
    openInterestReserveFactorLong: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    openInterestReserveFactorShort: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    totalBorrowingFees: {
      type: "BigNumber",
      hex: "0x02a1527b2029038ab8110a2a1b9b",
    },
    positionImpactPoolAmount: {
      type: "BigNumber",
      hex: "0x25cf2e00e8141c",
    },
    swapImpactPoolAmountLong: {
      type: "BigNumber",
      hex: "0xa7dac58934ecfca5",
    },
    swapImpactPoolAmountShort: {
      type: "BigNumber",
      hex: "0x08f62c",
    },
    borrowingFactorLong: {
      type: "BigNumber",
      hex: "0x0152d02c7e14af680000",
    },
    borrowingFactorShort: {
      type: "BigNumber",
      hex: "0x0152d02c7e14af680000",
    },
    borrowingExponentFactorLong: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    borrowingExponentFactorShort: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    fundingFactor: {
      type: "BigNumber",
      hex: "0x043c33c1937564800000",
    },
    fundingExponentFactor: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    pnlLongMax: {
      type: "BigNumber",
      hex: "-0x22a70bd0cc2ed790633ce7fcae00",
    },
    pnlLongMin: {
      type: "BigNumber",
      hex: "-0x22a70bd0cc2ed790633ce7fcae00",
    },
    pnlShortMax: {
      type: "BigNumber",
      hex: "0x066c4d4124589682210623a8ee00",
    },
    pnlShortMin: {
      type: "BigNumber",
      hex: "0x066c4d4124589682210623a8ee00",
    },
    netPnlMax: {
      type: "BigNumber",
      hex: "-0x1c3abe8fa7d6410e4236c453c000",
    },
    netPnlMin: {
      type: "BigNumber",
      hex: "-0x1c3abe8fa7d6410e4236c453c000",
    },
    maxPnlFactorForTradersLong: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    maxPnlFactorForTradersShort: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    minCollateralFactor: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    minCollateralFactorForOpenInterestLong: {
      type: "BigNumber",
      hex: "0x00",
    },
    minCollateralFactorForOpenInterestShort: {
      type: "BigNumber",
      hex: "0x00",
    },
    claimableFundingAmountLong: {
      type: "BigNumber",
      hex: "0x00",
    },
    claimableFundingAmountShort: {
      type: "BigNumber",
      hex: "0x00",
    },
    positionFeeFactorForPositiveImpact: {
      type: "BigNumber",
      hex: "0x019d971e4fe8401e74000000",
    },
    positionFeeFactorForNegativeImpact: {
      type: "BigNumber",
      hex: "0x024306c4097859c43c000000",
    },
    positionImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x0a968163f0a57b400000",
    },
    positionImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x152d02c7e14af6800000",
    },
    maxPositionImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    maxPositionImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    maxPositionImpactFactorForLiquidations: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    positionImpactExponentFactor: {
      type: "BigNumber",
      hex: "0x193e5939a08ce9dbd480000000",
    },
    swapFeeFactorForPositiveImpact: {
      type: "BigNumber",
      hex: "0x019d971e4fe8401e74000000",
    },
    swapFeeFactorForNegativeImpact: {
      type: "BigNumber",
      hex: "0x024306c4097859c43c000000",
    },
    swapImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x0422ca8b0a00a425000000",
    },
    swapImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x084595161401484a000000",
    },
    swapImpactExponentFactor: {
      type: "BigNumber",
      hex: "0x193e5939a08ce9dbd480000000",
    },
    borrowingFactorPerSecondForLongs: {
      type: "BigNumber",
      hex: "0x7130db903ec145a31e",
    },
    borrowingFactorPerSecondForShorts: {
      type: "BigNumber",
      hex: "0x00",
    },
    fundingFactorPerSecond: {
      type: "BigNumber",
      hex: "0x026559d766a55b1c18d8",
    },
    longsPayShorts: true,
    virtualPoolAmountForLongToken: {
      type: "BigNumber",
      hex: "0xdbb0e89f08c9cc6e",
    },
    virtualPoolAmountForShortToken: {
      type: "BigNumber",
      hex: "0x011f58e15d00a69966",
    },
    virtualInventoryForPositions: {
      type: "BigNumber",
      hex: "0x00",
    },
    virtualMarketId: "0x04533437e2e8ae1c70c421e7a0dd36e023e0d6217198f889f9eb9c2a6727481d",
    virtualLongTokenId: "0x0000000000000000000000000000000000000000000000000000000000000000",
    virtualShortTokenId: "0x0000000000000000000000000000000000000000000000000000000000000000",
  },
  indexToken: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    address: "0x0000000000000000000000000000000000000000",
    isNative: true,
    isShortable: true,
    imageUrl: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
    wrappedAddress: "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x4fffe06fdbae5caf74e5d8000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x4fffe06fdbae5caf74e5d8000000",
      },
    },
  },
  swapPath: ["0x1529876A9348D61C6c4a3EEe1fe6CbF1117Ca315"],
  initialCollateralTokenAddress: "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3",
  initialCollateralToken: {
    name: "Wrapped Ethereum",
    symbol: "WETH",
    decimals: 18,
    address: "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3",
    isWrapped: true,
    baseSymbol: "ETH",
    imageUrl: "https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1628852295",
    coingeckoUrl: "https://www.coingecko.com/en/coins/ethereum",
    explorerUrl: "https://goerli.arbiscan.io/address/0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x4fffe06fdbae5caf74e5d8000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x4fffe06fdbae5caf74e5d8000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x00",
    },
  },
  targetCollateralToken: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
    isStable: true,
    imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
    explorerUrl: "https://goerli.arbiscan.io/address/0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0c9f456d8f88b0f1c31e000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x03312adc93",
    },
  },
  initialCollateralDeltaAmount: {
    type: "BigNumber",
    hex: "0x2386f26fc10000",
  },
  sizeDeltaUsd: {
    type: "BigNumber",
    hex: "0x33ef189b49394e91a0c5600000",
  },
  triggerPrice: {
    type: "BigNumber",
    hex: "0x5055eb5a180a0bd64ac3c0000000",
  },
  acceptablePrice: {
    type: "BigNumber",
    hex: "0x5123941afeadfc986f5a30000000",
  },
  minOutputAmount: {
    type: "BigNumber",
    hex: "0x00",
  },
  orderType: 3,
  orderKey: "0x17dc6ec45b31e95185dbe2bf5dccf21eb4c05f731fd2b0d48947f8173959132f",
  isLong: true,
  reason: "USER_INITIATED_CANCEL",
  transaction: {
    timestamp: 1694770633,
    hash: "0xe9444461179ef70b01b080c5fb6e044c3acb01696a1cf7f2e6445363a453aba4",
    __typename: "Transaction",
  },
});

export const createOrderIncreaseLong = prepare({
  id: "0x1290b5858dc8efa0e2eec75a241fa95bdb5f9a58950a57bf540f269edff18751:2",
  eventName: "OrderCreated",
  account: "0x0a6ad098f65c048d1aa263d38ea174e781ae6899",
  marketAddress: "0x339eF6aAcF8F4B2AD15BdcECBEED1842Ec4dBcBf",
  marketInfo: {
    marketTokenAddress: "0x339eF6aAcF8F4B2AD15BdcECBEED1842Ec4dBcBf",
    indexTokenAddress: "0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
    longTokenAddress: "0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
    shortTokenAddress: "0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
    isSameCollaterals: false,
    isSpotOnly: false,
    name: "BTC/USD [BTC-USDC]",
    data: "",
    isDisabled: false,
    longToken: {
      name: "Bitcoin",
      symbol: "BTC",
      decimals: 8,
      address: "0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png?1548822744",
      coingeckoUrl: "https://www.coingecko.com/en/coins/bitcoin",
      explorerUrl: "https://goerli.arbiscan.io/address/0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x050eb9f19258bd72da095f10000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x050eb9f19258bd72da095f10000000",
        },
      },
      balance: {
        type: "BigNumber",
        hex: "0x04b571c0",
      },
    },
    shortToken: {
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: "0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
      isStable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
      coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
      explorerUrl: "https://goerli.arbiscan.io/address/0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x0c9f2c9cd04674edea40000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x0c9f456d8f88b0f1c31e000000",
        },
      },
      balance: {
        type: "BigNumber",
        hex: "0x03312adc93",
      },
    },
    indexToken: {
      name: "Bitcoin",
      symbol: "BTC",
      decimals: 8,
      address: "0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png?1548822744",
      coingeckoUrl: "https://www.coingecko.com/en/coins/bitcoin",
      explorerUrl: "https://goerli.arbiscan.io/address/0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x050eb9f19258bd72da095f10000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x050eb9f19258bd72da095f10000000",
        },
      },
      balance: {
        type: "BigNumber",
        hex: "0x04b571c0",
      },
    },
    longInterestUsd: {
      type: "BigNumber",
      hex: "0x8d151dda39e2f3d6ca7318000000",
    },
    shortInterestUsd: {
      type: "BigNumber",
      hex: "0xdbe32f323e0c4c6831d2dc900000",
    },
    longInterestInTokens: {
      type: "BigNumber",
      hex: "0xa3ea16",
    },
    shortInterestInTokens: {
      type: "BigNumber",
      hex: "0x0107657e",
    },
    longPoolAmount: {
      type: "BigNumber",
      hex: "0x02b24068",
    },
    shortPoolAmount: {
      type: "BigNumber",
      hex: "0x06102f5c1c",
    },
    maxLongPoolAmount: {
      type: "BigNumber",
      hex: "0x033b2e3c9fd0803ce8000000",
    },
    maxShortPoolAmount: {
      type: "BigNumber",
      hex: "0x033b2e3c9fd0803ce8000000",
    },
    longPoolAmountAdjustment: {
      type: "BigNumber",
      hex: "0x00",
    },
    shortPoolAmountAdjustment: {
      type: "BigNumber",
      hex: "0x00",
    },
    poolValueMin: {
      type: "BigNumber",
      hex: "0x0751fc2e8a47ee2e70f4be2b1035da",
    },
    poolValueMax: {
      type: "BigNumber",
      hex: "0x0752060add1a4b3f34cbb18b3035da",
    },
    reserveFactorLong: {
      type: "BigNumber",
      hex: "0x0b5c0e8d21d902d61fa0000000",
    },
    reserveFactorShort: {
      type: "BigNumber",
      hex: "0x0b5c0e8d21d902d61fa0000000",
    },
    openInterestReserveFactorLong: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    openInterestReserveFactorShort: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    totalBorrowingFees: {
      type: "BigNumber",
      hex: "0x2b394ddfa1af6530444f10967f",
    },
    positionImpactPoolAmount: {
      type: "BigNumber",
      hex: "0x0197ea",
    },
    swapImpactPoolAmountLong: {
      type: "BigNumber",
      hex: "0x49",
    },
    swapImpactPoolAmountShort: {
      type: "BigNumber",
      hex: "0x04b76bc737",
    },
    borrowingFactorLong: {
      type: "BigNumber",
      hex: "0x0152d02c7e14af680000",
    },
    borrowingFactorShort: {
      type: "BigNumber",
      hex: "0x0152d02c7e14af680000",
    },
    borrowingExponentFactorLong: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    borrowingExponentFactorShort: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    fundingFactor: {
      type: "BigNumber",
      hex: "0x043c33c1937564800000",
    },
    fundingExponentFactor: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    pnlLongMax: {
      type: "BigNumber",
      hex: "-0x01ffca092d94fa2717b7a0a00000",
    },
    pnlLongMin: {
      type: "BigNumber",
      hex: "-0x01ffca092d94fa2717b7a0a00000",
    },
    pnlShortMax: {
      type: "BigNumber",
      hex: "-0x039b8a08124928501ec8b9500000",
    },
    pnlShortMin: {
      type: "BigNumber",
      hex: "-0x039b8a08124928501ec8b9500000",
    },
    netPnlMax: {
      type: "BigNumber",
      hex: "-0x059b54113fde2277368059f00000",
    },
    netPnlMin: {
      type: "BigNumber",
      hex: "-0x059b54113fde2277368059f00000",
    },
    maxPnlFactorForTradersLong: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    maxPnlFactorForTradersShort: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    minCollateralFactor: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    minCollateralFactorForOpenInterestLong: {
      type: "BigNumber",
      hex: "0x00",
    },
    minCollateralFactorForOpenInterestShort: {
      type: "BigNumber",
      hex: "0x00",
    },
    claimableFundingAmountLong: {
      type: "BigNumber",
      hex: "0x00",
    },
    claimableFundingAmountShort: {
      type: "BigNumber",
      hex: "0x0bbc20",
    },
    positionFeeFactorForPositiveImpact: {
      type: "BigNumber",
      hex: "0x019d971e4fe8401e74000000",
    },
    positionFeeFactorForNegativeImpact: {
      type: "BigNumber",
      hex: "0x024306c4097859c43c000000",
    },
    positionImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x0a968163f0a57b400000",
    },
    positionImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x152d02c7e14af6800000",
    },
    maxPositionImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    maxPositionImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    maxPositionImpactFactorForLiquidations: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    positionImpactExponentFactor: {
      type: "BigNumber",
      hex: "0x193e5939a08ce9dbd480000000",
    },
    swapFeeFactorForPositiveImpact: {
      type: "BigNumber",
      hex: "0x019d971e4fe8401e74000000",
    },
    swapFeeFactorForNegativeImpact: {
      type: "BigNumber",
      hex: "0x024306c4097859c43c000000",
    },
    swapImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x0422ca8b0a00a425000000",
    },
    swapImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x084595161401484a000000",
    },
    swapImpactExponentFactor: {
      type: "BigNumber",
      hex: "0x193e5939a08ce9dbd480000000",
    },
    borrowingFactorPerSecondForLongs: {
      type: "BigNumber",
      hex: "0x00",
    },
    borrowingFactorPerSecondForShorts: {
      type: "BigNumber",
      hex: "0x3a06759dd7f012b91a",
    },
    fundingFactorPerSecond: {
      type: "BigNumber",
      hex: "0xecb26eec42fc7658e0",
    },
    longsPayShorts: false,
    virtualPoolAmountForLongToken: {
      type: "BigNumber",
      hex: "0x02b24068",
    },
    virtualPoolAmountForShortToken: {
      type: "BigNumber",
      hex: "0x06102f5c1c",
    },
    virtualInventoryForPositions: {
      type: "BigNumber",
      hex: "-0x3885f95a824cd6d349eb2ab00000",
    },
    virtualMarketId: "0x11111137e2e8ae1c70c421e7a0dd36e023e0d6217198f889f9eb9c2a6727481f",
    virtualLongTokenId: "0x04533137e2e8ae1c11111111a0dd36e023e0d6217198f889f9eb9c2a6727481d",
    virtualShortTokenId: "0x0000000000000000000000000000000000000000000000000000000000000000",
  },
  indexToken: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 8,
    address: "0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
    isShortable: true,
    imageUrl: "https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png?1548822744",
    coingeckoUrl: "https://www.coingecko.com/en/coins/bitcoin",
    explorerUrl: "https://goerli.arbiscan.io/address/0xCcF73F4Dcbbb573296BFA656b754Fe94BB957d62",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x050eb9f19258bd72da095f10000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x050eb9f19258bd72da095f10000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x04b571c0",
    },
  },
  swapPath: ["0x1529876A9348D61C6c4a3EEe1fe6CbF1117Ca315"],
  initialCollateralTokenAddress: "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3",
  initialCollateralToken: {
    name: "Wrapped Ethereum",
    symbol: "WETH",
    decimals: 18,
    address: "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3",
    isWrapped: true,
    baseSymbol: "ETH",
    imageUrl: "https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1628852295",
    coingeckoUrl: "https://www.coingecko.com/en/coins/ethereum",
    explorerUrl: "https://goerli.arbiscan.io/address/0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x4f995515b0834ce9b4c7e8000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x4f995515b0834ce9b4c7e8000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x00",
    },
  },
  targetCollateralToken: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
    isStable: true,
    imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
    explorerUrl: "https://goerli.arbiscan.io/address/0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0c9f456d8f88b0f1c31e000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x03312adc93",
    },
  },
  initialCollateralDeltaAmount: {
    type: "BigNumber",
    hex: "0x2386f26fc10000",
  },
  sizeDeltaUsd: {
    type: "BigNumber",
    hex: "0x21560c7b28514e1cfcec600000",
  },
  triggerPrice: {
    type: "BigNumber",
    hex: "0x0c9f2c9cd04674edea40000000",
  },
  acceptablePrice: {
    type: "BigNumber",
    hex: "0x0cbf7c6b2e8499f04b50000000",
  },
  minOutputAmount: {
    type: "BigNumber",
    hex: "0x00",
  },
  orderType: 3,
  orderKey: "0x6d4547ccb020d31fbc45ab4475f5d3a129d216c2219281a703dc289c2fdc5ab4",
  isLong: true,
  reason: null,
  transaction: {
    timestamp: 1694775244,
    hash: "0x1290b5858dc8efa0e2eec75a241fa95bdb5f9a58950a57bf540f269edff18751",
    __typename: "Transaction",
  },
});

export const executeOrderDecreaseShort = prepare({
  id: "0x0bf428c4366160023de41667cf3d6c036454e6ea5293e88b8efbc5cc3e231d6f:53",
  eventName: "OrderExecuted",
  account: "0xce7bd8ad3b24de61aa3de12dce9780ce5d6481bf",
  marketAddress: "0x47c031236e19d024b42f8AE6780E44A573170703",
  marketInfo: {
    marketTokenAddress: "0x47c031236e19d024b42f8AE6780E44A573170703",
    indexTokenAddress: "0x47904963fc8b2340414262125aF798B9655E58Cd",
    longTokenAddress: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
    shortTokenAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    isSameCollaterals: false,
    isSpotOnly: false,
    name: "BTC/USD [BTC-USDC]",
    data: "",
    isDisabled: false,
    longToken: {
      name: "Bitcoin (WBTC)",
      symbol: "BTC",
      decimals: 8,
      address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/26115/thumb/btcb.png?1655921693",
      coingeckoUrl: "https://www.coingecko.com/en/coins/wrapped-bitcoin",
      explorerUrl: "https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
      isV1Available: true,
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x054722a45cf984f8f85258c0000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x054722a45cf984f8f85258c0000000",
        },
      },
      balance: {
        type: "BigNumber",
        hex: "0x00",
      },
    },
    shortToken: {
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      isStable: true,
      isV1Available: true,
      imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
      coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
      explorerUrl: "https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x0c9f2c9cd04674edea40000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x0c9f2c9cd04674edea40000000",
        },
      },
      balance: {
        type: "BigNumber",
        hex: "0x00",
      },
    },
    indexToken: {
      name: "Bitcoin",
      symbol: "BTC",
      address: "0x47904963fc8b2340414262125aF798B9655E58Cd",
      isSynthetic: true,
      decimals: 8,
      imageUrl: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
      explorerUrl: "https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
      coingeckoUrl: "https://www.coingecko.com/en/coins/bitcoin",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x054722a45cf984f8f85258c0000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x054722a45cf984f8f85258c0000000",
        },
      },
    },
    longInterestUsd: {
      type: "BigNumber",
      hex: "0x026aa72ce83f2dc00bb27acb26c64000",
    },
    shortInterestUsd: {
      type: "BigNumber",
      hex: "0x01a1323e219efa5cdc30467ef55b3000",
    },
    longInterestInTokens: {
      type: "BigNumber",
      hex: "0x02cb9e0bcc",
    },
    shortInterestInTokens: {
      type: "BigNumber",
      hex: "0x01ddb76b72",
    },
    longPoolAmount: {
      type: "BigNumber",
      hex: "0x0490f0965f",
    },
    shortPoolAmount: {
      type: "BigNumber",
      hex: "0x03e46c304cc2",
    },
    maxLongPoolAmount: {
      type: "BigNumber",
      hex: "0x0826299e00",
    },
    maxShortPoolAmount: {
      type: "BigNumber",
      hex: "0x09184e72a000",
    },
    longPoolAmountAdjustment: {
      type: "BigNumber",
      hex: "0x00",
    },
    shortPoolAmountAdjustment: {
      type: "BigNumber",
      hex: "0x00",
    },
    poolValueMin: {
      type: "BigNumber",
      hex: "0x073b1bede492735ee0282784d7459d50",
    },
    poolValueMax: {
      type: "BigNumber",
      hex: "0x073b1bede492735ee0282784d7459d50",
    },
    reserveFactorLong: {
      type: "BigNumber",
      hex: "0x0b5c0e8d21d902d61fa0000000",
    },
    reserveFactorShort: {
      type: "BigNumber",
      hex: "0x0b5c0e8d21d902d61fa0000000",
    },
    openInterestReserveFactorLong: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    openInterestReserveFactorShort: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    totalBorrowingFees: {
      type: "BigNumber",
      hex: "0x01a767f051786f6421fee2f26b2973",
    },
    positionImpactPoolAmount: {
      type: "BigNumber",
      hex: "0x07f25a",
    },
    swapImpactPoolAmountLong: {
      type: "BigNumber",
      hex: "0x1a08f6",
    },
    swapImpactPoolAmountShort: {
      type: "BigNumber",
      hex: "0x1f621a",
    },
    borrowingFactorLong: {
      type: "BigNumber",
      hex: "0x0152d02c7e14af680000",
    },
    borrowingFactorShort: {
      type: "BigNumber",
      hex: "0x0152d02c7e14af680000",
    },
    borrowingExponentFactorLong: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    borrowingExponentFactorShort: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    fundingFactor: {
      type: "BigNumber",
      hex: "0x043c33c1937564800000",
    },
    fundingExponentFactor: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    pnlLongMax: {
      type: "BigNumber",
      hex: "0x0f0309d5cf9409376de7a0f239c000",
    },
    pnlLongMin: {
      type: "BigNumber",
      hex: "0x0f0309d5cf9409376de7a0f239c000",
    },
    pnlShortMax: {
      type: "BigNumber",
      hex: "-0x05cfe92f5905d76d12014a8024d000",
    },
    pnlShortMin: {
      type: "BigNumber",
      hex: "-0x05cfe92f5905d76d12014a8024d000",
    },
    netPnlMax: {
      type: "BigNumber",
      hex: "0x093320a6768e31ca5be6567214f000",
    },
    netPnlMin: {
      type: "BigNumber",
      hex: "0x093320a6768e31ca5be6567214f000",
    },
    maxPnlFactorForTradersLong: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    maxPnlFactorForTradersShort: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    minCollateralFactor: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    minCollateralFactorForOpenInterestLong: {
      type: "BigNumber",
      hex: "0x0ad78ebc5ac6200000",
    },
    minCollateralFactorForOpenInterestShort: {
      type: "BigNumber",
      hex: "0x0ad78ebc5ac6200000",
    },
    claimableFundingAmountLong: {
      type: "BigNumber",
      hex: "0x00",
    },
    claimableFundingAmountShort: {
      type: "BigNumber",
      hex: "0x00",
    },
    positionFeeFactorForPositiveImpact: {
      type: "BigNumber",
      hex: "0x019d971e4fe8401e74000000",
    },
    positionFeeFactorForNegativeImpact: {
      type: "BigNumber",
      hex: "0x024306c4097859c43c000000",
    },
    positionImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x068155a43676e00000",
    },
    positionImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x068155a43676e00000",
    },
    maxPositionImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    maxPositionImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    maxPositionImpactFactorForLiquidations: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    positionImpactExponentFactor: {
      type: "BigNumber",
      hex: "0x193e5939a08ce9dbd480000000",
    },
    swapFeeFactorForPositiveImpact: {
      type: "BigNumber",
      hex: "0x019d971e4fe8401e74000000",
    },
    swapFeeFactorForNegativeImpact: {
      type: "BigNumber",
      hex: "0x024306c4097859c43c000000",
    },
    swapImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x0ad78ebc5ac6200000",
    },
    swapImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x0ad78ebc5ac6200000",
    },
    swapImpactExponentFactor: {
      type: "BigNumber",
      hex: "0x193e5939a08ce9dbd480000000",
    },
    borrowingFactorPerSecondForLongs: {
      type: "BigNumber",
      hex: "0xcf6b52d463b503fa2c",
    },
    borrowingFactorPerSecondForShorts: {
      type: "BigNumber",
      hex: "0x00",
    },
    fundingFactorPerSecond: {
      type: "BigNumber",
      hex: "0xd2dc544940a84ab330",
    },
    longsPayShorts: true,
    virtualPoolAmountForLongToken: {
      type: "BigNumber",
      hex: "0x0490f0965f",
    },
    virtualPoolAmountForShortToken: {
      type: "BigNumber",
      hex: "0x03e46c304cc2",
    },
    virtualInventoryForPositions: {
      type: "BigNumber",
      hex: "-0xc974eec6a033632f82344c316b1000",
    },
    virtualMarketId: "0xba1ff14bf93fbb00b6f43d3ad403cc4c6496c1bb88489075c8b1bc709bde9ebb",
    virtualLongTokenId: "0x0000000000000000000000000000000000000000000000000000000000000000",
    virtualShortTokenId: "0x0000000000000000000000000000000000000000000000000000000000000000",
  },
  indexToken: {
    name: "Bitcoin",
    symbol: "BTC",
    address: "0x47904963fc8b2340414262125aF798B9655E58Cd",
    isSynthetic: true,
    decimals: 8,
    imageUrl: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
    explorerUrl: "https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
    coingeckoUrl: "https://www.coingecko.com/en/coins/bitcoin",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x054722a45cf984f8f85258c0000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x054722a45cf984f8f85258c0000000",
      },
    },
  },
  swapPath: [],
  initialCollateralTokenAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  initialCollateralToken: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    isStable: true,
    isV1Available: true,
    imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
    explorerUrl: "https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x00",
    },
  },
  targetCollateralToken: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    isStable: true,
    isV1Available: true,
    imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
    explorerUrl: "https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x00",
    },
  },
  initialCollateralDeltaAmount: {
    type: "BigNumber",
    hex: "0x03773fd687",
  },
  sizeDeltaUsd: {
    type: "BigNumber",
    hex: "0x2b48ab98e6e457b777e9a19fa20000",
  },
  triggerPrice: {
    type: "BigNumber",
    hex: "0x0544f3bff7736a10d32b7800000000",
  },
  acceptablePrice: {
    type: "BigNumber",
    hex: "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffe3bbb00",
  },
  executionPrice: {
    type: "BigNumber",
    hex: "0x0545867fe6489bef3f8cc29ba42600",
  },
  minOutputAmount: {
    type: "BigNumber",
    hex: "0x03773fd687",
  },
  collateralTokenPriceMax: {
    type: "BigNumber",
    hex: "0x0c9f2c9cd04674edea40000000",
  },
  collateralTokenPriceMin: {
    type: "BigNumber",
    hex: "0x0c9f22a95cab20f5969d400000",
  },
  indexTokenPriceMin: {
    type: "BigNumber",
    hex: "0xe25f63be73df3171500000",
  },
  indexTokenPriceMax: {
    type: "BigNumber",
    hex: "0xe25f63be73df3171500000",
  },
  orderType: 6,
  orderKey: "0xd33ac3b59ae1a0dce2a6825cd72bc3d6dcc7cae4679cee47bdaf52732411240d",
  isLong: false,
  priceImpactDiffUsd: {
    type: "BigNumber",
    hex: "0x00",
  },
  positionFeeAmount: {
    type: "BigNumber",
    hex: "0x09608a32",
  },
  borrowingFeeAmount: {
    type: "BigNumber",
    hex: "0x00",
  },
  fundingFeeAmount: {
    type: "BigNumber",
    hex: "0x00",
  },
  reason: null,
  transaction: {
    timestamp: 1695040517,
    hash: "0x0bf428c4366160023de41667cf3d6c036454e6ea5293e88b8efbc5cc3e231d6f",
    __typename: "Transaction",
  },
});

export const executeOrderIncreaseShort = prepare({
  id: "0xf57f245966c3313a01526c6b86406e3af5d61eedcf380e4595fabfab1c5d0d7e:24",
  eventName: "OrderExecuted",
  account: "0x20437fb99dee29c9a4786b02bf1a3afc445fd86b",
  marketAddress: "0xC25cEf6061Cf5dE5eb761b50E4743c1F5D7E5407",
  marketInfo: {
    marketTokenAddress: "0xC25cEf6061Cf5dE5eb761b50E4743c1F5D7E5407",
    indexTokenAddress: "0x912CE59144191C1204E64559FE8253a0e49E6548",
    longTokenAddress: "0x912CE59144191C1204E64559FE8253a0e49E6548",
    shortTokenAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    isSameCollaterals: false,
    isSpotOnly: false,
    name: "ARB/USD [ARB-USDC]",
    data: "",
    isDisabled: false,
    longToken: {
      name: "Arbitrum",
      symbol: "ARB",
      decimals: 18,
      priceDecimals: 3,
      address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
      imageUrl: "https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg?1680097630",
      coingeckoUrl: "https://www.coingecko.com/en/coins/arbitrum",
      explorerUrl: "https://arbiscan.io/token/0x912ce59144191c1204e64559fe8253a0e49e6548",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x0a88559fd740bfe4a081800000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x0a88559fd740bfe4a081800000",
        },
      },
      balance: {
        type: "BigNumber",
        hex: "0x00",
      },
    },
    shortToken: {
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      isStable: true,
      isV1Available: true,
      imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
      coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
      explorerUrl: "https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x0c9f2c9cd04674edea40000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x0c9f2c9cd04674edea40000000",
        },
      },
      balance: {
        type: "BigNumber",
        hex: "0x00",
      },
    },
    indexToken: {
      name: "Arbitrum",
      symbol: "ARB",
      decimals: 18,
      priceDecimals: 3,
      address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
      imageUrl: "https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg?1680097630",
      coingeckoUrl: "https://www.coingecko.com/en/coins/arbitrum",
      explorerUrl: "https://arbiscan.io/token/0x912ce59144191c1204e64559fe8253a0e49e6548",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x0a88559fd740bfe4a081800000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x0a88559fd740bfe4a081800000",
        },
      },
      balance: {
        type: "BigNumber",
        hex: "0x00",
      },
    },
    longInterestUsd: {
      type: "BigNumber",
      hex: "0x4adfb06ea425e6260bbb7731161856",
    },
    shortInterestUsd: {
      type: "BigNumber",
      hex: "0x34e357263d19fb9ff443a3663cafa8",
    },
    longInterestInTokens: {
      type: "BigNumber",
      hex: "0x64ffb9f7cba391496a48",
    },
    shortInterestInTokens: {
      type: "BigNumber",
      hex: "0x4024f916f4c21c76b67a",
    },
    longPoolAmount: {
      type: "BigNumber",
      hex: "0xb8d3436c32a8893763ab",
    },
    shortPoolAmount: {
      type: "BigNumber",
      hex: "0x93ade4de1f",
    },
    maxLongPoolAmount: {
      type: "BigNumber",
      hex: "0xd3c21bcecceda1000000",
    },
    maxShortPoolAmount: {
      type: "BigNumber",
      hex: "0xe8d4a51000",
    },
    longPoolAmountAdjustment: {
      type: "BigNumber",
      hex: "0x00",
    },
    shortPoolAmountAdjustment: {
      type: "BigNumber",
      hex: "0x00",
    },
    poolValueMin: {
      type: "BigNumber",
      hex: "0xfdafb5ebe27c6ab88ea4d2ead354cb",
    },
    poolValueMax: {
      type: "BigNumber",
      hex: "0xfdafb5ebe27c6ab88ea4d2ead354cb",
    },
    reserveFactorLong: {
      type: "BigNumber",
      hex: "0x0b5c0e8d21d902d61fa0000000",
    },
    reserveFactorShort: {
      type: "BigNumber",
      hex: "0x0b5c0e8d21d902d61fa0000000",
    },
    openInterestReserveFactorLong: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    openInterestReserveFactorShort: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    totalBorrowingFees: {
      type: "BigNumber",
      hex: "0x289e543927407e0ac1af2da10586",
    },
    positionImpactPoolAmount: {
      type: "BigNumber",
      hex: "0x03c472ef2e9c9ca50188",
    },
    swapImpactPoolAmountLong: {
      type: "BigNumber",
      hex: "0x6cf1a9f39a2e8f3731",
    },
    swapImpactPoolAmountShort: {
      type: "BigNumber",
      hex: "0x5d95ff",
    },
    borrowingFactorLong: {
      type: "BigNumber",
      hex: "0x01fd933494aa5fe00000",
    },
    borrowingFactorShort: {
      type: "BigNumber",
      hex: "0x01fd933494aa5fe00000",
    },
    borrowingExponentFactorLong: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    borrowingExponentFactorShort: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    fundingFactor: {
      type: "BigNumber",
      hex: "0x043c33c1937564800000",
    },
    fundingExponentFactor: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    pnlLongMax: {
      type: "BigNumber",
      hex: "0x01c7883325390bc260591381f5baaa",
    },
    pnlLongMin: {
      type: "BigNumber",
      hex: "0x01c7883325390bc260591381f5baaa",
    },
    pnlShortMax: {
      type: "BigNumber",
      hex: "0x0434a1bb1c825f0f96ba9d3987ebe8",
    },
    pnlShortMin: {
      type: "BigNumber",
      hex: "0x0434a1bb1c825f0f96ba9d3987ebe8",
    },
    netPnlMax: {
      type: "BigNumber",
      hex: "0x05fc29ee41bb6ad1f713b0bb7da692",
    },
    netPnlMin: {
      type: "BigNumber",
      hex: "0x05fc29ee41bb6ad1f713b0bb7da692",
    },
    maxPnlFactorForTradersLong: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    maxPnlFactorForTradersShort: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    minCollateralFactor: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    minCollateralFactorForOpenInterestLong: {
      type: "BigNumber",
      hex: "0x021e19e0c9bab2400000",
    },
    minCollateralFactorForOpenInterestShort: {
      type: "BigNumber",
      hex: "0x021e19e0c9bab2400000",
    },
    claimableFundingAmountLong: {
      type: "BigNumber",
      hex: "0x00",
    },
    claimableFundingAmountShort: {
      type: "BigNumber",
      hex: "0x00",
    },
    positionFeeFactorForPositiveImpact: {
      type: "BigNumber",
      hex: "0x019d971e4fe8401e74000000",
    },
    positionFeeFactorForNegativeImpact: {
      type: "BigNumber",
      hex: "0x024306c4097859c43c000000",
    },
    positionImpactFactorPositive: {
      type: "BigNumber",
      hex: "0xd8d726b7177a800000",
    },
    positionImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x01b1ae4d6e2ef5000000",
    },
    maxPositionImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    maxPositionImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    maxPositionImpactFactorForLiquidations: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    positionImpactExponentFactor: {
      type: "BigNumber",
      hex: "0x193e5939a08ce9dbd480000000",
    },
    swapFeeFactorForPositiveImpact: {
      type: "BigNumber",
      hex: "0x019d971e4fe8401e74000000",
    },
    swapFeeFactorForNegativeImpact: {
      type: "BigNumber",
      hex: "0x024306c4097859c43c000000",
    },
    swapImpactFactorPositive: {
      type: "BigNumber",
      hex: "0xd8d726b7177a800000",
    },
    swapImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x01b1ae4d6e2ef5000000",
    },
    swapImpactExponentFactor: {
      type: "BigNumber",
      hex: "0x193e5939a08ce9dbd480000000",
    },
    borrowingFactorPerSecondForLongs: {
      type: "BigNumber",
      hex: "0x011675e3f2fc2ab3f2a8",
    },
    borrowingFactorPerSecondForShorts: {
      type: "BigNumber",
      hex: "0x00",
    },
    fundingFactorPerSecond: {
      type: "BigNumber",
      hex: "0xba92d6d5e631f90af4",
    },
    longsPayShorts: true,
    virtualPoolAmountForLongToken: {
      type: "BigNumber",
      hex: "0xb8d3436c32a8893763ab",
    },
    virtualPoolAmountForShortToken: {
      type: "BigNumber",
      hex: "0x93ade4de1f",
    },
    virtualInventoryForPositions: {
      type: "BigNumber",
      hex: "-0x15fc5948670bea861777d3cad968ae",
    },
    virtualMarketId: "0x85248fe8b259d5a671c8ca8540127a7b9cb2534b1175b95d1df6391360841c7b",
    virtualLongTokenId: "0xab14694c1d031aa28aedaf394a1c4f0054ad43be42448259b8bc064efa1af97c",
    virtualShortTokenId: "0x0000000000000000000000000000000000000000000000000000000000000000",
  },
  indexToken: {
    name: "Arbitrum",
    symbol: "ARB",
    decimals: 18,
    priceDecimals: 3,
    address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
    imageUrl: "https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg?1680097630",
    coingeckoUrl: "https://www.coingecko.com/en/coins/arbitrum",
    explorerUrl: "https://arbiscan.io/token/0x912ce59144191c1204e64559fe8253a0e49e6548",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0a88559fd740bfe4a081800000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0a88559fd740bfe4a081800000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x00",
    },
  },
  swapPath: [],
  initialCollateralTokenAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  initialCollateralToken: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    isStable: true,
    isV1Available: true,
    imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
    explorerUrl: "https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x00",
    },
  },
  targetCollateralToken: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    isStable: true,
    isV1Available: true,
    imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
    explorerUrl: "https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x00",
    },
  },
  initialCollateralDeltaAmount: {
    type: "BigNumber",
    hex: "0x0c13bc90",
  },
  sizeDeltaUsd: {
    type: "BigNumber",
    hex: "0x661171efc3f661f9e69990000000",
  },
  triggerPrice: {
    type: "BigNumber",
    hex: "0x0a8d42fdf9e4e2c6e5a0000000",
  },
  acceptablePrice: {
    type: "BigNumber",
    hex: "0x0a723fc31dcb8e96d3f8000000",
  },
  executionPrice: {
    type: "BigNumber",
    hex: "0x0a90da455f096c14553e780000",
  },
  minOutputAmount: {
    type: "BigNumber",
    hex: "0x00",
  },
  indexTokenPriceMin: {
    type: "BigNumber",
    hex: "0xc2b9bf2fd0",
  },
  indexTokenPriceMax: {
    type: "BigNumber",
    hex: "0xc2b9bf2fd0",
  },
  orderType: 3,
  orderKey: "0x407ad8ff489c228d56ff0764956ce61ae0a3e1f238de6d4cf7cfaa508b7676d7",
  isLong: false,
  reason: null,
  transaction: {
    timestamp: 1695040998,
    hash: "0xf57f245966c3313a01526c6b86406e3af5d61eedcf380e4595fabfab1c5d0d7e",
    __typename: "Transaction",
  },
});

export const freezeOrderIncreaseShort = prepare({
  id: "0xba090183c17bcc5dbfcb4b19c59aa420df42e72ae8c8bce6be8fe07f3769c3b1:4",
  eventName: "OrderFrozen",
  account: "0x54e761835a59080b4de36fbe0b1396e7b3b7353e",
  marketAddress: "0x47c031236e19d024b42f8AE6780E44A573170703",
  marketInfo: {
    marketTokenAddress: "0x47c031236e19d024b42f8AE6780E44A573170703",
    indexTokenAddress: "0x47904963fc8b2340414262125aF798B9655E58Cd",
    longTokenAddress: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
    shortTokenAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    isSameCollaterals: false,
    isSpotOnly: false,
    name: "BTC/USD [BTC-USDC]",
    data: "",
    isDisabled: false,
    longToken: {
      name: "Bitcoin (WBTC)",
      symbol: "BTC",
      decimals: 8,
      address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/26115/thumb/btcb.png?1655921693",
      coingeckoUrl: "https://www.coingecko.com/en/coins/wrapped-bitcoin",
      explorerUrl: "https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
      isV1Available: true,
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x054351f8192ce28e4e687b20000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x054351f8192ce28e4e687b20000000",
        },
      },
      balance: {
        type: "BigNumber",
        hex: "0x00",
      },
    },
    shortToken: {
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      isStable: true,
      isV1Available: true,
      imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
      coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
      explorerUrl: "https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x0c9f2c9cd04674edea40000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x0c9f2c9cd04674edea40000000",
        },
      },
      balance: {
        type: "BigNumber",
        hex: "0x00",
      },
    },
    indexToken: {
      name: "Bitcoin",
      symbol: "BTC",
      address: "0x47904963fc8b2340414262125aF798B9655E58Cd",
      isSynthetic: true,
      decimals: 8,
      imageUrl: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
      explorerUrl: "https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
      coingeckoUrl: "https://www.coingecko.com/en/coins/bitcoin",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x054351f8192ce28e4e687b20000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x054351f8192ce28e4e687b20000000",
        },
      },
    },
    longInterestUsd: {
      type: "BigNumber",
      hex: "0x0274ee6de80ffd23e60ec80022fd4000",
    },
    shortInterestUsd: {
      type: "BigNumber",
      hex: "0x01b65b3690559bad99db88e709953000",
    },
    longInterestInTokens: {
      type: "BigNumber",
      hex: "0x02d6c4a617",
    },
    shortInterestInTokens: {
      type: "BigNumber",
      hex: "0x01f5707299",
    },
    longPoolAmount: {
      type: "BigNumber",
      hex: "0x049192b278",
    },
    shortPoolAmount: {
      type: "BigNumber",
      hex: "0x03e3bf919543",
    },
    maxLongPoolAmount: {
      type: "BigNumber",
      hex: "0x0826299e00",
    },
    maxShortPoolAmount: {
      type: "BigNumber",
      hex: "0x09184e72a000",
    },
    longPoolAmountAdjustment: {
      type: "BigNumber",
      hex: "0x00",
    },
    shortPoolAmountAdjustment: {
      type: "BigNumber",
      hex: "0x00",
    },
    poolValueMin: {
      type: "BigNumber",
      hex: "0x0738fb12f5ec0f84e24c4d140d1ba86c",
    },
    poolValueMax: {
      type: "BigNumber",
      hex: "0x0738fb12f5ec0f84e24c4d140d1ba86c",
    },
    reserveFactorLong: {
      type: "BigNumber",
      hex: "0x0b5c0e8d21d902d61fa0000000",
    },
    reserveFactorShort: {
      type: "BigNumber",
      hex: "0x0b5c0e8d21d902d61fa0000000",
    },
    openInterestReserveFactorLong: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    openInterestReserveFactorShort: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    totalBorrowingFees: {
      type: "BigNumber",
      hex: "0x019dc9ef3df233d4d9fe733fb163b8",
    },
    positionImpactPoolAmount: {
      type: "BigNumber",
      hex: "0x072e37",
    },
    swapImpactPoolAmountLong: {
      type: "BigNumber",
      hex: "0x1a44a2",
    },
    swapImpactPoolAmountShort: {
      type: "BigNumber",
      hex: "0x1f621a",
    },
    borrowingFactorLong: {
      type: "BigNumber",
      hex: "0x0152d02c7e14af680000",
    },
    borrowingFactorShort: {
      type: "BigNumber",
      hex: "0x0152d02c7e14af680000",
    },
    borrowingExponentFactorLong: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    borrowingExponentFactorShort: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    fundingFactor: {
      type: "BigNumber",
      hex: "0x043c33c1937564800000",
    },
    fundingExponentFactor: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    pnlLongMax: {
      type: "BigNumber",
      hex: "0x0cca4b45e60210d3ed1b31e8e2c000",
    },
    pnlLongMin: {
      type: "BigNumber",
      hex: "0x0cca4b45e60210d3ed1b31e8e2c000",
    },
    pnlShortMax: {
      type: "BigNumber",
      hex: "-0x04678730574b3b59d575ef508ad000",
    },
    pnlShortMin: {
      type: "BigNumber",
      hex: "-0x04678730574b3b59d575ef508ad000",
    },
    netPnlMax: {
      type: "BigNumber",
      hex: "0x0862c4158eb6d57a17a5429857f000",
    },
    netPnlMin: {
      type: "BigNumber",
      hex: "0x0862c4158eb6d57a17a5429857f000",
    },
    maxPnlFactorForTradersLong: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    maxPnlFactorForTradersShort: {
      type: "BigNumber",
      hex: "0x0a18f07d736b90be5500000000",
    },
    minCollateralFactor: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    minCollateralFactorForOpenInterestLong: {
      type: "BigNumber",
      hex: "0x0ad78ebc5ac6200000",
    },
    minCollateralFactorForOpenInterestShort: {
      type: "BigNumber",
      hex: "0x0ad78ebc5ac6200000",
    },
    claimableFundingAmountLong: {
      type: "BigNumber",
      hex: "0x00",
    },
    claimableFundingAmountShort: {
      type: "BigNumber",
      hex: "0x00",
    },
    positionFeeFactorForPositiveImpact: {
      type: "BigNumber",
      hex: "0x019d971e4fe8401e74000000",
    },
    positionFeeFactorForNegativeImpact: {
      type: "BigNumber",
      hex: "0x024306c4097859c43c000000",
    },
    positionImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x068155a43676e00000",
    },
    positionImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x068155a43676e00000",
    },
    maxPositionImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    maxPositionImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    maxPositionImpactFactorForLiquidations: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    positionImpactExponentFactor: {
      type: "BigNumber",
      hex: "0x193e5939a08ce9dbd480000000",
    },
    swapFeeFactorForPositiveImpact: {
      type: "BigNumber",
      hex: "0x019d971e4fe8401e74000000",
    },
    swapFeeFactorForNegativeImpact: {
      type: "BigNumber",
      hex: "0x024306c4097859c43c000000",
    },
    swapImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x0ad78ebc5ac6200000",
    },
    swapImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x0ad78ebc5ac6200000",
    },
    swapImpactExponentFactor: {
      type: "BigNumber",
      hex: "0x193e5939a08ce9dbd480000000",
    },
    borrowingFactorPerSecondForLongs: {
      type: "BigNumber",
      hex: "0xd28985d75b681ced46",
    },
    borrowingFactorPerSecondForShorts: {
      type: "BigNumber",
      hex: "0x00",
    },
    fundingFactorPerSecond: {
      type: "BigNumber",
      hex: "0xc19866e9be22c6899b",
    },
    longsPayShorts: true,
    virtualPoolAmountForLongToken: {
      type: "BigNumber",
      hex: "0x049192b278",
    },
    virtualPoolAmountForShortToken: {
      type: "BigNumber",
      hex: "0x03e3bf919543",
    },
    virtualInventoryForPositions: {
      type: "BigNumber",
      hex: "-0xbe933757ba61764c333f1919681000",
    },
    virtualMarketId: "0xba1ff14bf93fbb00b6f43d3ad403cc4c6496c1bb88489075c8b1bc709bde9ebb",
    virtualLongTokenId: "0x0000000000000000000000000000000000000000000000000000000000000000",
    virtualShortTokenId: "0x0000000000000000000000000000000000000000000000000000000000000000",
  },
  indexToken: {
    name: "Bitcoin",
    symbol: "BTC",
    address: "0x47904963fc8b2340414262125aF798B9655E58Cd",
    isSynthetic: true,
    decimals: 8,
    imageUrl: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
    explorerUrl: "https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
    coingeckoUrl: "https://www.coingecko.com/en/coins/bitcoin",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x054351f8192ce28e4e687b20000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x054351f8192ce28e4e687b20000000",
      },
    },
  },
  swapPath: ["0x9C2433dFD71096C435Be9465220BB2B189375eA7"],
  initialCollateralTokenAddress: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
  initialCollateralToken: {
    name: "Bridged USDC (USDC.e)",
    symbol: "USDC.e",
    decimals: 6,
    address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    isStable: true,
    imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
    explorerUrl: "https://arbiscan.io/token/0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    isV1Available: true,
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x00",
    },
  },
  targetCollateralToken: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    isStable: true,
    isV1Available: true,
    imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
    explorerUrl: "https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x00",
    },
  },
  initialCollateralDeltaAmount: {
    type: "BigNumber",
    hex: "0x01ac2237",
  },
  sizeDeltaUsd: {
    type: "BigNumber",
    hex: "0x428098a6d7b79147095d81580000",
  },
  triggerPrice: {
    type: "BigNumber",
    hex: "0x053d8e7bd39160c84fc43680000000",
  },
  acceptablePrice: {
    type: "BigNumber",
    hex: "0x053024194ee4677ea0e387e0000000",
  },
  minOutputAmount: {
    type: "BigNumber",
    hex: "0x01abe67e",
  },
  orderType: 3,
  orderKey: "0xc9ccd8ea9fd33f462eec2ecfb1e0a1aab0e64cbfc7c281dbcee0754002b2ac61",
  isLong: false,
  reason: "",
  transaction: {
    timestamp: 1695035649,
    hash: "0xba090183c17bcc5dbfcb4b19c59aa420df42e72ae8c8bce6be8fe07f3769c3b1",
    __typename: "Transaction",
  },
});

export const undefinedOrder = prepare({
  id: "0xe07dc5d9c3ba6e04b68af869b2aaeeb5716ccc54d60c3d3628b7b38ff92b669a:3",
  eventName: "OrderCreated",
  account: "0x2c3c6d708d54e378f1e1e136a3882976f7855819",
  marketAddress: "0x0CCB4fAa6f1F1B30911619f1184082aB4E25813c",
  marketInfo: {
    marketTokenAddress: "0x0CCB4fAa6f1F1B30911619f1184082aB4E25813c",
    indexTokenAddress: "0xc14e065b0067dE91534e032868f5Ac6ecf2c6868",
    longTokenAddress: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    shortTokenAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    isSameCollaterals: false,
    isSpotOnly: false,
    name: "XRP/USD [WETH-USDC]",
    data: "",
    isDisabled: false,
    longToken: {
      name: "Wrapped Ethereum",
      symbol: "WETH",
      decimals: 18,
      address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      isWrapped: true,
      baseSymbol: "ETH",
      imageUrl: "https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1628852295",
      coingeckoUrl: "https://www.coingecko.com/en/coins/ethereum",
      isV1Available: true,
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x51b4a3fdc660c8259db5b8000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x51b4a3fdc660c8259db5b8000000",
        },
      },
      balance: {
        type: "BigNumber",
        hex: "0x00",
      },
    },
    shortToken: {
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      isStable: true,
      isV1Available: true,
      imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
      coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
      explorerUrl: "https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x0c9f2c9cd04674edea40000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x0c9f2c9cd04674edea40000000",
        },
      },
      balance: {
        type: "BigNumber",
        hex: "0x00",
      },
    },
    indexToken: {
      name: "XRP",
      symbol: "XRP",
      decimals: 6,
      priceDecimals: 4,
      address: "0xc14e065b0067dE91534e032868f5Ac6ecf2c6868",
      imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png?1605778731",
      coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
      isSynthetic: true,
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x0659c4ab6f66def68ad8800000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x0659c4ab6f66def68ad8800000",
        },
      },
    },
    longInterestUsd: {
      type: "BigNumber",
      hex: "0x086bbde568f90f250a07ed89db3900",
    },
    shortInterestUsd: {
      type: "BigNumber",
      hex: "0x029ad80eb02845992d0f722667b62c",
    },
    longInterestInTokens: {
      type: "BigNumber",
      hex: "0x14ffbd41ef",
    },
    shortInterestInTokens: {
      type: "BigNumber",
      hex: "0x06392f706c",
    },
    longPoolAmount: {
      type: "BigNumber",
      hex: "0x03d8bf488263d07652",
    },
    shortPoolAmount: {
      type: "BigNumber",
      hex: "0x0d64950b21",
    },
    maxLongPoolAmount: {
      type: "BigNumber",
      hex: "0x1b1ae4d6e2ef500000",
    },
    maxShortPoolAmount: {
      type: "BigNumber",
      hex: "0xe8d4a51000",
    },
    longPoolAmountAdjustment: {
      type: "BigNumber",
      hex: "0x00",
    },
    shortPoolAmountAdjustment: {
      type: "BigNumber",
      hex: "0x00",
    },
    poolValueMin: {
      type: "BigNumber",
      hex: "0x2155d4f1887110678316d6b09d5304",
    },
    poolValueMax: {
      type: "BigNumber",
      hex: "0x2155d4f1887110678316d6b09d5304",
    },
    reserveFactorLong: {
      type: "BigNumber",
      hex: "0x08d5d26dc4fe1ea68a60000000",
    },
    reserveFactorShort: {
      type: "BigNumber",
      hex: "0x08d5d26dc4fe1ea68a60000000",
    },
    openInterestReserveFactorLong: {
      type: "BigNumber",
      hex: "0x064f964e68233a76f520000000",
    },
    openInterestReserveFactorShort: {
      type: "BigNumber",
      hex: "0x064f964e68233a76f520000000",
    },
    totalBorrowingFees: {
      type: "BigNumber",
      hex: "0x04c3239be5da8c48fae025d66b39",
    },
    positionImpactPoolAmount: {
      type: "BigNumber",
      hex: "0x2a28bab3",
    },
    swapImpactPoolAmountLong: {
      type: "BigNumber",
      hex: "0x3111f82c33a4a9",
    },
    swapImpactPoolAmountShort: {
      type: "BigNumber",
      hex: "0x3bce34",
    },
    borrowingFactorLong: {
      type: "BigNumber",
      hex: "0x032d26d12e980b600000",
    },
    borrowingFactorShort: {
      type: "BigNumber",
      hex: "0x032d26d12e980b600000",
    },
    borrowingExponentFactorLong: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    borrowingExponentFactorShort: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    fundingFactor: {
      type: "BigNumber",
      hex: "0x043c33c1937564800000",
    },
    fundingExponentFactor: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    pnlLongMax: {
      type: "BigNumber",
      hex: "0x519f7d5c9b1e829892a22232c700",
    },
    pnlLongMin: {
      type: "BigNumber",
      hex: "0x519f7d5c9b1e829892a22232c700",
    },
    pnlShortMax: {
      type: "BigNumber",
      hex: "0x03c3fb5d86a80ab621deb5cfb62c",
    },
    pnlShortMin: {
      type: "BigNumber",
      hex: "0x03c3fb5d86a80ab621deb5cfb62c",
    },
    netPnlMax: {
      type: "BigNumber",
      hex: "0x556378ba21c68d4eb480d8027d2c",
    },
    netPnlMin: {
      type: "BigNumber",
      hex: "0x556378ba21c68d4eb480d8027d2c",
    },
    maxPnlFactorForTradersLong: {
      type: "BigNumber",
      hex: "0x064f964e68233a76f520000000",
    },
    maxPnlFactorForTradersShort: {
      type: "BigNumber",
      hex: "0x064f964e68233a76f520000000",
    },
    minCollateralFactor: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    minCollateralFactorForOpenInterestLong: {
      type: "BigNumber",
      hex: "0x6c6b935b8bbd400000",
    },
    minCollateralFactorForOpenInterestShort: {
      type: "BigNumber",
      hex: "0x6c6b935b8bbd400000",
    },
    claimableFundingAmountLong: {
      type: "BigNumber",
      hex: "0x00",
    },
    claimableFundingAmountShort: {
      type: "BigNumber",
      hex: "0x00",
    },
    positionFeeFactorForPositiveImpact: {
      type: "BigNumber",
      hex: "0x019d971e4fe8401e74000000",
    },
    positionFeeFactorForNegativeImpact: {
      type: "BigNumber",
      hex: "0x024306c4097859c43c000000",
    },
    positionImpactFactorPositive: {
      type: "BigNumber",
      hex: "0xd8d726b7177a800000",
    },
    positionImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x01b1ae4d6e2ef5000000",
    },
    maxPositionImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    maxPositionImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    maxPositionImpactFactorForLiquidations: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    positionImpactExponentFactor: {
      type: "BigNumber",
      hex: "0x193e5939a08ce9dbd480000000",
    },
    swapFeeFactorForPositiveImpact: {
      type: "BigNumber",
      hex: "0x019d971e4fe8401e74000000",
    },
    swapFeeFactorForNegativeImpact: {
      type: "BigNumber",
      hex: "0x024306c4097859c43c000000",
    },
    swapImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x010f0cf064dd59200000",
    },
    swapImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x010f0cf064dd59200000",
    },
    swapImpactExponentFactor: {
      type: "BigNumber",
      hex: "0x193e5939a08ce9dbd480000000",
    },
    borrowingFactorPerSecondForLongs: {
      type: "BigNumber",
      hex: "0x0139cc9973549c6b9a30",
    },
    borrowingFactorPerSecondForShorts: {
      type: "BigNumber",
      hex: "0x00",
    },
    fundingFactorPerSecond: {
      type: "BigNumber",
      hex: "0x023be9120a4b0820aeeb",
    },
    longsPayShorts: true,
    virtualPoolAmountForLongToken: {
      type: "BigNumber",
      hex: "0x03d8bf488263d07652",
    },
    virtualPoolAmountForShortToken: {
      type: "BigNumber",
      hex: "0x0d64950b21",
    },
    virtualInventoryForPositions: {
      type: "BigNumber",
      hex: "-0x05d0e5d6b8d0c98bdcf87b637382d4",
    },
    virtualMarketId: "0x4cdf047af6bcf090983ce57032e6e50a0ce1adc3cc5c3a51621361a4591267e5",
    virtualLongTokenId: "0x3c48977e4fc47fa4616e13af7ceb68b0d545dce7b1fb9ec7b85bb6e00870a051",
    virtualShortTokenId: "0x0000000000000000000000000000000000000000000000000000000000000000",
  },
  indexToken: {
    name: "XRP",
    symbol: "XRP",
    decimals: 6,
    priceDecimals: 4,
    address: "0xc14e065b0067dE91534e032868f5Ac6ecf2c6868",
    imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png?1605778731",
    coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
    isSynthetic: true,
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0659c4ab6f66def68ad8800000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0659c4ab6f66def68ad8800000",
      },
    },
  },
  swapPath: [],
  initialCollateralTokenAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  initialCollateralToken: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    isStable: true,
    isV1Available: true,
    imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
    explorerUrl: "https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x00",
    },
  },
  targetCollateralToken: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    isStable: true,
    isV1Available: true,
    imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
    explorerUrl: "https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x00",
    },
  },
  initialCollateralDeltaAmount: {
    type: "BigNumber",
    hex: "0x00",
  },
  sizeDeltaUsd: {
    type: "BigNumber",
    hex: "0xf443562cc22c48e5b417d4000000",
  },
  triggerPrice: {
    type: "BigNumber",
    hex: "0x00",
  },
  acceptablePrice: {
    type: "BigNumber",
    hex: "0x00",
  },
  minOutputAmount: {
    type: "BigNumber",
    hex: "0x00",
  },
  orderType: 7,
  orderKey: "0x1be85ec1e321b4c907be1728eebe5e74ad2e1bfa830d51946f11f357827fde83",
  isLong: true,
  reason: null,
  transaction: {
    timestamp: 1695023559,
    hash: "0xe07dc5d9c3ba6e04b68af869b2aaeeb5716ccc54d60c3d3628b7b38ff92b669a",
    __typename: "Transaction",
  },
});

export const liquidationLongXRP = prepare({
  id: "0xe07dc5d9c3ba6e04b68af869b2aaeeb5716ccc54d60c3d3628b7b38ff92b669a:33",
  eventName: "OrderExecuted",
  account: "0x2c3c6d708d54e378f1e1e136a3882976f7855819",
  marketAddress: "0x0CCB4fAa6f1F1B30911619f1184082aB4E25813c",
  marketInfo: {
    marketTokenAddress: "0x0CCB4fAa6f1F1B30911619f1184082aB4E25813c",
    indexTokenAddress: "0xc14e065b0067dE91534e032868f5Ac6ecf2c6868",
    longTokenAddress: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    shortTokenAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    isSameCollaterals: false,
    isSpotOnly: false,
    name: "XRP/USD [WETH-USDC]",
    data: "",
    isDisabled: false,
    longToken: {
      name: "Wrapped Ethereum",
      symbol: "WETH",
      decimals: 18,
      address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      isWrapped: true,
      baseSymbol: "ETH",
      imageUrl: "https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1628852295",
      coingeckoUrl: "https://www.coingecko.com/en/coins/ethereum",
      isV1Available: true,
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x51b4a3fdc660c8259db5b8000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x51b4a3fdc660c8259db5b8000000",
        },
      },
      balance: {
        type: "BigNumber",
        hex: "0x00",
      },
    },
    shortToken: {
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      isStable: true,
      isV1Available: true,
      imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
      coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
      explorerUrl: "https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x0c9f2c9cd04674edea40000000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x0c9f2c9cd04674edea40000000",
        },
      },
      balance: {
        type: "BigNumber",
        hex: "0x00",
      },
    },
    indexToken: {
      name: "XRP",
      symbol: "XRP",
      decimals: 6,
      priceDecimals: 4,
      address: "0xc14e065b0067dE91534e032868f5Ac6ecf2c6868",
      imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png?1605778731",
      coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
      isSynthetic: true,
      prices: {
        minPrice: {
          type: "BigNumber",
          hex: "0x0659c4ab6f66def68ad8800000",
        },
        maxPrice: {
          type: "BigNumber",
          hex: "0x0659c4ab6f66def68ad8800000",
        },
      },
    },
    longInterestUsd: {
      type: "BigNumber",
      hex: "0x086bbde568f90f250a07ed89db3900",
    },
    shortInterestUsd: {
      type: "BigNumber",
      hex: "0x029ad80eb02845992d0f722667b62c",
    },
    longInterestInTokens: {
      type: "BigNumber",
      hex: "0x14ffbd41ef",
    },
    shortInterestInTokens: {
      type: "BigNumber",
      hex: "0x06392f706c",
    },
    longPoolAmount: {
      type: "BigNumber",
      hex: "0x03d8bf488263d07652",
    },
    shortPoolAmount: {
      type: "BigNumber",
      hex: "0x0d64950b21",
    },
    maxLongPoolAmount: {
      type: "BigNumber",
      hex: "0x1b1ae4d6e2ef500000",
    },
    maxShortPoolAmount: {
      type: "BigNumber",
      hex: "0xe8d4a51000",
    },
    longPoolAmountAdjustment: {
      type: "BigNumber",
      hex: "0x00",
    },
    shortPoolAmountAdjustment: {
      type: "BigNumber",
      hex: "0x00",
    },
    poolValueMin: {
      type: "BigNumber",
      hex: "0x2155d4f1887110678316d6b09d5304",
    },
    poolValueMax: {
      type: "BigNumber",
      hex: "0x2155d4f1887110678316d6b09d5304",
    },
    reserveFactorLong: {
      type: "BigNumber",
      hex: "0x08d5d26dc4fe1ea68a60000000",
    },
    reserveFactorShort: {
      type: "BigNumber",
      hex: "0x08d5d26dc4fe1ea68a60000000",
    },
    openInterestReserveFactorLong: {
      type: "BigNumber",
      hex: "0x064f964e68233a76f520000000",
    },
    openInterestReserveFactorShort: {
      type: "BigNumber",
      hex: "0x064f964e68233a76f520000000",
    },
    totalBorrowingFees: {
      type: "BigNumber",
      hex: "0x04c3239be5da8c48fae025d66b39",
    },
    positionImpactPoolAmount: {
      type: "BigNumber",
      hex: "0x2a28bab3",
    },
    swapImpactPoolAmountLong: {
      type: "BigNumber",
      hex: "0x3111f82c33a4a9",
    },
    swapImpactPoolAmountShort: {
      type: "BigNumber",
      hex: "0x3bce34",
    },
    borrowingFactorLong: {
      type: "BigNumber",
      hex: "0x032d26d12e980b600000",
    },
    borrowingFactorShort: {
      type: "BigNumber",
      hex: "0x032d26d12e980b600000",
    },
    borrowingExponentFactorLong: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    borrowingExponentFactorShort: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    fundingFactor: {
      type: "BigNumber",
      hex: "0x043c33c1937564800000",
    },
    fundingExponentFactor: {
      type: "BigNumber",
      hex: "0x0c9f2c9cd04674edea40000000",
    },
    pnlLongMax: {
      type: "BigNumber",
      hex: "0x519f7d5c9b1e829892a22232c700",
    },
    pnlLongMin: {
      type: "BigNumber",
      hex: "0x519f7d5c9b1e829892a22232c700",
    },
    pnlShortMax: {
      type: "BigNumber",
      hex: "0x03c3fb5d86a80ab621deb5cfb62c",
    },
    pnlShortMin: {
      type: "BigNumber",
      hex: "0x03c3fb5d86a80ab621deb5cfb62c",
    },
    netPnlMax: {
      type: "BigNumber",
      hex: "0x556378ba21c68d4eb480d8027d2c",
    },
    netPnlMin: {
      type: "BigNumber",
      hex: "0x556378ba21c68d4eb480d8027d2c",
    },
    maxPnlFactorForTradersLong: {
      type: "BigNumber",
      hex: "0x064f964e68233a76f520000000",
    },
    maxPnlFactorForTradersShort: {
      type: "BigNumber",
      hex: "0x064f964e68233a76f520000000",
    },
    minCollateralFactor: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    minCollateralFactorForOpenInterestLong: {
      type: "BigNumber",
      hex: "0x6c6b935b8bbd400000",
    },
    minCollateralFactorForOpenInterestShort: {
      type: "BigNumber",
      hex: "0x6c6b935b8bbd400000",
    },
    claimableFundingAmountLong: {
      type: "BigNumber",
      hex: "0x00",
    },
    claimableFundingAmountShort: {
      type: "BigNumber",
      hex: "0x00",
    },
    positionFeeFactorForPositiveImpact: {
      type: "BigNumber",
      hex: "0x019d971e4fe8401e74000000",
    },
    positionFeeFactorForNegativeImpact: {
      type: "BigNumber",
      hex: "0x024306c4097859c43c000000",
    },
    positionImpactFactorPositive: {
      type: "BigNumber",
      hex: "0xd8d726b7177a800000",
    },
    positionImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x01b1ae4d6e2ef5000000",
    },
    maxPositionImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    maxPositionImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    maxPositionImpactFactorForLiquidations: {
      type: "BigNumber",
      hex: "0x204fce5e3e25026110000000",
    },
    positionImpactExponentFactor: {
      type: "BigNumber",
      hex: "0x193e5939a08ce9dbd480000000",
    },
    swapFeeFactorForPositiveImpact: {
      type: "BigNumber",
      hex: "0x019d971e4fe8401e74000000",
    },
    swapFeeFactorForNegativeImpact: {
      type: "BigNumber",
      hex: "0x024306c4097859c43c000000",
    },
    swapImpactFactorPositive: {
      type: "BigNumber",
      hex: "0x010f0cf064dd59200000",
    },
    swapImpactFactorNegative: {
      type: "BigNumber",
      hex: "0x010f0cf064dd59200000",
    },
    swapImpactExponentFactor: {
      type: "BigNumber",
      hex: "0x193e5939a08ce9dbd480000000",
    },
    borrowingFactorPerSecondForLongs: {
      type: "BigNumber",
      hex: "0x0139cc9973549c6b9a30",
    },
    borrowingFactorPerSecondForShorts: {
      type: "BigNumber",
      hex: "0x00",
    },
    fundingFactorPerSecond: {
      type: "BigNumber",
      hex: "0x023be9120a4b0820aeeb",
    },
    longsPayShorts: true,
    virtualPoolAmountForLongToken: {
      type: "BigNumber",
      hex: "0x03d8bf488263d07652",
    },
    virtualPoolAmountForShortToken: {
      type: "BigNumber",
      hex: "0x0d64950b21",
    },
    virtualInventoryForPositions: {
      type: "BigNumber",
      hex: "-0x05d0e5d6b8d0c98bdcf87b637382d4",
    },
    virtualMarketId: "0x4cdf047af6bcf090983ce57032e6e50a0ce1adc3cc5c3a51621361a4591267e5",
    virtualLongTokenId: "0x3c48977e4fc47fa4616e13af7ceb68b0d545dce7b1fb9ec7b85bb6e00870a051",
    virtualShortTokenId: "0x0000000000000000000000000000000000000000000000000000000000000000",
  },
  indexToken: {
    name: "XRP",
    symbol: "XRP",
    decimals: 6,
    priceDecimals: 4,
    address: "0xc14e065b0067dE91534e032868f5Ac6ecf2c6868",
    imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png?1605778731",
    coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
    isSynthetic: true,
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0659c4ab6f66def68ad8800000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0659c4ab6f66def68ad8800000",
      },
    },
  },
  swapPath: [],
  initialCollateralTokenAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  initialCollateralToken: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    isStable: true,
    isV1Available: true,
    imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
    explorerUrl: "https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x00",
    },
  },
  targetCollateralToken: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    isStable: true,
    isV1Available: true,
    imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
    explorerUrl: "https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    prices: {
      minPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
      maxPrice: {
        type: "BigNumber",
        hex: "0x0c9f2c9cd04674edea40000000",
      },
    },
    balance: {
      type: "BigNumber",
      hex: "0x00",
    },
  },
  initialCollateralDeltaAmount: {
    type: "BigNumber",
    hex: "0x05f0e721",
  },
  sizeDeltaUsd: {
    type: "BigNumber",
    hex: "0xf443562cc22c48e5b417d4000000",
  },
  triggerPrice: {
    type: "BigNumber",
    hex: "0x00",
  },
  acceptablePrice: {
    type: "BigNumber",
    hex: "0x00",
  },
  executionPrice: {
    type: "BigNumber",
    hex: "0x06330ca4e769a916f56d167340",
  },
  minOutputAmount: {
    type: "BigNumber",
    hex: "0x00",
  },
  collateralTokenPriceMax: {
    type: "BigNumber",
    hex: "0x0c9f2c9cd04674edea40000000",
  },
  collateralTokenPriceMin: {
    type: "BigNumber",
    hex: "0x0c9f22a95cab20f5969d400000",
  },
  indexTokenPriceMin: {
    type: "BigNumber",
    hex: "0x67fbb9d1110f81970000",
  },
  indexTokenPriceMax: {
    type: "BigNumber",
    hex: "0x67fbb9d1110f81970000",
  },
  orderType: 7,
  orderKey: "0x1be85ec1e321b4c907be1728eebe5e74ad2e1bfa830d51946f11f357827fde83",
  isLong: true,
  priceImpactDiffUsd: {
    type: "BigNumber",
    hex: "0x00",
  },
  positionFeeAmount: {
    type: "BigNumber",
    hex: "0x25cc5f",
  },
  borrowingFeeAmount: {
    type: "BigNumber",
    hex: "0x0343e7",
  },
  fundingFeeAmount: {
    type: "BigNumber",
    hex: "0x056c1a",
  },
  reason: null,
  transaction: {
    timestamp: 1695023559,
    hash: "0xe07dc5d9c3ba6e04b68af869b2aaeeb5716ccc54d60c3d3628b7b38ff92b669a",
    __typename: "Transaction",
  },
});
