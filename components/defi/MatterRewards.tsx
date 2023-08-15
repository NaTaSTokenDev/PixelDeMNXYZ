import React, { useState } from "react";
import useFetch from "react-fetch-hook";

interface Post {
  reward: number;
  staked: number;
  last_aps: number;
}

interface DemnBalanceProps {
  myuserAddress: string;
}
const MatterRewards = ({ myuserAddress }: DemnBalanceProps) => {
  const url = `https://api.tzkt.io/v1/bigmaps/94420/keys?active=true&key.farm_id=25&key.user_address=${myuserAddress}&select=value`;
  const { data, error } = useFetch<Post[]>(url);
  if (error) return <p>There is an error.</p>;
  if (!data) return <span>Loading...</span>;
  console.log(data[0].reward)
  if (data.length == 1) {
    {
      if (data[0].reward != undefined) {
        let num = data[0].reward / Math.pow(10, 6);
        return <span>{num}</span>;
      }
    }
  }
  return <span>0</span>;
};
export default MatterRewards;
