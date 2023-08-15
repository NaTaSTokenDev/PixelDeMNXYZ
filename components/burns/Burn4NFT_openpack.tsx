import { TezosToolkit } from "@taquito/taquito";
import { useState } from "react";
import useFetch from "react-fetch-hook";


const Burn4NFT_openpack = ({
  Tezos,
  userAddress,
  wallet,
}: {
  Tezos: TezosToolkit;
  userAddress: string;
  wallet: any;
}): JSX.Element => {

  interface Post {
    count: [];
  } 

  const [recipient, setRecipient] = useState<string>("KT1FYct7DUK1mUkk9BPJEg7AeH7Fq3hQ9ah3");
  const [amount, setAmount] = useState<string>("NaTaS Amount");
  const [loading, setLoading] = useState<boolean>(false);
  const [contractName, setContractName] = useState<string>("KT1GcbtV3xqGEmG3ngi1nm4kTuz8UGAh1Kp6");
  const url = `https://api.tzkt.io/v1/bigmaps/335350/keys?value.acceptor_accepted=false&value.proposer_accepted=true&select=key`;
  const { data, error } = useFetch<Post[]>(url);
  if (error) return <p>There is an error.</p>;
  if (!data) return <span>Loading...</span>;
  

  const sendTransfer = async (): Promise<void> =>  {
    if (recipient && amount)  {
      setLoading(true);
      try {
        Tezos.setWalletProvider(wallet);
        const contractName_a = await Tezos.wallet.at("KT1GcbtV3xqGEmG3ngi1nm4kTuz8UGAh1Kp6");
        const paymentContract_a = await Tezos.wallet.at("KT1Ejr5qDSe2Qw55izRgmtPwMgztNjSGnCSA");
        const thecount = data
        console.log(thecount)
        console.log(thecount[0])
        console.log("modified open count")
        const result = await Tezos.wallet.batch()
         .withContractCall(paymentContract_a.methods.update_operators([
          {
          add_operator: {
              owner: userAddress,
              operator: contractName,
              token_id: 0
          }
        }
        ]))
        .withContractCall(contractName_a.methods.accept_trade(Number(thecount[0])))
        .withContractCall(paymentContract_a.methods.update_operators([
            {
            remove_operator: {
                owner: userAddress,
                operator: contractName,
                token_id: 0
            }
          }
          ]));
     
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
            Open
          </span>
        )}
      </button>
    </span>
  );
        };


export default Burn4NFT_openpack;
