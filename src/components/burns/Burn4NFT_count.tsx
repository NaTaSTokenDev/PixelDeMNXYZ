import React, { useState } from "react";
import useFetch from "react-fetch-hook";

interface Post {
  count: any;
}


const Burn4NFT_count = () => {
  const url = `https://api.tzkt.io/v1/contracts/KT1GcbtV3xqGEmG3ngi1nm4kTuz8UGAh1Kp6/storage?path=counter`;
  const { data, error } = useFetch<Post[]>(url);
  if (error) return <p>There is an error.</p>;
  if (!data) return <span>Loading...</span>;
  if (data.length == 1) {
    {
      if (data[0].count != undefined) {
        let num = data[0].count;
        return {num};
      }
    }
  }

  return 0;
};
export default Burn4NFT_count;
