import React, { useState, useEffect, useRef  } from 'react';
import useFetch from 'react-fetch-hook';

interface IPost {
  "account.address": string;
  "token.metadata.name": string;
  "token.metadata.attributes"?: { name: string; value: string }[];
}

interface IDemnBalanceProps {
  userAddress: string;
}

function Admin_DeMNPayouts({ userAddress }: IDemnBalanceProps) {
  const url1 = `https://api.tzkt.io/v1/tokens/balances?active=true&token.contract=KT1DxnxEvjxJ5yw9SWS8B7HZVAS9md3VqMeY&balance=1&select=account.address,token.metadata.name`; //SVI
  const url2 = `https://api.tzkt.io/v1/tokens/balances?active=true&token.contract=KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi&balance=1&token.metadata.tags.[*]=PixelDeMNs&select=account.address,token.metadata.name,token.metadata.attributes`; //SV
  const url3 = `https://api.tzkt.io/v1/tokens/balances?active=true&balance=1&token.metadata.name.as=PixelDeMNs*&token.contract=KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE&balance=1&select=account.address,token.metadata.name,token.metadata.attributes`; //SIV
  const url4 = `https://api.tzkt.io/v1/tokens/balances?active=true&token.contract=KT1AgMH7AjVGb8G27xjSih4C7pWQSdZ8brSN&balance=1&select=account.address,token.metadata.name`; //broke
  const url5 = `https://api.tzkt.io/v1/tokens/balances?active=true&token.contract=KT1QctVjmHzMTBBmHLwoYToaodEx7n1BXG1b&balance=1&select=account.address,token.metadata.name`; //SII
  const url6 = `https://api.tzkt.io/v1/tokens/balances?balance=1&token.metadata.symbol=OBJKT&token.metadata.tags.[*]=PixelDeMNs&select=account.address,token.metadata.name`;

  const [accountData, setAccountData] = useState<{ [key: string]: { PixelDeMNnames: string[]; newmod?: string | number }[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const accountDataRef = useRef<{ [key: string]: { PixelDeMNnames: string[]; newmod?: string | number }[] }>({});


  // Fetch data using custom hook
  const { data: data1, error: error1 } = useFetch<IPost[]>(url1);
  const { data: data2, error: error2 } = useFetch<IPost[]>(url2);
  const { data: data3, error: error3 } = useFetch<IPost[]>(url3);
  const { data: data4, error: error4 } = useFetch<IPost[]>(url4);
  const { data: data5, error: error5 } = useFetch<IPost[]>(url5);
  const { data: data6, error: error6 } = useFetch<IPost[]>(url6);

  // Combine all API data into one array
  const allData: IPost[] = [...(data1 || []), ...(data2 || []), ...(data3 || []), ...(data4 || []), ...(data5 || []), ...(data6 || [])];

  useEffect(() => {
    setLoading(true);
    if (error1 || error2 || error3 || error4 || error5 || error6) {
      console.error('Network connection error');
      setLoading(false);
    }
  }, [error1, error2, error3, error4, error5, error6]);

  // Effect hook to merge fetched data and update accountData state
  useEffect(() => {
    if (data1 || data2 || data3 || data4 || data5 || data6) {
      const allData: IPost[] = [...(data1 || []), ...(data2 || []), ...(data3 || []), ...(data4 || []), ...(data5 || []), ...(data6 || [])];
      const accountDataObject: { [key: string]: { PixelDeMNnames: string[]; newmod?: string | number }[] } = {};

      const mergeData = (data: IPost[], newmod?: string | number) => {
        data.forEach((item: IPost) => {
          const accountAddress = item['account.address'];
          const pixelDeMN = item['token.metadata.name'];
          const attributes = item['token.metadata.attributes'];

          // Find the Mods value in the attributes array
          let modsValue: string | undefined;
          if (attributes) {
            const modsAttribute = attributes.find((attr) => attr.name === 'Mods');
            if (modsAttribute) {
              modsValue = modsAttribute.value;
            }
          }

          const existingData = accountDataObject[accountAddress];
          if (existingData) {
            const existingEntryIndex = existingData.findIndex((entry) => entry.PixelDeMNnames[0] === pixelDeMN);

            if (existingEntryIndex !== -1) {
              existingData[existingEntryIndex].PixelDeMNnames.push(pixelDeMN);
              existingData[existingEntryIndex].newmod = modsValue;
            } else {
              existingData.push({ PixelDeMNnames: [pixelDeMN], newmod: modsValue });
            }
          } else {
            accountDataObject[accountAddress] = [{ PixelDeMNnames: [pixelDeMN], newmod: modsValue }];
          }
        });
      };

      // Merge data from all APIs
      mergeData(allData);

      accountDataRef.current = accountDataObject;
      // Update the accountData state
      setLoading(false);
    }
  }, [allData, error1, error2, error3, error4, error5, error6]);

  const extractModsValue = (modsString?: string | number): number => {
    console.log(accountData, "test")
    if (typeof modsString === 'number') {
      return modsString;
    }

    if (typeof modsString === 'string') {
      const modsMatch = modsString.match(/\d+/);
      if (modsMatch) {
        return parseInt(modsMatch[0]);
      }
    }

    return 0;
  };

const filteredAccountData = Object.entries(accountDataRef.current).filter(
  ([accountAddress, pixelDeMNs]) => {
    // Filter out accounts starting with "KT"
    if (accountAddress.startsWith('KT')) {
      return false;
    }
    // Filter out accounts with only one PixelDeMN
     return pixelDeMNs.length > 0;
  }
);

// Render the component
return (
  <>
    <h1>The List</h1>
    {loading && <p>Loading...</p>}
    {!loading &&
      Object.entries(accountDataRef.current).map(([accountAddress, pixelDeMNs], index) => {
        // Calculate the total Mods for the account
        const totalMods = pixelDeMNs.reduce((sum, { newmod }) => sum + extractModsValue(newmod), 0);

        // Calculate the Total Drop for the account
        const totalPixelDeMNs = pixelDeMNs.length;
        const totalDrop = totalPixelDeMNs * 21 + (totalPixelDeMNs * 21 * totalMods) / 100;

        return (
          <div key={index}>
            <h3>{accountAddress}</h3>
            <p>Total Mods: {totalMods} percent</p>
            <p>Total PixelDeMNs Owned: {totalPixelDeMNs}</p>
            <div>
              <h4>PixelDeMNs:</h4>
              <ul>
                {pixelDeMNs.map(({ PixelDeMNnames, newmod }, subIndex) => {
                  const modsValue = extractModsValue(newmod);

                  return (
                    <p key={subIndex}>
                      Name: {PixelDeMNnames[0]}, Mods: {modsValue} percent
                    </p>
                  );
                })}
              </ul>
            </div>
            <p>Total Drop: {totalDrop}</p>
          </div>
        );
      })}
    <h2>Account Summary</h2>
    {filteredAccountData.map(([accountAddress, pixelDeMNs], index) => {
      // Calculate the total Mods for the account
      const totalMods = pixelDeMNs.reduce((sum, { newmod }) => sum + extractModsValue(newmod), 0);

      // Calculate the Total Drop for the account
      const totalPixelDeMNs = pixelDeMNs.length;
      const totalDrop = Number((totalPixelDeMNs * 21 + (totalPixelDeMNs * 21 * totalMods) / 100).toFixed(4));

      return (
        <div key={index}>
          <h4>{accountAddress} {totalDrop};</h4>
        </div>
      );
    })}
  </>
);
      };
    
export default Admin_DeMNPayouts;
