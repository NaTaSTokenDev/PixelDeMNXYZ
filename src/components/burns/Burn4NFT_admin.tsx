import { TezosToolkit } from "@taquito/taquito";
import React, { useState } from "react";

const Burn4NFT_admin = ({
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

        const nft1 = "KT1CJUHK9hkf24AMJfWFS6KJZmY5jb9GYfCS";
        const nft1tokenId = "680";
        const nft2 = "KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton";
        const nft2tokenId = "652406";
        const nft3 = "KT1Wm4Cegd7wW6MYxEhg6AH5iFX48y65nWvv";
        const nft3tokenId = "1019";

        const contractName = "KT1GcbtV3xqGEmG3ngi1nm4kTuz8UGAh1Kp6";
        const contractName_a = await Tezos.wallet.at("KT1GcbtV3xqGEmG3ngi1nm4kTuz8UGAh1Kp6");
        const nft1Contract = nft1;
        const nft1Contract_a = await Tezos.wallet.at(nft1);
        const nft2Contract = nft2;
        const nft2Contract_a = await Tezos.wallet.at(nft2);
        const nft3Contract = nft3;
        const nft3Contract_a = await Tezos.wallet.at(nft3);
   
        const paymentNft = "KT1Ejr5qDSe2Qw55izRgmtPwMgztNjSGnCSA"
        const paymentNft_a = await Tezos.wallet.at("KT1Ejr5qDSe2Qw55izRgmtPwMgztNjSGnCSA");
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
            },
            {
              "id":
                nft2tokenId,
              "fa2":
                nft2Contract,
              "amount":
                "1",
              "royalty_addresses":
                [
                  "tz1XQZVcQbSA56cf5ZKGGeM9jH4qzfwYL8rk",
                ]
            },
            {
              "id": nft3tokenId,
              "fa2": nft3Contract,
              "amount": "1",
              "royalty_addresses":
                [
                  "tz1SrztDp8MVcbom6T8FMPSRFns4PGFoFqxx"
                ],
            },
          ]
          );

          const transfer_cost = (
            [
            {
            "id":
            "0",
            "fa2":
            paymentNft,
            "amount":
            "1",
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
          add_operator: {
              owner: userAddress,
              operator: contractName,
              token_id: nft1tokenId
          }
        }
        ]))
        .withContractCall(nft2Contract_a.methods.update_operators([
          {
          add_operator: {
              owner: userAddress,
              operator: contractName,
              token_id: nft2tokenId
          }
        }
        ]))
        .withContractCall(nft3Contract_a.methods.update_operators([
          {
          add_operator: {
              owner: userAddress,
              operator: contractName,
              token_id: nft3tokenId
          }
        }
        ]))

        .withContractCall(contractName_a.methods.propose_trade(transfer_param1, transfer_param2, transfer_param3, transfer_param4, transfer_nft1, transfer_cost));
     
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
            Insert NFTs
          </span>
        )}
      </button>
    </span>
  );
};

export default Burn4NFT_admin;
