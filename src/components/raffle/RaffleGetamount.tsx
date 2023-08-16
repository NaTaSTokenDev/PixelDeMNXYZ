import useFetch from "react-fetch-hook";

interface Props {
    amount: number;
  }
  
  function RaffleGetamount() {
    const url = `https://api.tzkt.io/v1/tokens/transfers?to=KT1CZMurPAjSfZqcn6LBUNUhG4byE6AJgDT6&token.contract=KT1GBgCd5dk7v4TSzWvtk1X64TxMyG4r7eRX&amount=10000000000&timestamp.gt=2022-08-20T02:40:57Z&select=amount`;
    let i = 0;
    let num = 0;
    let ticketssold = -1;
    const myarr: Array<number> = [];
    const { data, error } = useFetch<[Props]>(url);
    if (error) return <p>There is an error.</p>;
    if (!data) return <span>Loading...</span>;
    for (i = 0; i < data.length; i++) {
      num = data[i].amount / Math.pow(10, 8);
      myarr.push(num);
    }
    for (i = 0; i < myarr.length; i++) {
       {ticketssold = ticketssold + 1}
    }
      
    return (
   
        <h4>
            {ticketssold + 1} Tickets Sold
        </h4>
      )
  }
  
  
  export default RaffleGetamount;
  