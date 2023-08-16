import React, { useState } from "react";
import useFetch from "react-fetch-hook";


interface DemnBalanceProps {
  myuserAddress: string;
}
const GetBurnedDeMNs = ({ myuserAddress }: DemnBalanceProps) => {
  const url = `https://api.tzkt.io/v1/tokens/balances?account=KT1CZMurPAjSfZqcn6LBUNUhG4byE6AJgDT6&token.contract=KT1GBgCd5dk7v4TSzWvtk1X64TxMyG4r7eRX&select=balance`;
  const { data, error } = useFetch<number[]>(url);
  if (error) return <p>There is an error.</p>;
  if (!data) return <span>Loading...</span>;
  if (data) {
    {
      if (data[0] != undefined) {
        let num = data[0] 
        num = num / Math.pow(10, 8);
        return <span>{num}</span>;
      }
    }
  }
  return (
    <div>
    <p>0</p>
  </div>
  )
};
export default GetBurnedDeMNs;
