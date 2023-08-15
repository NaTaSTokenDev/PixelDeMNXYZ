import useFetch from "react-fetch-hook";

interface Props {
    staked: number;
    past_unstaked: number;
    current_unstaked: number;
    current_stage_num: number;
  }

  function GetTopmembersamount() {
    const url = `https://api.tzkt.io/v1/bigmaps/112864/keys?select=value`;
    let i = 0;
    let num = 0;
    let num2 = 0;
    let num3 = 0;
    const myarr: Array<number> = [];
    const { data, error } = useFetch<[Props]>(url);
    if (error) return <p>There is an error.</p>;
    if (!data) return <span>Loading...</span>;
    for (i = 0; i < data.length; i++) {
      num = data[i].current_unstaked
      num2 = data[i].staked
      num3 = Number(num) + Number(num2)
      myarr.push(num3);
    }
    const listItems = myarr.map((myarr) => <tr>{myarr} NaTaS</tr>);

    return (
    <table>     
      {listItems}
    </table>
      )
  }
  
  
  export default GetTopmembersamount;
  