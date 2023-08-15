import { TezosToolkit } from "@taquito/taquito";
import { useState } from "react";

const YardSale_buylot = ({
  Tezos,
  userAddress,
  wallet,
  lotnum,
}: {
  Tezos: TezosToolkit;
  userAddress: string;
  wallet: any;
  lotnum: number;
}): JSX.Element => {
  const [recipient, setRecipient] = useState<string>("KT1FYct7DUK1mUkk9BPJEg7AeH7Fq3hQ9ah3");
  const [amount, setAmount] = useState<string>("NaTaS Amount");
  const [loading, setLoading] = useState<boolean>(false);

  const sendTransfer = async (): Promise<void> =>  {
    if (recipient && amount)  {
      setLoading(true);
      try {
        Tezos.setWalletProvider(wallet);
        const contractName = "KT19VbSBWrAPn6GkUKa9V5PtXyXZcCk1cRGu"
        const contractName_a = await Tezos.wallet.at("KT19VbSBWrAPn6GkUKa9V5PtXyXZcCk1cRGu");
        const paymentContract_a = await Tezos.wallet.at("KT1GBgCd5dk7v4TSzWvtk1X64TxMyG4r7eRX");
        console.log("modified open count", lotnum)
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
        .withContractCall(contractName_a.methods.accept_trade(Number(lotnum)))
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
        className="button-a"
        disabled={!recipient && !amount}
        onClick={()=>{sendTransfer()}}
      >
        {loading ? (
          <span>
            <i className="fas fa-spinner fa-spin"></i>&nbsp; Please wait
          </span>
        ) : (
          <span>
            Claim
          </span>
        )}
      </button>
    </span>
  );
        };

export default YardSale_buylot;
