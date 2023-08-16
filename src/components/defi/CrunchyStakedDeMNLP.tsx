import React, { useState } from "react";
import useFetch from "react-fetch-hook";

interface Post {
  amount: number;
  rewardDebt: number;
  lockEndTime: string;
}

interface DemnBalanceProps {
  myuserAddress: string;
}
const CrunchyStakedDeMNLP = ({ myuserAddress }: DemnBalanceProps) => {
  const url = `https://api.tzkt.io/v1/bigmaps/4874/keys?active=true&key.address=${myuserAddress}&key.nat=433&select=value`;
  const thisuser = myuserAddress;
  const { data, error } = useFetch<Post[]>(url);
  if (error) return <p>There is an error.</p>;
  if (!data) return <span>Loading...</span>;
  if (data.length == 1) {
    {
      if (data[0].amount != undefined) {
        let num = data[0].amount / Math.pow(10, 6);
        return <span>{num}</span>;
      }
    }
  }
  return <span>0</span>;
};
export default CrunchyStakedDeMNLP;
