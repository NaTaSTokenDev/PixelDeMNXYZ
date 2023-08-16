import { TezosToolkit, WalletContract } from "@taquito/taquito";
import React, { useState } from "react";

const MatterStake = ({
  Tezos,
  userAddress,
  wallet,
}: {
  Tezos: TezosToolkit;
  userAddress: string;
  wallet: any;
}): JSX.Element => {
  const [recipient, setRecipient] = useState<string>("KT1FYct7DUK1mUkk9BPJEg7AeH7Fq3hQ9ah3");
  const [amount, setAmount] = useState<string>("NaTaS Amount");
  const [loading, setLoading] = useState<boolean>(false);
 
  const sendTransfer = async (): Promise<void> =>  {
    if (recipient && amount)  {
      setLoading(true);
      try {
        
       // const op = Tezos.wallet
        Tezos.setWalletProvider(wallet);
        const dcontract = await Tezos.wallet.at("KT1FYct7DUK1mUkk9BPJEg7AeH7Fq3hQ9ah3");
        const ncontract = await Tezos.wallet.at("KT1GaEvbD4zA3pHs7mv3grpuqR1KGtjXAEDe");
        const contractname = "KT1FYct7DUK1mUkk9BPJEg7AeH7Fq3hQ9ah3"

        const result = await Tezos.wallet.batch()

         .withContractCall(ncontract.methods.update_operators([
          {
          add_operator: {
              owner: userAddress,
              operator: contractname,
              token_id: 0
          }
        }
        ]))
        .withContractCall(dcontract.methods.stake(recipient, 25))
        .withContractCall(ncontract.methods.update_operators([
          {
          remove_operator: {
              owner: userAddress,
              operator: contractname,
              token_id: 0
          }
        }
        ]))
        const op = {
          storageLimit: 800,
          gasLimit: 8000,
          fee: 800
        };
        const batchOp = await result.send();
        await batchOp;
      } catch (error) {
        console.log(error);
        
      } finally {
     
        setLoading(false);
      }
    }
      };

  return (
    <span> 
     <input
        className="inputfield"
        type="number"
        placeholder="Amount to Stake"
        onChange={e => setRecipient(e.target.value)}
      />
      <br></br>
      <button
        className="button"
        disabled={!recipient && !amount}
        onClick={sendTransfer}
      >
        {loading ? (
          <span>
            <i className="fas fa-spinner fa-spin"></i>&nbsp; Please wait
          </span>
        ) : (
          <span>
            Stake
          </span>
        )}
      </button>
    </span>
  );
};

export default MatterStake;
