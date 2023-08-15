import { TezosToolkit } from "@taquito/taquito";
import React, { useState } from "react";
import MyDeMNs_SI from "../pixeldemns/MyDeMNs_SI";
import MyDeMNs_SII from "../pixeldemns/MyDeMNs_SII";
import MyDeMNs_SIII from "../pixeldemns/MyDeMNs_SIII";
import MyDeMNs_SIV from "../pixeldemns/MyDeMNs_SIV";
import MyDeMNs_SV from "../pixeldemns/MyDeMNs_SV";
import MyDeMNs_SVI from "../pixeldemns/MyDeMNs_SVI";
import DeMNDropTotal from "./DeMNDropTotal";
import DeMNModifier from "./DeMNModifier";
import DeMNDropWeek from "./DeMNDropWeek";
import WallMessage from "./WallMessage";
import WallPost from "./WallPost";
import ChattyApp from "../../components/openai/openai";
import ImgApp from "../../components/openai/dalle";


const PixeldemnsTab = ({
  Tezos,
  userAddress,
  wallet,
  natasBalance,
  demnBalance,
  usersSiPixelDeMNs,
  usersSiiPixelDeMNs,
  usersSiiiPixelDeMNs,
  usersSivPixelDeMNs,
  usersSvPixelDeMNs,
  usersSviPixelDeMNs,
  pixelDemnNamesi,
  pixelDemnNamesii,
  pixelDemnNamesiii,
  pixelDemnNamesiv,
  pixelDemnNamesv,
  pixelDemnNamesvi,
  combinedData2
}: {
  Tezos: TezosToolkit;
  userAddress: string;
  wallet: any;
  natasBalance: number;
  demnBalance: number;
  usersSiPixelDeMNs: number;
  usersSiiPixelDeMNs: number;
  usersSiiiPixelDeMNs: number;
  usersSivPixelDeMNs: number;
  usersSvPixelDeMNs: number;
  usersSviPixelDeMNs: number;
  pixelDemnNamesi: string;
  pixelDemnNamesii: string;
  pixelDemnNamesiii: string;
  pixelDemnNamesiv: string;
  pixelDemnNamesv: string;
  pixelDemnNamesvi: string;
  combinedData2: number;
}): JSX.Element => {
  const [recipient, setRecipient] = useState<string>("KT1FYct7DUK1mUkk9BPJEg7AeH7Fq3hQ9ah3");
  const [amount, setAmount] = useState<string>("NaTaS Amount");
  const [loading, setLoading] = useState<boolean>(false);
  const sendTransfer = async (): Promise<void> => {
    if (recipient && amount) {
      setLoading(true);
      try {
        Tezos.setWalletProvider(wallet);
        const dcontract = await Tezos.wallet.at("KT1KnuE87q1EKjPozJ5sRAjQA24FPsP57CE3");
        const ncontract = await Tezos.wallet.at("KT1TcGBPvmcHawQLdFx5ADDo2hR6XMDhRVdc");
        const contractname = "KT1KnuE87q1EKjPozJ5sRAjQA24FPsP57CE3"
        const result = await Tezos.wallet.batch()

          .withContractCall(ncontract.methods.update_operators([
            {
              add_operator: {
                owner: userAddress,
                operator: contractname,
                token_id: 0
              }
            }
          ]))
          .withContractCall(dcontract.methods.stake(recipient, 433))
          .withContractCall(ncontract.methods.update_operators([
            {
              remove_operator: {
                owner: userAddress,
                operator: contractname,
                token_id: 0
              }
            }
          ]))

        const batchOp = await result.send();
        await batchOp;
      } catch (error) {
        console.log(error);

      } finally {

        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h1>Clean DeMNs on the Tezos Blockchain</h1>

      <img
        src="/images/workimage1.png"
        width="150"
        height="150"
        alt="Default PixelDeMN Image Placetaker" />

      <p>PixelDeMNs are 1/1 NFTs that spawn weekly DeMN Token Drops. These DeMN Tokens are built on the Tezos blockchain and have a limited supply of 1 million. With your DeMN Token Rewards, you can trade for a variety of NFT sets from talented artists in the Rewards tab. Owners of PixelDeMN NFTs have been enjoying weekly DeMN Token Rewards since 2021. To maximize your rewards, you can stake your DeMN Tokens at <a href="https://matterdefi.xyz/#/?live=11" target="_blank"> Crunchy.Network </a> or <a href="https://app.crunchy.network/#/farms?f=garden&q=DeMN" target="_blank"> MatterDeFi.xyz</a>. The latest Series V PixelDeMNs are now available for purchase on FxHash. These NFTs boast a unique modifier that multiplies the rewards on all of your PixelDeMN NFTs. Purchase a PixelDeMN NFT at <a href="https://objkt.com/profile/tz1SrztDp8MVcbom6T8FMPSRFns4PGFoFqxx/collections" target="_blank"> Objkt.com. </a>DeMN Tokens and NaTaS Tokens can be traded on <a href="https://spicyswap.xyz/#/swap" target="_blank"> SpicySwap</a> & <a href="https://quipuswap.com/" target="_blank"> Quipuswap</a>. DeMN Tokens are the core utility token for PixelDeMNs and the NaTaS Network projects with token burn methods to reduce the supply. NaTaS Token is the DAO token for NaTaS Network. Stay up to date by following us on <a href="https://twitter.com/NatasToken" target="_blank"> Twitter</a>.</p>

      <h3>Claim awesome Nfts with your DeMN Tokens on the Rewards Tab</h3>
      <h4>Series VI has been released on <a href="https://salsadao.xyz/#/artdex-pool/KT1NaUfu8ZMoqL3bX3e4RkmuL92VfFZdaTMM:33" target="_blank"> ArtDex</a></h4>

      <h1>Your PixelDeMNs</h1>
      <div>
        <MyDeMNs_SI
          myuserAddress={userAddress}
        />
        <MyDeMNs_SII
          myuserAddress={userAddress}
        />
        <MyDeMNs_SIII
          myuserAddress={userAddress}
          />
        <MyDeMNs_SIV
          myuserAddress={userAddress}
          />
        <MyDeMNs_SV
          myuserAddress={userAddress}
          />
        <MyDeMNs_SVI
          myuserAddress={userAddress}
        />
      </div>
      <br></br>
      <br></br>
        <h4>NaTaS Token Balance: {natasBalance} </h4>
        <h4>DeMN Token Balance: {demnBalance} </h4>
        <h4>Total PixelDeMNs Owned:{'  '}{combinedData2}</h4>
        <h4>Total DeMN Tokens Earned:{'  '} <DeMNDropTotal
          myuserAddress={userAddress}
          pixeldemncontract='KT1AgMH7AjVGb8G27xjSih4C7pWQSdZ8brSN' /></h4>
        <h4>DeMN Tokens Earned This week:{'  '}
          <DeMNDropWeek
            myuserAddress={userAddress}
            pixeldemncontract='KT1AgMH7AjVGb8G27xjSih4C7pWQSdZ8brSN' /></h4>
        <h4>Current DeMN Token Multiplier:{'  '}
          <DeMNModifier
            myuserAddress={userAddress}
            pixeldemncontract='KT1AgMH7AjVGb8G27xjSih4C7pWQSdZ8brSN' /></h4>
            <br></br>
        <h4>Experience the Thrill of Owning a PixelDeMN </h4>
        <h4>Join our dynamic community today and explore the fascinating world of PixelDeMNs for yourself.</h4>
        <h4>PixelDeMN NFTs earn 21 DeMN Tokens per week as an automatic drop to your PixelDeMN address</h4>
      
      <br></br>
      <br></br>
      <ChattyApp />
      <ImgApp />
      <br></br>
      <a href="https://www.tkqlhce.com/click-100958339-12500876" target="_top">
<img src="https://www.tqlkg.com/image-100958339-12500876" width="468" height="60" alt="Signup for GameFly to play the newest PS5, Xbox, & Nintendo Switch games!" /></a>
      <br></br>
      <h1>Leave A Message in the DeMN Pit</h1>
      <h4>Contract: KT1Pj9nj41MTeaTkZ31uU164NLnpd9F2dvfp</h4>
      <WallPost
        Tezos={Tezos}
        userAddress={userAddress}
        wallet={wallet}
      />
      <br></br>
      <div className="divfire">
        <WallMessage myuserAddress={userAddress} />
      </div>
      <br></br>
      <a href="https://www.tkqlhce.com/click-100958339-10495782" target="_top">
<img src="https://www.awltovhc.com/image-100958339-10495782" width="120" height="90" alt="Signup for GameFly to play the newest PS5, Xbox, & Nintendo Switch games!" /></a>
    </div>
  );
};

export default PixeldemnsTab;
