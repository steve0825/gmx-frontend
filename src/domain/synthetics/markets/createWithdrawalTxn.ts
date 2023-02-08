import { Web3Provider } from "@ethersproject/providers";
import { t } from "@lingui/macro";
import { getContract } from "config/contracts";
import { BigNumber, ethers } from "ethers";
import ExchangeRouter from "abis/ExchangeRouter.json";
import { callContract } from "lib/contracts";
import { isAddressZero } from "lib/legacy";

type Params = {
  account: string;
  longTokenAddress: string;
  shortTokenAddress: string;
  marketTokenAddress: string;
  marketLongAmount?: BigNumber;
  marketShortAmount?: BigNumber;
  minLongTokenAmount?: BigNumber;
  minShortTokenAmount?: BigNumber;
  executionFee: BigNumber;
};

export function createWithdrawalTxn(chainId: number, library: Web3Provider, p: Params) {
  const contract = new ethers.Contract(getContract(chainId, "ExchangeRouter"), ExchangeRouter.abi, library.getSigner());
  const withdrawalVaultAddress = getContract(chainId, "WithdrawalVault");

  const isNativeWithdrawal = Boolean(isAddressZero(p.longTokenAddress) && p.marketLongAmount?.gt(0));

  const wntAmount = p.executionFee;

  const multicall = [
    contract.interface.encodeFunctionData("sendWnt", [withdrawalVaultAddress, wntAmount]),
    contract.interface.encodeFunctionData("createWithdrawal", [
      {
        receiver: p.account,
        callbackContract: ethers.constants.AddressZero,
        market: p.marketTokenAddress,
        initialLongToken: p.longTokenAddress,
        initialShortToken: p.shortTokenAddress,
        longTokenSwapPath: [],
        shortTokenSwapPath: [],
        marketTokenAmount: BigNumber.from(0)
          .add(p.marketLongAmount || 0)
          .add(p.marketShortAmount || 0),
        minLongTokenAmount: p.minLongTokenAmount?.div(2) || BigNumber.from(0),
        minShortTokenAmount: p.minShortTokenAmount?.div(2) || BigNumber.from(0),
        shouldUnwrapNativeToken: isNativeWithdrawal,
        executionFee: p.executionFee,
        callbackGasLimit: BigNumber.from(0),
      },
    ]),
  ];

  return callContract(chainId, contract, "multicall", [multicall], {
    value: wntAmount,
    sentMsg: t`Withdrawal order sent`,
    successMsg: t`Success withdrawal order`,
    failMsg: t`Withdrawal order failed`,
  });
}
