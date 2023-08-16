import { stringify } from "querystring";
import useFetch from "react-fetch-hook";
import React, { Component } from "react";

interface IPost {
  data: string;
}

interface IDemnBalanceProps {
  myuserAddress: string;
}

function TezApes({
  myuserAddress
}: IDemnBalanceProps) {
  var url = `https://api.tzkt.io/v1/tokens/balances?active=true&token.contract=KT1FReMp4U1KipyH53xXUnnjtdRQZaLnQpUj&account=${myuserAddress}&select=token.metadata.formats`;
  let i = 0;
  let bob = "";
  var ipfsimage = "";
  const { data, error } = useFetch<IPost[]>(url);
  if (error) return <span>Network connection?</span>;
  if (!data) return <span>Loading...</span>;
  for (i = 0; i < data.length; i++) {
    var ipfslink = JSON.stringify(data[i]);
    var ipfslink2 = ipfslink.toString();
    var ipfslink2 = ipfslink2.substring(16, 63);
    var ipfsimage = `<img src = "https://ipfs.io/ipfs/${ipfslink2}" width="150" height="150">`;
    bob = "<td>" + ipfsimage + "</td>" + " " + bob;
  }
if (bob != "") {
  return (
    <span dangerouslySetInnerHTML={{ __html: bob }} />
  );}
  else {
  return  (
    <div>
      <div dangerouslySetInnerHTML={{ __html: `<img
  src="/images/tezapegang.png"
  width="200"
  height="150"
  alt="Default PixelDeMN Image Placetaker"
/>` }} />
    </div>
  );}
}
export default TezApes;
