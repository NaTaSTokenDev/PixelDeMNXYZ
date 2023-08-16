import React, { useState } from "react";
import useFetch from "react-fetch-hook";

interface Post {
  key: number;
  value: string;
}

interface DemnBalanceProps {
  myuserAddress: string;
}
const SignWall = ({ myuserAddress }: DemnBalanceProps) => {
  const url = `https://api.ghostnet.tzkt.io/v1/bigmaps/180236/keys?active=true&key=0&select=value`;
  const { data, error } = useFetch<Post[]>(url);
  if (error) return <p>There is an error.</p>;
  if (!data) return <span>Loading...</span>;
  return <span>data[0].value</span>;
};

export default SignWall;
