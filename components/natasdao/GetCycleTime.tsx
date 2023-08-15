import React, { useEffect, useState } from "react";

interface DemnBalanceProps {
  myuserAddress: string;
}

const GetCycleTime = ({ myuserAddress }: DemnBalanceProps) => {
  const [blockCount, setBlockCount] = useState<number | undefined>(undefined);
  const cycleLength = 6000;
  const blockTime = 15; // Tezos block time in seconds

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.tzkt.io/v1/blocks/count");
        const data = await response.json();
        setBlockCount(data);
      } catch (error) {
        console.error("Error fetching block count:", error);
      }
    };

    fetchData();
  }, []);

  const calculateTimeLeft = () => {
    if (blockCount !== undefined) {
      const currentBlock = blockCount - 100
      const remainingBlocks = cycleLength - (currentBlock % cycleLength);
      const secondsLeft = remainingBlocks * blockTime;
      const days = Math.floor(secondsLeft / 86400);
      const hours = Math.floor((secondsLeft % 86400) / 3600);
      const minutes = Math.floor(((secondsLeft % 86400) % 3600) / 60);

      return `${days}d ${hours}h ${minutes}m (${remainingBlocks} blocks)`;
    }

    return "Loading...";
  };

  return <span>{calculateTimeLeft()}</span>;
};

export default GetCycleTime;
