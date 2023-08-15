import axios from "axios";
import React, { useEffect, useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import Rewards_getipfslink from "./Rewards_getipfslink";

function Nft4DeMN_landing  ({
  Tezos,
  userAddress,
  wallet,
}: {
  Tezos: TezosToolkit;
  userAddress: string;
  wallet: any;
}): JSX.Element  {


  // Define the state variable to store the JSX elements for each lot
  const [lotElements, setLotElements] = useState<JSX.Element[]>([]);

  // Fetch the lot numbers from the API on component mount
  useEffect(() => {
    let lotnum: number[];
    axios
      .get<number[]>(`https://api.tzkt.io/v1/bigmaps/348816/keys?value.acceptor_accepted=false&value.proposer_accepted=true&select=key`)
      .then((response) => {
         lotnum = response.data;
        // Only call the callback if the lotnum array is not empty
        if(lotnum.length > 0){
          const newcount = lotnum.reverse();
          callback(newcount);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  // Create JSX elements for each lot number
  const callback = async(lotnum: number[]) => {
    setLotElements(lotnum.map((lot, index) => {
      return <Rewards_getipfslink 
        Tezos={Tezos}
        userAddress={userAddress}
        wallet={wallet}
        lotnum={lot}
        key={index}
      />
    }));
    return lotElements;
  }

  return <div>{lotElements}</div>
}
export default Nft4DeMN_landing;
