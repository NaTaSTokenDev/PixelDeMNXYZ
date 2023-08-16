import React, { useState } from "react";
import useFetch from "react-fetch-hook";

interface Post {
  key: number;
  value: string;
}

interface DemnBalanceProps {
  myuserAddress: string;
}
const WallMessage = ({ myuserAddress }: DemnBalanceProps) => {
  const url = `https://api.tzkt.io/v1/bigmaps/302389/keys?active=true&select=value`;
  let bob = "";
  let i = 0
  const { data, error } = useFetch<Post[]>(url);
  if (error) return <p>There is an error.</p>;
  if (!data) return <span>Loading...</span>;
  for (i = 0; i < data.length; i++)  {
    let pic = data[i];
    bob = pic + "  /  " + bob;
  }
  bob = bob.slice(0, -3)
    return (
      <h2>
        {bob} 
      </h2>
    );
    };

export default WallMessage;
