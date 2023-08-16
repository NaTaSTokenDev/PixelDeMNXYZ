import React, { useState, useEffect } from "react";

interface IPost {
  data: string[];
}

interface IDemnBalanceProps {
  myuserAddress: string;
}

function MyDeMNs_SI({
  myuserAddress,
}: IDemnBalanceProps) {
  const [demnData, setDemnData] = useState<IPost[]>([]);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.tzkt.io/v1/tokens/balances?account=${myuserAddress}&balance=1&token.metadata.symbol=OBJKT&token.metadata.tags.[*]=PixelDeMNs&select=token.metadata.name`;
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
    pic = pic.replace(/^0+/, '');
    return pic;
  }

  return (
    <>
      {showData && demnData.map((post, index) => {
        const pic = JSON.stringify(post);
        if (pic.includes('PixelDeMN')) {
          const fixedPic = fixPic(pic);
          const ipfsimage = `/images/Series I/${fixedPic}.png`;
          return (
            <span key={index}>
              <p>Series I - PixelDeMN {fixedPic}</p>
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

export default MyDeMNs_SI;
