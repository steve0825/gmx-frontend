import { BigNumber } from "ethers";
import { Market } from "domain/synthetics/markets";
import { TokenData } from "../tokens";

export enum OrderType {
  // the order will be cancelled if the minOutputAmount cannot be fulfilled
  MarketSwap = 0,
  // @dev LimitSwap: swap token A to token B if the minOutputAmount can be fulfilled
  LimitSwap = 1,
  // @dev MarketIncrease: increase position at the current market price
  // the order will be cancelled if the position cannot be increased at the acceptablePrice
  MarketIncrease = 2,
  // @dev LimitIncrease: increase position if the triggerPrice is reached and the acceptablePrice can be fulfilled
  LimitIncrease = 3,
  // @dev MarketDecrease: decrease position at the curent market price
  // the order will be cancelled if the position cannot be decreased at the acceptablePrice
  MarketDecrease = 4,
  // @dev LimitDecrease: decrease position if the triggerPrice is reached and the acceptablePrice can be fulfilled
  LimitDecrease = 5,
  // @dev StopLossDecrease: decrease position if the triggerPrice is reached and the acceptablePrice can be fulfilled
  StopLossDecrease = 6,
  // @dev Liquidation: allows liquidation of positions if the criteria for liquidation are met
  Liquidation = 7,
}

export enum DecreasePositionSwapType {
  NoSwap = 0,
  SwapPnlTokenToCollateralToken = 1,
  SwapCollateralTokenToPnlToken = 2,
}

export type RawContractOrder = {
  addresses: {
    account: string;
    receiver: string;
    callbackContract: string;
    market: string;
    initialCollateralToken: string;
    swapPath: string[];
  };
  numbers: {
    sizeDeltaUsd: BigNumber;
    initialCollateralDeltaAmount: BigNumber;
    triggerPrice: BigNumber;
    acceptablePrice: BigNumber;
    executionFee: BigNumber;
    callbackGasLimit: BigNumber;
    minOutputAmount: BigNumber;
    updatedAtBlock: BigNumber;
  };
  flags: {
    orderType: OrderType;
    isLong: boolean;
    shouldUnwrapNativeToken: boolean;
    isFrozen: boolean;
  };
  data: string;
};

export type Order = {
  key: string;
  account: string;
  callbackContract: string;
  initialCollateralTokenAddress: string;
  marketAddress: string;
  decreasePositionSwapType: DecreasePositionSwapType;
  receiver: string;
  swapPath: string[];
  contractAcceptablePrice: BigNumber;
  contractTriggerPrice: BigNumber;
  callbackGasLimit: BigNumber;
  executionFee: BigNumber;
  initialCollateralDeltaAmount: BigNumber;
  minOutputAmount: BigNumber;
  sizeDeltaUsd: BigNumber;
  updatedAtBlock: BigNumber;
  isFrozen: boolean;
  isLong: boolean;
  orderType: OrderType;
  shouldUnwrapNativeToken: boolean;
  data: string;
};

export type AggregatedOrderData = Order & {
  title?: string;
  triggerPrice?: BigNumber;
  acceptablePrice?: BigNumber;
  market?: Market;
  marketName?: string;
  indexToken?: TokenData;
  initialCollateralToken?: TokenData;
  toCollateralToken?: TokenData;
};

export type OrdersData = {
  [orderKey: string]: Order;
};

export type AggregatedOrdersData = {
  [orderKey: string]: AggregatedOrderData;
};
