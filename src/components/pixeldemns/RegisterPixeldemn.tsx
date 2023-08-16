import { TezosToolkit } from "@taquito/taquito";
import React, { useState } from "react";

const RegisterPixeldemn = ({
  Tezos,
  userAddress,
  wallet,
}: {
  Tezos: TezosToolkit;
  userAddress: string;
  wallet: any;
}): JSX.Element => {
  const [recipient, setRecipient] = useState<string>("KT1Pj9nj41MTeaTkZ31uU164NLnpd9F2dvfp");
  const [amount, setAmount] = useState<string>("NaTaS Amount");
  const [loading, setLoading] = useState<boolean>(false);

  const sendTransfer = async (): Promise<void> => {
    if (recipient && amount) {
      setLoading(true);
      try {
        Tezos.setWalletProvider(wallet);
        const contract = await Tezos.wallet.at("KT1Pj9nj41MTeaTkZ31uU164NLnpd9F2dvfp");
        const result = await Tezos.wallet.batch()
          .withContractCall(contract.methods.default(recipient))
          .send();
        await result.confirmation();

      } catch (error) {
        console.log(error);

      } finally {

        setLoading(false);
      }
    }
  };

  return (
    <div>
      <input
        className="inputfield"
        type="string"
        placeholder="Enter Message"
        onChange={e => setRecipient(e.target.value)}
      />
      <br></br>
      <button
        className="button-a"
        onClick={sendTransfer}
      >
        Post
      </button>

    </div>
  );
};

export default RegisterPixeldemn;

