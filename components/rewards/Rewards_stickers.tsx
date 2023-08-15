import React, { useEffect, useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { getFirestore, collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCdU8gVH6IdnSqTLCLk2SiW9iH08tcM_VU",
  authDomain: "pixeldemnxyzapp.firebaseapp.com",
  databaseURL: "https://pixeldemnxyzapp-default-rtdb.firebaseio.com",
  projectId: "pixeldemnxyzapp",
  storageBucket: "pixeldemnxyzapp.appspot.com",
  messagingSenderId: "825886271451",
  appId: "1:825886271451:web:2985c112f066eb165a29fe",
  measurementId: "G-LW1XDS9SVT"
};

initializeApp(firebaseConfig);

function Rewards_stickers({
  Tezos,
  userAddress,
  wallet,
}: {
  Tezos: TezosToolkit;
  userAddress: string;
  wallet: any;
}): JSX.Element {

  const [lotElements, setLotElements] = useState<JSX.Element[]>([]);
  const [data, setData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [transactionCompleted, setTransactionCompleted] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, 'orders'));
        const fetchedData = querySnapshot.docs.map((doc) => doc.data());
        setData(fetchedData);
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [paddress, setPAddress] = useState('');
  const [mailingname, setMailingName] = useState('');
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState<string>("tz1SrztDp8MVcbom6T8FMPSRFns4PGFoFqxx");
  const [loading, setLoading] = useState<boolean>(false);

  const sendTransfer = async (paddress: string, mailingname: string): Promise<void> => {
    console.log("Sending transfer...");
    setLoading(true);
    try {
      Tezos.setWalletProvider(wallet);
      const recipient = "tz1SrztDp8MVcbom6T8FMPSRFns4PGFoFqxx";
      const address = userAddress;
      const contract = await Tezos.wallet.at(
        "KT1GBgCd5dk7v4TSzWvtk1X64TxMyG4r7eRX"
      );
      const TOKEN_ID = 0;
      const result = await contract.methods
        .transfer([
          {
            from_: address,
            txs: [
              {
                to_: recipient,
                token_id: TOKEN_ID,
                amount: 80000000000,
              },
            ],
          },
        ])
        .send();
      await result;
      setTransactionCompleted(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paddress) {
      setErrorMessage("Please enter Mailing Address");
      return;
    }
    try {
      const db = getFirestore();
      const docRef = await addDoc(collection(db, 'orders'), {
        taddress: userAddress,
        paddress,
        mailingname,
        timestamp: serverTimestamp()
      });
      console.log('Document written with ID:', docRef.id);
      // Reset form fields after successful submission
      setPAddress('');
      setAmount(1);
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  return (
    <div className="form-container">
      <h3>Send NaTaS 800 DeMN Tokens to receive this PixelDeMN Sticker</h3>
      <img
        src="/images/pixeldemnsticker.png"
        width="150"
        alt="Default PixelDeMN Image Placetaker"
      />
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="mailingname">Name:</label>
        <textarea
            id="mailingname"
            rows={1}
            value={mailingname}
            onChange={(e) => {
              setMailingName(e.target.value);
            }}
          /> 
          <label htmlFor="paddress">Mailing Address:</label>
          <textarea
            id="paddress"
            rows={2}
            value={paddress}
            onChange={(e) => {
              setPAddress(e.target.value);
              setAmount(1);
            }}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {transactionCompleted && <label>Transaction complete! Your sticker will be mailed soon.</label>}
        <button
          className="submit-button"
          type="submit"
          disabled={!recipient && !amount}
          onClick={() => {
            if (paddress) {
              sendTransfer(paddress, mailingname);
            } else {
              setErrorMessage("Please Enter Mailing Address");
            }
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Rewards_stickers;
