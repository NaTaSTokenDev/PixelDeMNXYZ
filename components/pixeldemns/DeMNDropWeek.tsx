import useFetch from "react-fetch-hook";


interface Props {
  myuserAddress: string;
  pixeldemncontract: string;
}

function DeMNDropWeek({
  myuserAddress,
  pixeldemncontract,
}: Props) {
  var url = `https://api.tzkt.io/v1/tokens/transfers?from=tz1SrztDp8MVcbom6T8FMPSRFns4PGFoFqxx&token.contract=KT1GBgCd5dk7v4TSzWvtk1X64TxMyG4r7eRX&to=${myuserAddress}&select=amount`;
  let bob = 0;
  let i = 0;
  const { data, error } = useFetch<number[]>(url);
  if (error) return <span>Network connection?</span>;
  if (!data) return <span>Loading...</span>;
  i = data.length - 1 
  bob = data[i]
  if(typeof bob == 'undefined'){
   bob = 0;
}
  bob = bob / Math.pow(10, 8)
  checkNaN(bob);
  return (
    <span>{bob}</span>
  );
}

function checkNaN(bob: number) {
  if (Number.isNaN(bob)) {
    var bob = 0;
  }
  return bob;
}

export default DeMNDropWeek;
