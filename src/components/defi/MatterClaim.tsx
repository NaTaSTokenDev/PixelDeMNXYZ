import { TezosToolkit, WalletContract } from "@taquito/taquito";
import React, { Dispatch, SetStateAction, useState } from "react";


const MatterClaim = ({
  Tezos,
  userAddress,
  wallet,
}: {
  Tezos: TezosToolkit;
  userAddress: string;
  wallet: any;
}): JSX.Element => {
  const [recipient, setRecipient] = useState<string>("KT1FYct7DUK1mUkk9BPJEg7AeH7Fq3hQ9ah3");
  const [amount, setAmount] = useState<string>("10");
  const [loading, setLoading] = useState<boolean>(false);
  const transfer_params = [
    {
        "prim": "Pair",
        "args": [
        {
        "int": "10"
        },
        {
        "int": "25"
        }
        ]
        }
  ]
  const sendTransfer = async (): Promise<void> =>  {
    if (recipient && amount)  {
      setLoading(true);
      try {
        const op = Tezos.wallet
        Tezos.setWalletProvider(wallet);
        const address = userAddress; 
        const contract = await Tezos.wallet.at(
         "KT1FYct7DUK1mUkk9BPJEg7AeH7Fq3hQ9ah3"
         );
        const result = await contract.methods
        .claim(25).send();
        await result;
      } catch (error) {
        console.log(error);
        
      } finally {
     
        setLoading(false);
      }
    }
      };

  return (
     
    <button
        className="button-a"
        disabled={!recipient && !amount}  
        onClick={()=>{sendTransfer()}}
      >
        {loading ? (
          <span>
            <i className="fas fa-spinner fa-spin"></i>&nbsp; Processing
          </span>
        ) : (
          <span>
            Claim
          </span>
        )}
      </button>
  );
};

export default MatterClaim;
