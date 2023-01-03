import { Web3Provider } from "@ethersproject/providers";
import { t } from "@lingui/macro";
import ExchangeRouter from "abis/ExchangeRouter.json";
import { getContract } from "config/contracts";
import { NATIVE_TOKEN_ADDRESS, getConvertedTokenAddress, getToken } from "config/tokens";
import { encodeReferralCode } from "domain/referrals";
import { BigNumber, ethers } from "ethers";
import { callContract } from "lib/contracts";
import { TokensData, convertToContractPrice, formatUsdAmount } from "../tokens";
import { OrderType } from "./types";
import { isDevelopment } from "config/env";
import { simulateExecuteOrderTxn } from "./simulateExecuteOrderTxn";

const { AddressZero } = ethers.constants;

export type DecreaseOrderParams = {
  account: string;
  executionFee: BigNumber;
  referralCode?: string;
  tokensData: TokensData;
  market: string;
  swapPath: string[];
  initialCollateralAddress: string;
  initialCollateralAmount?: BigNumber;
  indexTokenAddress: string;
  receiveTokenAddress: string;
  triggerPrice?: BigNumber;
  acceptablePrice: BigNumber;
  sizeDeltaUsd: BigNumber;
  minOutputAmount: BigNumber;
  isLong: boolean;
  orderType: OrderType.MarketDecrease | OrderType.LimitDecrease | OrderType.StopLossDecrease;
};

export async function createDecreaseOrderTxn(chainId: number, library: Web3Provider, p: DecreaseOrderParams) {
  const exchangeRouter = new ethers.Contract(
    getContract(chainId, "ExchangeRouter"),
    ExchangeRouter.abi,
    library.getSigner()
  );

  const orderStoreAddress = getContract(chainId, "OrderStore");

  const isNativeReceive = p.receiveTokenAddress === NATIVE_TOKEN_ADDRESS;

  const indexToken = getToken(chainId, p.indexTokenAddress);

  const wntAmount = p.executionFee;

  const multicall = [
    { method: "sendWnt", params: [orderStoreAddress, wntAmount] },

    {
      method: "createOrder",
      params: [
        {
          addresses: {
            receiver: p.account,
            initialCollateralToken: getConvertedTokenAddress(chainId, p.initialCollateralAddress, "wrapped"),
            callbackContract: AddressZero,
            market: p.market,
            swapPath: p.swapPath,
          },
          numbers: {
            sizeDeltaUsd: p.sizeDeltaUsd,
            triggerPrice: convertToContractPrice(p.triggerPrice || BigNumber.from(0), indexToken.decimals),
            acceptablePrice: convertToContractPrice(p.acceptablePrice, indexToken.decimals),
            executionFee: p.executionFee,
            callbackGasLimit: BigNumber.from(0),
            minOutputAmount: p.minOutputAmount,
          },
          orderType: p.orderType,
          isLong: p.isLong,
          shouldUnwrapNativeToken: isNativeReceive,
        },
        encodeReferralCode(p.referralCode || ""),
      ],
    },
  ];

  if (isDevelopment()) {
    // eslint-disable-next-line no-console
    console.debug("positionDecreaseTxn multicall", multicall);
  }

  const encodedPayload = multicall
    .filter(Boolean)
    .map((call) => exchangeRouter.interface.encodeFunctionData(call!.method, call!.params));

  const longText = p.isLong ? t`Long` : t`Short`;

  const orderLabel = t`Decrease ${longText} ${indexToken.symbol} by ${formatUsdAmount(p.sizeDeltaUsd)}`;

  await simulateExecuteOrderTxn(chainId, library, {
    primaryPricesMap: {},
    secondaryPricesMap: {},
    createOrderMulticallPayload: encodedPayload,
    value: wntAmount,
    tokensData: p.tokensData,
  });

  return callContract(chainId, exchangeRouter, "multicall", [encodedPayload], {
    value: wntAmount,
    sentMsg: t`${orderLabel} order sent`,
    successMsg: t`${orderLabel} order created`,
    failMsg: t`${orderLabel} order failed`,
  });
}
