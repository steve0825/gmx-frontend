import { BigNumber } from "ethers";
import { hashString, hashData } from "lib/hash";

export const POSITION_IMPACT_FACTOR_KEY = hashString("POSITION_IMPACT_FACTOR");

export const MAX_POSITION_IMPACT_FACTOR_KEY = hashString("MAX_POSITION_IMPACT_FACTOR");

export const POSITION_IMPACT_EXPONENT_FACTOR_KEY = hashString("POSITION_IMPACT_EXPONENT_FACTOR");

export const POSITION_FEE_FACTOR_KEY = hashString("POSITION_FEE_FACTOR");

export const SWAP_IMPACT_FACTOR_KEY = hashString("SWAP_IMPACT_FACTOR");

export const SWAP_IMPACT_EXPONENT_FACTOR_KEY = hashString("SWAP_IMPACT_EXPONENT_FACTOR");

export const SWAP_FEE_FACTOR_KEY = hashString("SWAP_FEE_FACTOR");

export const FEE_RECEIVER_DEPOSIT_FACTOR_KEY = hashString("FEE_RECEIVER_DEPOSIT_FACTOR");

export const FEE_RECEIVER_WITHDRAWAL_FACTOR_KEY = hashString("FEE_RECEIVER_WITHDRAWAL_FACTOR");

export const FEE_RECEIVER_SWAP_FACTOR_KEY = hashString("FEE_RECEIVER_SWAP_FACTOR");

export const FEE_RECEIVER_POSITION_FACTOR_KEY = hashString("FEE_RECEIVER_POSITION_FACTOR");

export const OPEN_INTEREST_KEY = hashString("OPEN_INTEREST");

export const OPEN_INTEREST_IN_TOKENS_KEY = hashString("OPEN_INTEREST_IN_TOKENS");

export const POOL_AMOUNT_KEY = hashString("POOL_AMOUNT");

export const RESERVE_FACTOR_KEY = hashString("RESERVE_FACTOR");

export const NONCE_KEY = hashString("NONCE");

export const BORROWING_FACTOR_KEY = hashString("BORROWING_FACTOR");

export const TOTAL_BORROWING_KEY = hashString("TOTAL_BORROWING");

export const MAX_PNL_FACTOR_KEY = hashString("MAX_PNL_FACTOR");

export const MAX_PNL_FACTOR_FOR_WITHDRAWALS_KEY = hashString("MAX_PNL_FACTOR_FOR_WITHDRAWALS");

export const MAX_POSITION_IMPACT_FACTOR_FOR_LIQUIDATIONS_KEY = hashString(
  "MAX_POSITION_IMPACT_FACTOR_FOR_LIQUIDATIONS"
);

export const POSITION_IMPACT_POOL_AMOUNT_KEY = hashString("POSITION_IMPACT_POOL_AMOUNT");

export const SWAP_IMPACT_POOL_AMOUNT_KEY = hashString("SWAP_IMPACT_POOL_AMOUNT");

export const CUMULATIVE_BORROWING_FACTOR_KEY = hashString("CUMULATIVE_BORROWING_FACTOR");

export const MIN_COLLATERAL_USD_KEY = hashString("MIN_COLLATERAL_USD");

export const MAX_LEVERAGE_KEY = hashString("MAX_LEVERAGE");

export const DEPOSIT_GAS_LIMIT_KEY = hashString("DEPOSIT_GAS_LIMIT");

export const WITHDRAWAL_GAS_LIMIT_KEY = hashString("WITHDRAWAL_GAS_LIMIT");

export const INCREASE_ORDER_GAS_LIMIT_KEY = hashString("INCREASE_ORDER_GAS_LIMIT");

export const DECREASE_ORDER_GAS_LIMIT_KEY = hashString("DECREASE_ORDER_GAS_LIMIT");

export const SWAP_ORDER_GAS_LIMIT_KEY = hashString("SWAP_ORDER_GAS_LIMIT");

export const SINGLE_SWAP_GAS_LIMIT_KEY = hashString("SINGLE_SWAP_GAS_LIMIT");

export const TOKEN_TRANSFER_GAS_LIMIT_KEY = hashString("TOKEN_TRANSFER_GAS_LIMIT");

export const NATIVE_TOKEN_TRANSFER_GAS_LIMIT_KEY = hashString("NATIVE_TOKEN_TRANSFER_GAS_LIMIT");

export const ESTIMATED_GAS_FEE_BASE_AMOUNT = hashString("ESTIMATED_GAS_FEE_BASE_AMOUNT");

export const ESTIMATED_GAS_FEE_MULTIPLIER_FACTOR = hashString("ESTIMATED_GAS_FEE_MULTIPLIER_FACTOR");

export const MARKET_LIST_KEY = hashString("MARKET_LIST");

export const POSITION_LIST_KEY = hashString("POSITION_LIST");

export const ACCOUNT_POSITION_LIST_KEY = hashString("ACCOUNT_POSITION_LIST");

export const ORDER_LIST_KEY = hashString("ORDER_LIST");

export const ACCOUNT_ORDER_LIST_KEY = hashString("ACCOUNT_ORDER_LIST");

export const CLAIMABLE_FUNDING_AMOUNT = hashString("CLAIMABLE_FUNDING_AMOUNT");

export function positionImpactFactorKey(market: string, isPositive: boolean) {
  return hashData(["bytes32", "address", "bool"], [POSITION_IMPACT_FACTOR_KEY, market, isPositive]);
}

