import useFetch from "react-fetch-hook";

interface Props {
  address: string;
}

function GetTopmembersaddress() {
  const url = `https://api.tzkt.io/v1/bigmaps/112864/keys?select=key`;
  let i = 0;
  const myarr: Array<string> = [""];
  const { data, error } = useFetch<[Props]>(url);
  if (error) return <p>There is an error.</p>;
  if (!data) return <span>Loading...</span>;
  for (i = 0; i < data.length; i++) {
    console.log(data)
    let address = JSON.stringify(data[i]); 
    address = address.replaceAll('"', '');
    myarr.push(address);
    console.log(address)
  }
  const listItems = myarr.map((myarr) => <tr>{myarr}</tr>);

  return (
<table>
    {listItems}
</table>
  )
}

export default GetTopmembersaddress;