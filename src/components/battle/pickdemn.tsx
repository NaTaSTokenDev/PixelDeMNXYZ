
//  unused?

import { TezosToolkit, WalletContract } from "@taquito/taquito";
import React, { useState } from "react";

const PickDeMN = ({
  Tezos,
  userAddress,
  wallet,
  pixelDemnName,
}: {
  Tezos: TezosToolkit;
  userAddress: string;
  wallet: any;
  pixelDemnName: any;
}): JSX.Element => {
  const [recipient, setRecipient] = useState<string>("KT1FYct7DUK1mUkk9BPJEg7AeH7Fq3hQ9ah3");
  const [amount, setAmount] = useState<string>("NaTaS Amount");
  const [loading, setLoading] = useState<boolean>(false);

  const demnList = async (): Promise<void> => {
    if (recipient && amount) {
      setLoading(true);
      try {
        Tezos.setWalletProvider(wallet);
        const result = Tezos.wallet.batch()
        const batchOp = await result.send();
        await batchOp;
      } catch (error) {
        console.log(error);
        console.log(pixelDemnName, "pixelDemnName")
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h2>{pixelDemnName.map}</h2>
      <form>
        <select name="inputfield">
          <option value="First DeMN" selected>77777</option>
          <option value="Second DeMN">Second DeMN</option>
        </select>
      </form>

      <button
        className="button-a"
        disabled={!recipient && !amount}
        onClick={demnList}
      >
        {loading ? (
          <span>
            <i className="fas fa-spinner fa-spin"></i>&nbsp; Please wait
          </span>
        ) : (
          <span>
            Coming Soon!
          </span>
        )}
      </button>
    </div>
  );
};

export default PickDeMN;