export function positionImpactExponentFactorKey(market: string) {
  return hashData(["bytes32", "address"], [POSITION_IMPACT_EXPONENT_FACTOR_KEY, market]);
}

export function maxPositionImpactFactorKey(market: string, isPositive: boolean) {
  return hashData(["bytes32", "address", "bool"], [MAX_POSITION_IMPACT_FACTOR_KEY, market, isPositive]);
}

export function positionFeeFactorKey(market: string) {
  return hashData(["bytes32", "address"], [POSITION_FEE_FACTOR_KEY, market]);
}

export function swapImpactFactorKey(market: string, isPositive: boolean) {
  return hashData(["bytes32", "address", "bool"], [SWAP_IMPACT_FACTOR_KEY, market, isPositive]);
}

export function swapImpactExponentFactorKey(market: string) {
  return hashData(["bytes32", "address"], [SWAP_IMPACT_EXPONENT_FACTOR_KEY, market]);
}

export function swapFeeFactorKey(market: string) {
  return hashData(["bytes32", "address"], [SWAP_FEE_FACTOR_KEY, market]);
}

export function openInterestKey(market: string, collateralToken: string, isLong: boolean) {
  return hashData(["bytes32", "address", "address", "bool"], [OPEN_INTEREST_KEY, market, collateralToken, isLong]);
}

export function openInterestInTokensKey(market: string, collateralToken: string, isLong: boolean) {
  return hashData(
    ["bytes32", "address", "address", "bool"],
    [OPEN_INTEREST_IN_TOKENS_KEY, market, collateralToken, isLong]
  );
}

export function poolAmountKey(market: string, token: string) {
  return hashData(["bytes32", "address", "address"], [POOL_AMOUNT_KEY, market, token]);
}

export function reserveFactorKey(market: string, isLong: boolean) {
  return hashData(["bytes32", "address", "bool"], [RESERVE_FACTOR_KEY, market, isLong]);
}

export function borrowingFactorKey(market: string, isLong: boolean) {
  return hashData(["bytes32", "address", "bool"], [BORROWING_FACTOR_KEY, market, isLong]);
}

export function cumulativeBorrowingFactorKey(market: string, isLong: boolean) {
  return hashData(["bytes32", "address", "bool"], [CUMULATIVE_BORROWING_FACTOR_KEY, market, isLong]);
}

export function totalBorrowingKey(market: string, isLong: boolean) {
  return hashData(["bytes32", "address", "bool"], [TOTAL_BORROWING_KEY, market, isLong]);
}

export function maxPnlFactorKey(market: string, isLong: boolean) {
  return hashData(["bytes32", "address", "bool"], [MAX_PNL_FACTOR_KEY, market, isLong]);
}

export function maxPnlFactorForWithdrawalsKey(market: string, isLong: boolean) {
  return hashData(["bytes32", "address", "bool"], [MAX_PNL_FACTOR_FOR_WITHDRAWALS_KEY, market, isLong]);
}

export function positionImpactPoolAmountKey(market: string) {
  return hashData(["bytes32", "address"], [POSITION_IMPACT_POOL_AMOUNT_KEY, market]);
}

export function maxPositionImpactFactorForLiquidationsKey(market: string) {
  return hashData(["bytes32", "address"], [MAX_POSITION_IMPACT_FACTOR_FOR_LIQUIDATIONS_KEY, market]);
}

export function swapImpactPoolAmountKey(market: string, token: string) {
  return hashData(["bytes32", "address", "address"], [SWAP_IMPACT_POOL_AMOUNT_KEY, market, token]);
}

export function orderKey(dataStoreAddress: string, nonce: BigNumber) {
  return hashData(["address", "uint256"], [dataStoreAddress, nonce]);
}

export function depositGasLimitKey(singleToken: boolean) {
  return hashData(["bytes32", "bool"], [DEPOSIT_GAS_LIMIT_KEY, singleToken]);
}

export function withdrawalGasLimitKey(singleToken: boolean) {
  return hashData(["bytes32", "bool"], [WITHDRAWAL_GAS_LIMIT_KEY, singleToken]);
}

export function singleSwapGasLimitKey() {
  return hashData(["bytes32"], [SINGLE_SWAP_GAS_LIMIT_KEY]);
}

export function increaseOrderGasLimitKey() {
  return hashData(["bytes32"], [INCREASE_ORDER_GAS_LIMIT_KEY]);
}

export function decreaseOrderGasLimitKey() {
  return hashData(["bytes32"], [DECREASE_ORDER_GAS_LIMIT_KEY]);
}

export function swapOrderGasLimitKey() {
  return hashData(["bytes32"], [SWAP_ORDER_GAS_LIMIT_KEY]);
}

export function accountOrderListKey(account: string) {
  return hashData(["bytes32", "address"], [ACCOUNT_ORDER_LIST_KEY, account]);
}

export function accountPositionListKey(account: string) {
  return hashData(["bytes32", "address"], [ACCOUNT_POSITION_LIST_KEY, account]);
}

export function hashedPositionKey(account: string, market: string, collateralToken: string, isLong: boolean) {
  return hashData(["address", "address", "address", "bool"], [account, market, collateralToken, isLong]);
}

export function claimableFundingAmountKey(market: string, token: string, account: string) {
  return hashData(["bytes32", "address", "address", "address"], [CLAIMABLE_FUNDING_AMOUNT, market, token, account]);
}
