import useFetch from "react-fetch-hook";

interface IPost {
  data: string[];
}

interface IDemnBalanceProps {
  myuserAddress: string;
  pixeldemncontract: string;
}

function DeMNModifier({
  myuserAddress,
  pixeldemncontract,
}: IDemnBalanceProps) {
let thisresul = 0
let Totalmod = 0
let rad1 = DeMNModifierSIV(thisresul)
let rad2 = DeMNModifierSV(thisresul)
let bob = Number(rad1)
let bob2 = Number(rad2)
Totalmod = bob + bob2
  if (Number.isNaN(Totalmod)) {
    Totalmod = 0;
  }
  
return (
  <span className="flash">
    {Totalmod}%
        </span>
);

function DeMNModifierSIV(thisresul: number) {
  var url = `https://api.tzkt.io/v1/tokens/balances?active=true&token.contract=KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE&account=${myuserAddress}&balance=1&select=token.metadata.attributes`;
  let i = 0;
  let bob = 0;
  const { data, error } = useFetch<IPost[]>(url);
  if (error) return <p>Network connection?</p>;
  if (!data) return <span>Loading...</span>;
  for (i = 0; i < data.length; i++) {
    let pic = JSON.stringify(data[i]);
    if (pic.includes("Mods")) {
      pic = fixPic(pic)
      bob = Number(pic)
      checkNaN(bob);
      thisresul = thisresul + bob;
    }
  }
    return thisresul

  function checkNaN(bob: number) {
    if (Number.isNaN(bob)) {
      var bob = 0;
    }
    return bob;
  }

  function fixPic(pic: string) {
    pic = pic.slice(45);
    pic = pic.replace(/\s/g, ``);
    pic = pic.replace(/[a-z]/gi, '');
    pic = pic.replace("#", "");
    pic = pic.replace("-", "");
    pic = pic.replace("-", "");
    pic = pic.replaceAll(':', '');
    pic = pic.replaceAll("{", "");
    pic = pic.replaceAll("}", "");
    pic = pic.replaceAll('"', "");
    pic = pic.replaceAll(',', "");
    pic = pic.replaceAll(']', "");
    pic = pic.replaceAll('[', "");
    return pic;
  }
}

function DeMNModifierSV(thisresul: number) {
  var url = `https://api.tzkt.io/v1/tokens/balances?active=true&token.contract=KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi&account=${myuserAddress}&balance=1&select=token.metadata.attributes`;
  let i = 0;
  let bob = 0;
  const { data, error } = useFetch<IPost[]>(url);
  if (error) return <p>Network connection?</p>;
  if (!data) return <span>Loading...</span>;
  for (i = 0; i < data.length; i++) {
    let pic = JSON.stringify(data[i]);
    if (pic.includes("Mods")) {
      pic = fixPic(pic)
      bob = Number(pic)
      checkNaN(bob);
      thisresul = thisresul + bob;
    }
  }
    return thisresul
  

  function checkNaN(bob: number) {
    if (Number.isNaN(bob)) {
      var bob = 0;
    }
    return bob;
  }

  function fixPic(pic: string) {
    pic = pic.slice(245);
    pic = pic.replace(/\s/g, ``);
    pic = pic.replace(/[a-z]/gi, '');
    pic = pic.replace("#", "");
    pic = pic.replace("-", "");
    pic = pic.replace("-", "");
    pic = pic.replaceAll(':', '');
    pic = pic.replaceAll("{", "");
    pic = pic.replaceAll("}", "");
    pic = pic.replaceAll('"', "");
    pic = pic.replaceAll(',', "");
    pic = pic.replaceAll(']', "");
    pic = pic.replaceAll('[', "");
    return pic;
  }
}


}

export default DeMNModifier;
