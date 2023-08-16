import useFetch from "react-fetch-hook";


interface Props {
  price: number;
  timestamp: string;
}

const GetTezosprice = () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '67c7a2f4e0mshaaa8fe67428f0c6p1fd871jsna97d2221e3c8',
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };
  const url = `https://coinranking1.p.rapidapi.com/coin/fsIbGOEJWbzxG/price?referenceCurrencyUuid=yhjMzLPhuIDl`;
  const { data, error } = useFetch<Props[]>(url, options);
  if (error) return <p>There is an error.</p>;
  if (!data) return <span>Loading...</span>;
  if (data) {
    {
      if (data != undefined) {
        let num =  JSON.stringify(data);
        num = num.slice(37, 42);
        return <span>{num}</span>;
      }
    }
  }
  return (
    <div>
    <p>0</p>
  </div>
  )
};
export default GetTezosprice;


