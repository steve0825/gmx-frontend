import { BigNumber, ethers } from "ethers";
import { getProvider } from "lib/rpc";

export async function withdrawFromSubaccount({
  chainId,
  subaccountPrivateKey,
  mainAccountAddress,
}: {
  chainId: number;
  subaccountPrivateKey: string;
  mainAccountAddress: string;
}) {
  const provider = getProvider(undefined, chainId);
  const wallet = new ethers.Wallet(subaccountPrivateKey, provider);
  const [value, gasPrice] = await Promise.all([wallet.getBalance(), provider.getGasPrice()]);
  const gasLimit = 21000;
  const approxAmountToSend = value.sub(gasPrice.mul(gasLimit));

  if (approxAmountToSend.lt(0)) {
    throw new Error("Insufficient funds to cover gas cost.");
  }

  const estimatedGas = (
    (await wallet.estimateGas({
      to: mainAccountAddress,
      value,
    })) as BigNumber
  )
    .mul(100)
    .div(95);

  const gasCost = estimatedGas.mul(gasPrice);
  const amountToSend = value.sub(gasCost);

  if (amountToSend.lt(0)) {
    throw new Error("Insufficient funds to cover gas cost.");
  }

  const signedTransaction = await wallet.sendTransaction({
    to: mainAccountAddress,
    value: amountToSend,
    gasLimit: estimatedGas,
    gasPrice,
    nonce: await wallet.getTransactionCount(),
  });

  return signedTransaction.wait();
}
