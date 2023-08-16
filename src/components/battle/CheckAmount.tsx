import React, { useState, useEffect } from "react";
import { TezosToolkit } from "@taquito/taquito";

const ChestAmount = ({
  Tezos,
  userAddress,
  wallet,
}: {
  Tezos: TezosToolkit;
  userAddress: string;
  wallet: any;
}): JSX.Element => {
  
  const [b_numofAttacks, b_setNumofAttacks] = useState<any>(2);
  const [b_remainingAttacks, b_setRemainingAttacks] = useState<any>(2);
  const [rollResult, setRollResult] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const transfer_params = [
    {
      from_: userAddress,
      txs: [
        {
          to_: "tz1Pk7dgfsqsFnHyGzfkdyuADaYU4atYEd7C",
          token_id: 0,
          amount: 10000,
        },
      ],
    },
  ];

  const [transferComplete, setTransferComplete] = useState<boolean>(false);
  const [isBattling, setIsBattling] = useState<boolean>(false);
  const [showBattleStatus, setShowBattleStatus] = useState<boolean>(false);

  useEffect(() => {
    if (isBattling) {
      setShowBattleStatus(true);
      const timer = setTimeout(() => {
        setShowBattleStatus(false);
      }, 30000); // 30 seconds
      return () => clearTimeout(timer);
    }
  }, [isBattling, rollResult]);
  

  const sendTransfer = async (): Promise<void> => {
    if (b_remainingAttacks) {
      setLoading(true);
      setIsBattling(true); // Start the battle

      try {
        Tezos.setWalletProvider(wallet);
        const contractName = "KT19VbSBWrAPn6GkUKa9V5PtXyXZcCk1cRGu";
        const contractName_a = await Tezos.wallet.at(
          "KT19VbSBWrAPn6GkUKa9V5PtXyXZcCk1cRGu"
        );
        const paymentContract_a = await Tezos.wallet.at(
          "KT1GBgCd5dk7v4TSzWvtk1X64TxMyG4r7eRX"
        );
        const result = await Tezos.wallet
          .batch()
          .withContractCall(
            paymentContract_a.methods.update_operators([
              {
                add_operator: {
                  owner: userAddress,
                  operator: contractName,
                  token_id: 0,
                },
              },
            ])
          )
          .withContractCall(paymentContract_a.methods.transfer(transfer_params))
          .withContractCall(
            paymentContract_a.methods.update_operators([
              {
                remove_operator: {
                  owner: userAddress,
                  operator: contractName,
                  token_id: 0,
                },
              },
            ])
          )
          .send();

        await result;
        setTransferComplete(true); // Mark the transfer as complete
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setIsBattling(false); // End the battle
      }
    }
  };

  const handleRollDice = () => {
    const result = Math.floor(Math.random() * 20) + 1;
    setRollResult(result);
    setTransferComplete(false); // Reset transferComplete state
    sendTransfer();
  };

  const renderBattleStatus = (): JSX.Element | null => {
  if (isBattling) {
    return (
      <div>
        <p className={`flashing-text ${showBattleStatus ? "show" : ""}`}>
          Battling
        </p>
      </div>
    );
  }
  return null;
};

const renderRollResult = (): JSX.Element | null => {
  if (transferComplete && rollResult !== null) {
    return (
      <p>
        <span>
          You rolled a {rollResult}!
        </span>
        {rollResult >= 17 && <p>You win!</p>}
        {rollResult < 17 && <p>SanuPek wins!</p>}
      </p>
    );
  }
  return null;
};

return (
  <div>
    <h2>Roll a 20-sided dice:</h2>
    <button className="button-a" onClick={handleRollDice}>
      Roll
    </button>
    {renderBattleStatus()}
    {renderRollResult()}
  </div>
);
}

export default ChestAmount;