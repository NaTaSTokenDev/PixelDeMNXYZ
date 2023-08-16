import React, { useState } from "react";
import useFetch from "react-fetch-hook";

interface Post {
  staked: number;
  past_unstaked: number;
  current_unstaked: number;
  current_stage_num: number;
}

interface DemnBalanceProps {
  userAddress: string;
}
const NatasDao_Staked = ({ userAddress }: DemnBalanceProps) => {
  const url = `https://api.tzkt.io/v1/bigmaps/112864/keys?key=${userAddress}&select=value`;
  const { data, error } = useFetch<Post[]>(url);
  if (error) return <p>There is an error.</p>;
  if (!data) return <span>Loading...</span>;
  if (data.length == 1) {
    {
      if (data[0].staked != undefined) {
        let num = data[0].staked;
        return <span>{num}</span>;
      }
    }
  }
  return <span>0</span>;
};
export default NatasDao_Staked;