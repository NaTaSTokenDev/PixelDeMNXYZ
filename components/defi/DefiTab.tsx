import { TezosToolkit, WalletContract } from "@taquito/taquito";
import React, { useState } from "react";
import QuipuLPDeMN from "./QuipuLP_DeMN";
import QuipuLPNaTaS from "../defi/QuipuLP_NaTaS";
import CrunchyStakedDeMNLP from "../defi/CrunchyStakedDeMNLP";
import GetTezosprice from "./GetTezosprice"
import CrunchyStake from "../defi/CrunchyStake";
import CrunchyClaim from "../defi/CrunchyClaim";
import MatterStakedNaTaS from "../defi/MatterStakedNaTaS";
import MatterClaim from "../defi/MatterClaim";

const DefiTab = ({
  Tezos,
  userAddress,
  wallet,
  natasBalance
}: {
  Tezos: TezosToolkit;
  userAddress: string;
  wallet: any;
  natasBalance: number;
}): JSX.Element => {
  const [recipient, setRecipient] = useState<string>("KT1FYct7DUK1mUkk9BPJEg7AeH7Fq3hQ9ah3");
  const [amount, setAmount] = useState<string>("NaTaS Amount");
  const [loading, setLoading] = useState<boolean>(false);
 
  const sendTransfer = async (): Promise<void> =>  {
    if (recipient && amount)  {
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
      
     <h1>NaTaS Network DeFi</h1>
        <img
          src="/images/natas_demn_sm_2.png"
          width="220"
          height="220"
          alt="Default PixelDeMN Image Placetaker"
          vertical-align="bottom" />

          <br></br>
          <p>All Farms have ended.</p>
          <p>Please withdraw your tokens. </p>
          <h4>NaTaS Network DeFi: New Farm Coming Soon!</h4>
          <h5>Staked NaTaS / MatterDeFi:{'  '} <MatterStakedNaTaS myuserAddress={userAddress} /></h5>
          <h5>This Farm Has Ended. Please unstake your NaTaS and Claim your rewards</h5>
          {/* <MatterStake
          Tezos={Tezos}
          userAddress={userAddress}
    wallet={wallet} 
        />
           */}
          <h4>Claim your Matter Farm Rewards</h4>
          <MatterClaim
            Tezos={Tezos}
            userAddress={userAddress}
            wallet={wallet}
          />
         
          {/* Stake NaTaS<CrunchyStake
            Tezos={Tezos}
            userAddress={userAddress}
            wallet={wallet}
          />*/}
          <h4>Claim your Crunchy Farm Rewards</h4>
          <CrunchyClaim
            Tezos={Tezos}
            userAddress={userAddress}
            wallet={wallet}
      /> 
          <br></br>
      
        <br></br>
        <p>Powered by
        <a href="https://matterdefi.xyz"> matterdefi.xyz </a> & <a href="https://crunchy.network"> crunchy.network </a>
         <a href="https://matterdefi.xyz/#/?live=25" target="_blank">NaTaS/DeMN Matter Farm</a>
        </p>
        <h4>Tezos Price: $<GetTezosprice /></h4>
        <h5>UnStaked NaTaS LP / Quipuswap:{'  '} <QuipuLPNaTaS myuserAddress={userAddress} /></h5>
        <h5>UnStaked DeMN LP / Quipuswap:{'  '} <QuipuLPDeMN myuserAddress={userAddress} /></h5>
        <h5>Staked DeMN LP / Crunchy:{'  '} <CrunchyStakedDeMNLP myuserAddress={userAddress} /></h5>
        <br></br>
        <h5>GameFly™ delivers the newest video games to your door! Try our <a href="https://www.tkqlhce.com/click-100958339-15422087" target="_top">best offer, 2 games at a time, for only $11.95 per month.</a><img src="https://www.tqlkg.com/image-100958339-15422087" width="1" height="1"/></h5>
        <a href="https://www.kqzyfj.com/click-100958339-12500877" target="_top">
<img src="https://www.ftjcfx.com/image-100958339-12500877" width="640" height="480" alt="Signup for GameFly to play the newest PS5, Xbox, & Nintendo Switch games!" /></a>
      </div>
  );
};

export default DefiTab;
