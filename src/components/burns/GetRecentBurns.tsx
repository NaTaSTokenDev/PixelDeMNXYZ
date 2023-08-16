import useFetch from "react-fetch-hook";

interface Props {
  timestamp: string;
  amount: number;
}

const GetRecentBurns: React.FC = () => {
  const url = `https://api.tzkt.io/v1/tokens/transfers?to=KT1CZMurPAjSfZqcn6LBUNUhG4byE6AJgDT6&token.contract=KT1GBgCd5dk7v4TSzWvtk1X64TxMyG4r7eRX&select=timestamp,amount`;
  let i = 0;
  let num = 0;
  let time = ""
  const myarr: Array<number> = [0];
  const myarr2: Array<string> = [""];
  const { data, error } = useFetch<[Props]>(url);
  if (error) return <p>There is an error.</p>;
  if (!data) return <span>Loading...</span>;
  for (i = 0; i < data.length; i++) {
    num = data[i].amount / Math.pow(10, 8);
    time = data[i].timestamp;
    myarr.push(num);
    myarr2.push(time);
    // FixDate(myarr, myarr2)
  }
  const newarr = myarr.slice(-5).reverse();
  const newarr2 = myarr2.slice(-5).reverse();
  const listItems = newarr.map((newarr, index) => <td key={index}>{newarr}</td>);
  const listItems2: Array<string> = [];
  for (i = 0; i < newarr2.length; i++) {
    let thisyear = newarr2[i].slice(0, 4)
    let thismonth = newarr2[i].slice(5, 7)
    let thisday = newarr2[i].slice(8, 10)
    listItems2.push(`${thismonth} / ${thisday} / ${thisyear}`);
  }
  const listItemsAgain = listItems2.map((listItems2, index) => <td key={index}>{listItems2}</td>);

  return (
    <div> 
      <h2>    
        <table>
          <tbody>
            <tr>{listItems}</tr>
            <tr>{listItemsAgain}</tr>
          </tbody>
        </table>
     </h2>
    </div>
  );
};
export default GetRecentBurns;
