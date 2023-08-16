import { stringify } from "querystring";
import useFetch from "react-fetch-hook";

interface Props {
    address: string;
  }
  
  function RaffleGetaddress() {
    const url = `https://api.tzkt.io/v1/tokens/transfers?to=KT1CZMurPAjSfZqcn6LBUNUhG4byE6AJgDT6&token.contract=KT1GBgCd5dk7v4TSzWvtk1X64TxMyG4r7eRX&amount=10000000000&timestamp.gt=2022-08-20T02:40:57Z&select=from.address`;
    let i = 0;
    const myarr: Array<string> = [];
    const { data, error } = useFetch<[Props]>(url);
    if (error) return <p>There is an error.</p>;
    if (!data) return <span>Loading...</span>;
    for (i = 0; i < data.length; i++) {
      let ad = JSON.stringify(data[i]); 
      ad = ad.replaceAll('"', '');
      myarr.push(ad);
    }
    
    const newarr = myarr.reverse();
    const listItems = newarr.map((newarr) => <p>{newarr}</p>);
      
    return (
        <h4>
            {listItems}
        </h4>
    )
  }
  
  
  export default RaffleGetaddress;
  