import React, { useState } from "react";
import useFetch from "react-fetch-hook";

interface Post {
  reward: number;
  staked: number;
  last_rps: number;
}

interface DemnBalanceProps {
  myuserAddress: string;
}
const MatterStakedNaTaS = ({ myuserAddress }: DemnBalanceProps) => {
  const url = `https://api.tzkt.io/v1/bigmaps/94420/keys?active=true&key.farm_id=25&key.user_address=${myuserAddress}&select=value`;
  const thisuser = myuserAddress;
  const { data, error } = useFetch<Post[]>(url);
  if (error) return <p>There is an error.</p>;
  if (!data) return <span>Loading...</span>;
  if (data.length == 1) {
    {
      if (data[0].staked != undefined) {
        let num = data[0].staked
        return <span>{num}</span>;
      }
    }
  }
  return <span>0</span>;
};
export default MatterStakedNaTaS;
