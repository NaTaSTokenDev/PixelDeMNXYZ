import React, { useState, useEffect } from "react";
import useFetch from "react-fetch-hook";

interface IPost {
  data: string[];
}

interface IDemnBalanceProps {
  myuserAddress: string;
}

function MyDeMNs_SIII({
  myuserAddress,
}: IDemnBalanceProps) {
  const [demnData, setDemnData] = useState<IPost[]>([]);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.tzkt.io/v1/tokens/balances?active=true&balance=1&token.contract=KT1AgMH7AjVGb8G27xjSih4C7pWQSdZ8brSN&account=${myuserAddress}&balance=1&select=token.metadata.name`;
        const response = await fetch(url);
        const data = await response.json();
        setDemnData(data);
        setShowData(true);
      } catch (error) {
        console.error("Network connection?", error);
      }
    };
    fetchData();
  }, [myuserAddress]);

  function fixPic(pic: string) {
    pic = pic.replace(/\s/g, ``);
    pic = pic.replace(/[a-z]/gi, '');
    pic = pic.replace("#", "");
    pic = pic.replace("-", "");
    pic = pic.replaceAll('"', '');
    return pic;
  }

  return (
    <>
      {showData && demnData.map((post, index) => {
        const pic = JSON.stringify(post);
        if (pic.includes('PixelDeMN')) {
          const fixedPic = fixPic(pic);
          const ipfsimage = `/images/Series III/PixelDeMN ${fixedPic}.gif`;
          return (
            <span key={index}>
              <p>Series III - PixelDeMN {fixedPic}</p>
              <img src={ipfsimage} width="150" height="150" alt={`PixelDeMN ${fixedPic}`} />
              <h5>ATTACK - 10 / AC - 2</h5>
              <h5>Location - Circle 1</h5>
            </span>
          );
        }
        return null;
      })}
    </>
  );
}

export default MyDeMNs_SIII;
