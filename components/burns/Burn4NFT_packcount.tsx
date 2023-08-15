import useFetch from "react-fetch-hook";

interface Post {
  count: number;
}

interface Props {
  userAddress: string;
}

const Burn4NFT_packcount = ({
  userAddress
}: Props) => {
  const url = `https://api.tzkt.io/v1/tokens/balances?active=true&token.contract=KT1Ejr5qDSe2Qw55izRgmtPwMgztNjSGnCSA&account=${userAddress}&select=balance`;
  const { data, error } = useFetch<number[]>(url);

  if (error) return <span>(Offline)</span>;
  if (!data) return <span>Loading...</span>;
      if (data[0] != undefined) {
        let num = Number(data[0]);
        checkNaN(num);
        return <span>{num}</span>;
      }

  return <span>0</span>;

  function checkNaN(num: number) {
    if (Number.isNaN(num)) {
      var num = 0;
    }
    return num;
  }


};
export default Burn4NFT_packcount;
