import axios from "axios";
import React, { Dispatch, SetStateAction, Key, useEffect, useState } from "react";
import YardSale_buylot from "./YardSale_buylot";
import { TezosToolkit } from "@taquito/taquito";


type ApiData2 = {
  uri: string;
  meme: string
}

type ApiData = {
  executed: boolean;
  executor: string;
  proposal: {
    tokens1: {
      id: string;
      fa2: string;
      amount: string;
      royalty_addresses: string[];
    }[];
    tokens2: {
      id: string;
      fa2: string;
      amount: string;
      royalty_addresses: string[];
    }[];
    acceptor: string;
    proposer: string;
    mutez_amount1: string;
    mutez_amount2: string;
  };
  acceptor_accepted: boolean;
  proposer_accepted: boolean;
}

function YardSale_getipfslink({
  Tezos,
  userAddress,
  wallet,
  lotnum,

}: {
  Tezos: TezosToolkit;
  userAddress: string;
  wallet: any;
  lotnum: number;

}): JSX.Element {
  let theipfs: string[] = []
  let thedata: ApiData[] = []
  let id: string[] | null = []
  let fa2: string[] | null = []
  const [ipfsimage, setIpfsImage] = useState('')
  const [demnCost, setDemnCost] = useState(0)
  const [myData, setMyData] = useState<ApiData[]>([]);

  useEffect(() => {
    axios
      .get<ApiData[]>(`https://api.tzkt.io/v1/bigmaps/348816/keys?select=value`)
      .then((response) => {
        thedata = (response.data);
        callback();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const callback = async () => {
    if (thedata.length > 0) {
      const ids = thedata[lotnum].proposal.tokens1.map(token => token.id);
      const fa2s = thedata[lotnum].proposal.tokens1.map(token => token.fa2);
      let demntotal = Number(thedata[lotnum].proposal.tokens2[0].amount)
      demntotal = demntotal / Math.pow(10, 8)
      setDemnCost(demntotal)
      id = ids
      fa2 = fa2s
      setMyData(thedata)
    }
    if (id != null && fa2 != null) {
      let i: number = 0;
      for (i = 0; i < id.length; i++) {
        await axios
          .get<ApiData2[]>(`https://api.tzkt.io/v1/tokens?contract=${fa2[i]}&tokenId=${id[i]}&select=metadata.artifactUri`)
          .then((response) => {
            var the = JSON.stringify(response.data[0]);
            var the = the.substring(8);
            if (fa2 && id != undefined) {
              var the = `<a href="https://objkt.com/asset/${fa2[i]}/${id[i]}" target="_blank"><img src = "https://ipfs.io/ipfs/${the} width="140">&nbsp`
              var the = the.replace(/\\/g, "");
            }
            theipfs.push(the)
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    setIpfsImage(theipfs.join(''))
  }

  return (
    <div>
      <br></br>
      <div className="centerdiv">
        <h4>DeMN Reward #{lotnum}</h4>
        <p dangerouslySetInnerHTML={{ __html: ipfsimage }} />
        <YardSale_buylot
          Tezos={Tezos}
          userAddress={userAddress}
          wallet={wallet}
          lotnum={lotnum}
        />
        <p>{demnCost} DeMN Tokens</p>
      </div>
    </div>
  );

}

export default YardSale_getipfslink;