import { MarketInfo, getPoolUsd } from "domain/synthetics/markets";
import { TokenData, convertToTokenAmount, convertToUsd } from "domain/synthetics/tokens";
import { BigNumber } from "ethers";
import { applyFactor } from "lib/numbers";
import { WithdrawalAmounts } from "../types";

export function getNextWithdrawalAmountsByMarketToken(p: {
  marketInfo: MarketInfo;
  marketToken: TokenData;
  longToken: TokenData;
  shortToken: TokenData;
  marketTokenAmount: BigNumber;
}): WithdrawalAmounts | undefined {
  const longPoolUsd = getPoolUsd(p.marketInfo, p.marketInfo.longTokenAddress, "maxPrice");
  const shortPoolUsd = getPoolUsd(p.marketInfo, p.marketInfo.shortTokenAddress, "maxPrice");

  if (!longPoolUsd || !shortPoolUsd || !p.marketToken.prices || !p.longToken.prices || !p.shortToken.prices) {
    return undefined;
  }

  const totalPoolsUsd = longPoolUsd.add(shortPoolUsd);

  if (!totalPoolsUsd.gt(0)) {
    return undefined;
  }

  const marketTokenAmount = p.marketTokenAmount;
  const marketTokenUsd = convertToUsd(marketTokenAmount, p.marketToken.decimals, p.marketToken.prices.minPrice)!;

  let longTokenUsd = marketTokenUsd.mul(longPoolUsd).div(totalPoolsUsd);
  let shortTokenUsd = marketTokenUsd.mul(shortPoolUsd).div(totalPoolsUsd);

  const longSwapFeeUsd = applyFactor(longTokenUsd, p.marketInfo.swapFeeFactor);
  const shortSwapFeeUsd = applyFactor(shortTokenUsd, p.marketInfo.swapFeeFactor);
  const swapFeeUsd = longSwapFeeUsd.add(shortSwapFeeUsd);

  longTokenUsd = longTokenUsd.sub(longSwapFeeUsd);
  shortTokenUsd = shortTokenUsd.sub(shortSwapFeeUsd);

  const longTokenAmount = convertToTokenAmount(longTokenUsd, p.longToken.decimals, p.longToken.prices.maxPrice)!;
  const shortTokenAmount = convertToTokenAmount(shortTokenUsd, p.shortToken.decimals, p.shortToken.prices.maxPrice)!;

  return {
    marketTokenAmount,
    marketTokenUsd,
    longTokenAmount,
    longTokenUsd,
    shortTokenAmount,
    shortTokenUsd,
    swapFeeUsd,
  };
}

export function getNextWithdrawalAmountsByCollaterals(p: {
  marketInfo: MarketInfo;
  marketToken: TokenData;
  longToken: TokenData;
  shortToken: TokenData;
  longTokenAmount?: BigNumber;
  shortTokenAmount?: BigNumber;
}): WithdrawalAmounts | undefined {
  const longPoolUsd = getPoolUsd(p.marketInfo, p.marketInfo.longTokenAddress, "maxPrice");

  const shortPoolUsd = getPoolUsd(p.marketInfo, p.marketInfo.shortTokenAddress, "maxPrice");

  if (
    !longPoolUsd ||
    !shortPoolUsd ||
    !p.marketToken.prices ||
    !p.longToken.prices ||
    !p.shortToken.prices ||
    (!p.longTokenAmount && !p.shortTokenAmount)
  ) {
    return undefined;
  }

  let longTokenAmount: BigNumber;
  let shortTokenAmount: BigNumber;
  let longTokenUsd: BigNumber;
  let shortTokenUsd: BigNumber;

  if (p.longTokenAmount) {
    longTokenAmount = p.longTokenAmount;
    longTokenUsd = convertToUsd(longTokenAmount, p.longToken.decimals, p.longToken.prices.maxPrice)!;
    shortTokenUsd = longTokenUsd.mul(shortPoolUsd).div(longPoolUsd);
    shortTokenAmount = convertToTokenAmount(shortTokenUsd, p.shortToken.decimals, p.shortToken.prices.maxPrice)!;
  } else {
    shortTokenAmount = p.shortTokenAmount!;
    shortTokenUsd = convertToUsd(p.shortTokenAmount, p.shortToken.decimals, p.shortToken.prices.maxPrice)!;
    longTokenUsd = shortTokenUsd.mul(longPoolUsd).div(shortPoolUsd);
    longTokenAmount = convertToTokenAmount(longTokenUsd, p.longToken.decimals, p.longToken.prices.maxPrice)!;
  }

  let marketTokenUsd = longTokenUsd.add(shortTokenUsd);

  const swapFeeUsd = applyFactor(marketTokenUsd, p.marketInfo.swapFeeFactor);

  marketTokenUsd = marketTokenUsd.sub(swapFeeUsd);

  const marketTokenAmount = convertToTokenAmount(
    marketTokenUsd,
    p.marketToken.decimals,
    p.marketToken.prices.minPrice
  )!;

  return {
    marketTokenAmount,
    marketTokenUsd,
    longTokenAmount,
    longTokenUsd,
    shortTokenAmount,
    shortTokenUsd,
    swapFeeUsd,
  };
}
