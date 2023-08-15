import useFetch from "react-fetch-hook";

interface Props {
    address: string;
    amount: number;
  }
  
  interface IDemnBalanceProps {
    userAddress: string;
  }
  
  function RaffleYourtickets({
    userAddress
  }: IDemnBalanceProps) {
    const url = `https://api.tzkt.io/v1/tokens/transfers?to=KT1CZMurPAjSfZqcn6LBUNUhG4byE6AJgDT6&from=${userAddress}&token.contract=KT1GBgCd5dk7v4TSzWvtk1X64TxMyG4r7eRX&amount=10000000000&timestamp.gt=2022-08-20T02:40:57Z&select=from.address`;
    let i = 0;
    let ticketssold = 0;
    const myarr: Array<string> = [];
    const { data, error } = useFetch<[Props]>(url);
    if (error) return <p>There is an error.</p>;
    if (!data) return <span>Loading...</span>;
    for (i = 0; i < data.length; i++) {
      let ad = JSON.stringify(data[i]); 
      ad = ad.replaceAll('"', '');
      myarr.push(ad);
    }
    for (i = 0; i < myarr.length; i++) {
        {ticketssold = ticketssold + 1}
    }
  
   // const listItemsAgain = listItems2.map((listItems2) => <td>{listItems2}</td>);

    return (
        <h4>
            You have {ticketssold} Tickets
        </h4>
    )
  }
  
  
  export default RaffleYourtickets;
  