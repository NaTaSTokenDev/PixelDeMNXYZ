import useFetch from "react-fetch-hook";

interface Props {
  amount: number;
}
interface Props2 {
  alais?: string;
  address: string;
}

function RaffleBurner() {
  const url = `https://api.tzkt.io/v1/tokens/transfers?to=KT1CZMurPAjSfZqcn6LBUNUhG4byE6AJgDT6&token.contract=KT1GBgCd5dk7v4TSzWvtk1X64TxMyG4r7eRX&select=amount`;
  const url2 = `https://api.tzkt.io/v1/tokens/transfers?to=KT1CZMurPAjSfZqcn6LBUNUhG4byE6AJgDT6&token.contract=KT1GBgCd5dk7v4TSzWvtk1X64TxMyG4r7eRX&select=from`;
  let i = 0;
  //let num = 0;
  let from = "";
  let amount = 0;
  const myarr: Array<string> = [""];
  const myarr2: Array<number> = [0];
  const newarr: Array<string> = [""];
  const newarr2: Array<number> = [];

	const { data, error } = useFetch<[Props]>(url);
	  if (error) return <p>There is an error.</p>;
	  if (!data) return <span>Loading...</span>;
	  for (i = 0; i < data.length; i++) {
      myarr2.push(amount);
      Getaddress();
	  }
  
 async function Getaddress() {
	 const { data, error } = useFetch<[Props2]>(url2);
	    if (error) return <p>There is an error.</p>;
	    if (!data) return <span>Loading...</span>;
	  for (i = 0; i < data.length; i++) {
	    from = data[i].address;
      myarr.push(from)
	  }
    }

  for (i = 0; i <myarr.length; i++) {
  if (myarr2[i] == 1) {
    newarr.push(from)
    newarr2.push(amount)
    }
  }
  const listItems = newarr.map((newarr) => <td>{newarr}</td>);
  const listItems2 = newarr2.map((newarr2) => <td>{newarr2}</td>);
  //const listItemsAgain = listItems2.map((listItems2) => <td>{listItems2}</td>);
  
  return (
    <div className="centerdiv">
      <h4>
        <table>
          <tr>{listItems}</tr>
          <tr>{listItems2}</tr>
        </table>
      </h4>
    </div>)

}


export default RaffleBurner;
