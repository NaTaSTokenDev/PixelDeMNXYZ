import { TezosToolkit } from "@taquito/taquito";
import { useState } from "react";
import useFetch from "react-fetch-hook";

const Burn4NFT_buypack = ({
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

  interface Post {
    count: any;
  }

  const url = `https://api.tzkt.io/v1/bigmaps/344569/keys?value.acceptor_accepted=false&value.proposer_accepted=true&select=key`;
  const { data, error } = useFetch<Post[]>(url);
  if (error) return <p>There is an error.</p>;
  if (!data) return <span>Loading...</span>;

  const sendTransfer = async (): Promise<void> => {
    if (recipient && amount) {
      setLoading(true);
      try {
        Tezos.setWalletProvider(wallet);
        const contractName = "KT1U2cCA1zayjfBypaDuZWVXPatoAASok9rc"
        const contractName_a = await Tezos.wallet.at("KT1U2cCA1zayjfBypaDuZWVXPatoAASok9rc");
        const demnContract_a = await Tezos.wallet.at("KT1GBgCd5dk7v4TSzWvtk1X64TxMyG4r7eRX");
        const thecount = data
        const newcount = thecount.reverse();
        console.log(newcount[0])
        console.log("new count")
        const result = await Tezos.wallet.batch()
          .withContractCall(demnContract_a.methods.update_operators([
            {
              add_operator: {
                owner: userAddress,
                operator: contractName,
                token_id: 0
              }
            }
          ]))
          .withContractCall(contractName_a.methods.accept_trade(newcount[0]))
          .withContractCall(demnContract_a.methods.update_operators([
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
        onClick={() => { sendTransfer() }}
      >
        {loading ? (
          <span>
            <i className="fas fa-spinner fa-spin"></i>&nbsp; Please wait
          </span>
        ) : (
          <span>
            Buy
          </span>
        )}
      </button>
    </span>
  );
};






export default Burn4NFT_buypack;
