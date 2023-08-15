import React, { useEffect, useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { collection, getDocs, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import AttacksLeft from "../battle/AttacksLeft";
import { db } from "../../config/firebase-config";

const MakeRoll = ({
  Tezos,
  userAddress,
  wallet,
  combinedData2,
  selectedValue,
  setSanupekwins,
  setLevel1
}: {
  Tezos: TezosToolkit;
  userAddress: string;
  wallet: any;
  combinedData2: number;
  selectedValue: string;
  setSanupekwins: (value: number) => void;
  setLevel1: (value: boolean) => void;
}): JSX.Element => {
  useEffect(() => {
    <AttacksLeft
      userAddress="userAddress"
    />;
  }, [Tezos, userAddress, wallet, combinedData2]);

  const [rollResult, setRollResult] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [didwin, setDidWin] = useState<boolean>(false);
  const sanupekwindata = 0

  const transfer_params = [
    {
      from_: userAddress,
      txs: [
        {
          to_: "tz1Pk7dgfsqsFnHyGzfkdyuADaYU4atYEd7C",
          token_id: 0,
          amount: 100000000,
        },
      ],
    },
  ];
  const [data, setData] = useState<any>(null);
  const [transferComplete, setTransferComplete] = useState<boolean>(false);
  const [isBattling, setIsBattling] = useState<boolean>(false);
  const [showBattleStatus, setShowBattleStatus] = useState<boolean>(false);
  const [todaysRollers, setTodaysRollers] = useState<number>(5);

  useEffect(() => {
    if (isBattling) {
      setShowBattleStatus(true);
      const timer = setTimeout(() => {
        setShowBattleStatus(false);
      }, 90000); // 30 seconds
      return () => clearTimeout(timer);
    }
  }, [isBattling, rollResult]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'rolls'));
        const fetchedData = querySnapshot.docs.map((doc) => doc.data());
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const sendTransfer = async (): Promise<void> => {
    if (todaysRollers >= 1) {
      setLoading(true);
      setIsBattling(true); // Start the battle

      try {
        Tezos.setWalletProvider(wallet);
        const contractName = "KT19VbSBWrAPn6GkUKa9V5PtXyXZcCk1cRGu";
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

        try {
          await result.confirmation()
            .then(async (result) => {
              if (result.completed) {
                console.log('Transaction correctly processed!');
                const diceresult = Math.floor(Math.random() * 20) + 1;
                setDidWin(diceresult >= 17);
                if (diceresult >= 17) {
                  setSanupekwins(sanupekwindata + 1);
              }
                console.log(sanupekwindata, "sanupekwindata")
                setRollResult(diceresult);
                diceresult >= 17 ? setDidWin(true) : setDidWin(false)
                diceresult >= 17 ? setLevel1(true) : setLevel1(false)               
                handleSubmit(diceresult, userAddress);
                const docRef = await getDocs(collection(db, 'todaysrolls'));
                const existingUser = docRef.docs.find((doc) => doc.data().taddress === userAddress);
                if (existingUser) {
                  const docId = existingUser.id;
                  const updatedTodaysrolls = existingUser.data().todaysrolls - 1;
                  await updateDoc(doc(db, 'todaysrolls', docId), {
                    todaysrolls: updatedTodaysrolls,
                  });
                  console.log('todaysrolls updated with ID:', docId);
                }
                setRollResult(diceresult);
              } else {
                console.log("transaction canceled")
                setLoading(false);
                setIsBattling(false); // End the battle
              }
            })
            .catch((err) => console.log(err));

          setTransferComplete(true); // Mark the transfer as complete
        } catch (error) {
          console.log("This error", error);
        } finally {
          setLoading(false);
          setIsBattling(false); // End the battle
        }
      } catch (error) {
        console.log(error);
      }
    }
  };


  const handleRollDice = () => {
    setTransferComplete(false); // Reset transferComplete state
    sendTransfer();
  };

  const handleSubmit = async (diceresult: number, userAddress: string) => {
    try {
      const didwin = diceresult >= 17; // Determine if the user won
      const docRef = await addDoc(collection(db, 'rolls'), {
        taddress: userAddress,
        roll: diceresult,
        timestamp: serverTimestamp(),
        demnused: selectedValue,
        win: didwin, // Set the 'win' field based on whether the user won
        sanupekwins: sanupekwindata,
        payoutmake: sanupekwindata,
      });
  
      console.log('Document written with ID:', docRef.id);

      try {
        const querySnapshot = await getDocs(collection(db, 'todaysrolls'));
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          taddress: doc.data().taddress,
          todaysrolls: doc.data().todaysrolls,
          timestamp: doc.data().timestamp,
          maxrolls: doc.data().maxrolls,
          totalattacksonsanupek: doc.data().totalattacksonsanupek,
          totalwins: doc.data().totalwins,
        }));
        console.log("Query Snapshot:", querySnapshot);
        console.log("Fetched Data:", fetchedData);

        const existingUser = fetchedData.find((data) => data.taddress === userAddress);
        if (existingUser) {
          console.log("Entry already exists for user:", userAddress);
          const docId = existingUser.id; // Retrieve the document ID
          const updatedTodaysrolls = existingUser.todaysrolls - 1; // Decrement the todaysrolls value
          const updatedTotalattacksonsanupek = existingUser.totalattacksonsanupek + 1;
          const updatedTotalWins = existingUser.totalwins + 1; // fix this

          await updateDoc(doc(db, 'todaysrolls', docId), {
            todaysrolls: updatedTodaysrolls,
            updatedTotalattacksonsanupek: updatedTotalattacksonsanupek,
            totalwins: updatedTotalWins
          });
          console.log('rolls updates with ID:', docRef.id);

        } else {
          console.log("Entry does not exist for user:", userAddress);
          // Add a new document for the user if it doesn't exist
          const docRef = await addDoc(collection(db, 'todaysrolls'), {
            taddress: userAddress,
            todaysrolls: combinedData2 * 3,
            timestamp: serverTimestamp(),
            maxrolls: combinedData2 * 3,
            totalattacksonsanupek: 0,
            totalwins: 0,
          });
          console.log('Document written with ID:', docRef.id);
        }
      } catch (error) {
        console.error('Error retrieving Today\'s Rolls:', error);
      }
    } catch (error) {
      console.error('Error adding document:', error);
    }
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
        <div>
          <span>
            <h2>You rolled a {rollResult}</h2>
          </span>

          {rollResult >= 17 ? <h2>You win!</h2> : <h2>SanuPek wins</h2>}

        </div>
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
};

export default MakeRoll;
