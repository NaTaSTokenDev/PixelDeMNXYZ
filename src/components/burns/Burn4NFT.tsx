import { stringLength } from "@firebase/util";
import { TezosToolkit, MichelsonMap } from "@taquito/taquito";
import React, { useState } from "react";

const Burn4NFT = ({
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
        const contractName = "KT1GcbtV3xqGEmG3ngi1nm4kTuz8UGAh1Kp6"
        const contractName_a = await Tezos.wallet.at("KT1GcbtV3xqGEmG3ngi1nm4kTuz8UGAh1Kp6");
        const nft1Contract = "KT1J6NY5AU61GzUX51n59wwiZcGJ9DrNTwbK";
        const nft1Contract_a = await Tezos.wallet.at("KT1J6NY5AU61GzUX51n59wwiZcGJ9DrNTwbK");
        const nft2Contract = "KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi";
        const dataMap = new MichelsonMap();

          const transfer_param1 = (
            [
            {
            "id": "4668",
            "fa2": "KT1J6NY5AU61GzUX51n59wwiZcGJ9DrNTwbK",
            "amount": "1",
            "royalty_addresses":
            [
            "tz1SrztDp8MVcbom6T8FMPSRFns4PGFoFqxx"
            ]
            }
            ]
          );

          const transfer_param2 = (
            [
            {
            "id":
            "293424",
            "fa2":
            "KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton",
            "amount":
            "1",
            "royalty_addresses":
            [
            "tz1YUDjNcMLv3w2ay6MyuxJUWifiGDKnUN1v",
            ]
            }
          ]
            );

          const transfer_param3 = (contractName);

          const transfer_param4 = (userAddress);

          const transfer_param5 = ("0");

          const transfer_param6 = ("0");
       
  
        const result = await Tezos.wallet.batch()
         .withContractCall(nft1Contract_a.methods.update_operators([
          {
          add_operator: {
              owner: userAddress,
              operator: contractName,
              token_id: 4668
          }
        }
        ]))
        .withContractCall(contractName_a.methods.propose_trade(transfer_param4, transfer_param3, transfer_param5, transfer_param6, transfer_param1, transfer_param2));
     
        const batchOp = await result.send();
        console.log(batchOp)
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

export default Burn4NFT;
