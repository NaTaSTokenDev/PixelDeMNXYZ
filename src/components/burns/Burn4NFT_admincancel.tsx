import { TezosToolkit } from "@taquito/taquito";
import React, { useState } from "react";

const Burn4NFT_admincancel = ({
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


        const nft1Contract = "KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton";
        const nft1Contract_a = await Tezos.wallet.at("KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton");
        const nft1tokenId = "747942";
        const nft2Contract = "KT1Siu7FdmwCeNxpKzdZTe9krrZUu77pTuNr";
        const nft2Contract_a = await Tezos.wallet.at("KT1Siu7FdmwCeNxpKzdZTe9krrZUu77pTuNr");
        const nft2tokenId = "19";


          const transfer_nft1 = (
            [
            {
            "id": nft1tokenId,
            "fa2": nft1Contract,
            "amount": "1",
            "royalty_addresses":
            [
            "tz1SrztDp8MVcbom6T8FMPSRFns4PGFoFqxx"
            ],
            }
            ]
          );

         

          const transfer_cost = (
            [
            {
            "id":
            "0",
            "fa2":
            "KT1GBgCd5dk7v4TSzWvtk1X64TxMyG4r7eRX",
            "amount":
            "600000000000",
            "royalty_addresses":
            [
            "tz1XQZVcQbSA56cf5ZKGGeM9jH4qzfwYL8rk",
            ]
            }
          ]
            );

          const transfer_param1 = (userAddress);
          const transfer_param2 = (contractName);
          const transfer_param3 = ("0");
          const transfer_param4 = ("0");
       
  
        const result = await Tezos.wallet.batch()
        .withContractCall(nft1Contract_a.methods.update_operators([
          {
          remove_operator: {
              owner: userAddress,
              operator: contractName,
              token_id: nft1tokenId
          }
        }
        ]))

        .withContractCall(contractName_a.methods.cancel_trade_proposal(17));
     
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
      <br></br>
      <button
        className="button"
        disabled={!recipient && !amount}
        onClick={()=>{sendTransfer()}}
      >
        {loading ? (
          <span>
            <i className="fas fa-spinner fa-spin"></i>&nbsp; Please wait
          </span>
        ) : (
          <span>
            Cancel Packs
          </span>
        )}
      </button>
    </span>
  );
};

export default Burn4NFT_admincancel;
