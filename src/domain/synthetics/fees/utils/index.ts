import { HIGH_PRICE_IMPACT_BPS } from "config/factors";
import { MarketInfo } from "domain/synthetics/markets";
import { BigNumber } from "ethers";
import { applyFactor, getBasisPoints } from "lib/numbers";
import { FeeItem } from "../types";
import { PRECISION } from "lib/legacy";

export * from "./executionFee";
export * from "./priceImpact";

export function getPositionFee(
  marketInfo: MarketInfo,
  sizeDeltaUsd: BigNumber,
  referralInfo: { totalRebateFactor: BigNumber; discountFactor: BigNumber } | undefined
) {
  let positionFeeUsd = applyFactor(sizeDeltaUsd, marketInfo.positionFeeFactor);

  if (!referralInfo) {
    return { positionFeeUsd, discountUsd: BigNumber.from(0), totalRebateUsd: BigNumber.from(0) };
  }

  const totalRebateUsd = applyFactor(positionFeeUsd, referralInfo.totalRebateFactor);
  const discountUsd = applyFactor(totalRebateUsd, referralInfo.discountFactor);

  positionFeeUsd = positionFeeUsd.sub(discountUsd);

  return {
    positionFeeUsd,
    discountUsd,
    totalRebateUsd,
  };
}

export function getFundingFactorPerPeriod(marketInfo: MarketInfo, isLong: boolean, periodInSeconds: number) {
  const { fundingFactorPerSecond, longsPayShorts, longInterestUsd, shortInterestUsd } = marketInfo;

  const isLargerSide = isLong ? longsPayShorts : !longsPayShorts;

  let factorPerSecond;

  if (isLargerSide) {
    factorPerSecond = fundingFactorPerSecond.mul(-1);
  } else {
    const largerInterestUsd = longsPayShorts ? longInterestUsd : shortInterestUsd;
    const smallerInterestUsd = longsPayShorts ? shortInterestUsd : longInterestUsd;

    const ratio = smallerInterestUsd.gt(0)
      ? largerInterestUsd.mul(PRECISION).div(smallerInterestUsd)
      : BigNumber.from(0);

    factorPerSecond = applyFactor(ratio, fundingFactorPerSecond);
  }

  return factorPerSecond.mul(periodInSeconds);
}

export function getFundingFeeRateUsd(
  marketInfo: MarketInfo,
  isLong: boolean,
  sizeInUsd: BigNumber,
  periodInSeconds: number
) {
  const factor = getFundingFactorPerPeriod(marketInfo, isLong, periodInSeconds);

  return applyFactor(sizeInUsd, factor);
}

export function getBorrowingFactorPerPeriod(marketInfo: MarketInfo, isLong: boolean, periodInSeconds: number) {
  const factorPerSecond = isLong
    ? marketInfo.borrowingFactorPerSecondForLongs
    : marketInfo.borrowingFactorPerSecondForShorts;

  return factorPerSecond.mul(periodInSeconds || 1);
}

export function getBorrowingFeeRateUsd(
  marketInfo: MarketInfo,
  isLong: boolean,
  sizeInUsd: BigNumber,
  periodInSeconds: number
) {
  const factor = getBorrowingFactorPerPeriod(marketInfo, isLong, periodInSeconds);

  return applyFactor(sizeInUsd, factor);
}

export function getIsHighPriceImpact(priceImpact?: FeeItem) {
  return priceImpact?.deltaUsd.lt(0) && priceImpact.bps.abs().gte(HIGH_PRICE_IMPACT_BPS);
}

export function getFeeItem(feeDeltaUsd?: BigNumber, basis?: BigNumber): FeeItem | undefined {
  if (!feeDeltaUsd || !basis?.gt(0)) return undefined;

  return {
    deltaUsd: feeDeltaUsd,
    bps: getBasisPoints(feeDeltaUsd, basis),
  };
}

export function getTotalFeeItem(feeItems: (FeeItem | undefined)[]): FeeItem {
  const totalFeeItem: FeeItem = {
    deltaUsd: BigNumber.from(0),
    bps: BigNumber.from(0),
  };

  (feeItems.filter(Boolean) as FeeItem[]).forEach((feeItem) => {
    totalFeeItem.deltaUsd = totalFeeItem.deltaUsd.add(feeItem.deltaUsd);
    totalFeeItem.bps = totalFeeItem.bps.add(feeItem.bps);
  });

  return totalFeeItem;
}
