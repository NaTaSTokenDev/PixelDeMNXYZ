import { TezosToolkit, WalletContract } from "@taquito/taquito";
import React, { useState } from "react";

const MintDeMN = ({
  Tezos,
  userAddress,
  wallet,
}: {
  Tezos: TezosToolkit;
  userAddress: string;
  wallet: any;
}): JSX.Element => {
  const [recipient, setRecipient] = useState<string>("KT1BJC12dG17CVvPKJ1VYaNnaT5mzfnUTwXv");
  const [amount, setAmount] = useState<string>("NaTaS Amount");
  const [loading, setLoading] = useState<boolean>(false);
 
  const sendTransfer = async (): Promise<void> =>  {
    if (recipient && amount)  {
      setLoading(true);
      try {
        Tezos.setWalletProvider(wallet);
        const contract = await Tezos.wallet.at("KT1BJC12dG17CVvPKJ1VYaNnaT5mzfnUTwXv");   
        contract.methods.mint(11139)
        .send({ amount: 2})
      
    // await contract.confirmation();

      } catch (error) {
        console.log(error);
        
      } finally {
     
        setLoading(false);
      }
    }
      };

  return (
    <div> 
      <button
        className="button-a"
        onClick={sendTransfer}
      >
        {loading ? (
          <span>
            <i className="fas fa-spinner fa-spin"></i>&nbsp; Please wait
          </span>
        ) : (
          <span>
            Mint PixelDeMN
          </span>
        )}
      </button>
    </div>
  );
};

export default MintDeMN;

