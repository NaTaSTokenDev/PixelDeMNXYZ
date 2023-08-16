import React, { Dispatch, SetStateAction, useState, useEffect, Key } from "react";
import useFetch from "react-fetch-hook";

interface ApiData {
  id: Key | null | undefined;
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

type Props = {
  setYardsaleFa2: Dispatch<SetStateAction<any>>;
  setYardsaleId: Dispatch<SetStateAction<any>>;
}

  const YardSale_shownfts = ({
    setYardsaleFa2,
    setYardsaleId
  }: Props): JSX.Element => {
    var url = `https://api.tzkt.io/v1/bigmaps/348816/keys?select=value`;
    let i = 0;
   
    const { data, error } = useFetch<ApiData[]>(url);
    useEffect(() => {
      if (error) return;
      if (!data) return;

      console.log(data, "shownfts")
      let arr = [];
    let arr2 = []; 
    console.log(data, "shownfts")
    var salesidwork = data[0].proposal.tokens1[0].id;
    var salesidwork2 = data[0].proposal.tokens1[1].id;
    var salesidwork3 = data[0].proposal.tokens1[2].id;
    var salesfa2work = data[0].proposal.tokens1[0].fa2;
    var salesfa2work2 = data[0].proposal.tokens1[1].fa2;
    var salesfa2work3 = data[0].proposal.tokens1[2].fa2;
    arr.push(salesidwork, salesidwork2, salesidwork3)
    arr2.push(salesfa2work, salesfa2work2, salesfa2work3)
    console.log(arr, arr2)
    setYardsaleId(arr);
    setYardsaleFa2(arr2);
  }, [data]); 
  return <div>
    
</div>;
}


export default YardSale_shownfts;