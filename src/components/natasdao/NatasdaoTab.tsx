import { TezosToolkit } from "@taquito/taquito";
import NatasDao_Frozennatas from "../natasdao/NatasDao_Frozennatas";
import NatasDao_Staked from "../natasdao/NatasDao_Staked";
import GetTopmembersaddress from "..//natasdao/GetTopmembersaddress";
import GetTopmembersamount from "../natasdao/GetTopmembersamount";
import FreezeNatas from "../natasdao/FreezeNatas"
import ReactPlayer from 'react-player'
import GetCycleTime from "../natasdao/GetCycleTime"

const NatasdaoTab = ({
    Tezos,
    userAddress,
    wallet,
    natasBalance,
}: {
    Tezos: TezosToolkit;
    userAddress: string;
    wallet: any;
    natasBalance: number;
}): JSX.Element => {

    return (
        <div>
            <h1>NaTaSDAO</h1>
            <h4>Powered by Homebase</h4>
            <img
                src="/images/natas_new_2.png"
                width="150"
                height="150"
                alt="Default PixelDeMN Image Placetaker"
                vertical-align="bottom" />
            <br></br>
            <div>
                <h4>Your NaTaS Tokens Frozen on NaTaSDAO:{'  '}
                    <NatasDao_Frozennatas
                        userAddress={userAddress}
                    />
                </h4>
                <h4>Total NaTaS Token Currently Staked on NaTaSDAO:{'  '}
                    <NatasDao_Staked
                        userAddress={userAddress}
                    />
                </h4>
                <h4>NaTaS Token Balance: {natasBalance} </h4>
                <FreezeNatas
                    Tezos={Tezos}
                    userAddress={userAddress}
                    wallet={wallet}
                />
                <br></br>
            </div>
 
                <h2>NaTaSDAO Members</h2>
                <h4>
                    <table>
                        <th style={{ textAlign: "right", paddingLeft: "70px" }}>
                            <GetTopmembersaddress />
                        </th>
                        <th style={{ textAlign: "right", paddingRight: "40px" }}>
                            <GetTopmembersamount />
                        </th>
                    </table>
                </h4>
         
            <br></br>
            <p> NaTaS Token Contract:  <a href="https://tzkt.io/KT1GaEvbD4zA3pHs7mv3grpuqR1KGtjXAEDe/operations/" target="_blank"> KT1GaEvbD4zA3pHs7mv3grpuqR1KGtjXAEDe </a> </p>
            <p> <a href="https://tezos-homebase.io/explorer/dao/KT1JhPqW3AduJEgGKoUsJgqiJHWtG2gbmtoV/overview" target="_blank">NaTaS DAO on Homebase</a> </p>
            <p> <a href="https://spicyswap.xyz/#/app?tool=swap&tokenLeft=KT1GaEvbD4zA3pHs7mv3grpuqR1KGtjXAEDe:0&tokenRight=xtz" target="_blank">NaTaS Token on Spicywap</a> </p>
            <h3>No Active Proposals</h3>
            <h4> Apx. Time Left in Proposal Cycle: <GetCycleTime myuserAddress={userAddress} /> </h4>
            <br></br>
                <h4>We will go forward in 2023 with the goal of baking on Tezos</h4>
                <h4>Follow our progress as we gather tez for NaTaS</h4>
                <h4>Future NaTaS Bakery Address: <a href="https://tzkt.io/tz1Pk7dgfsqsFnHyGzfkdyuADaYU4atYEd7C/operations/" target="_blank">tz1Pk7dgfsqsFnHyGzfkdyuADaYU4atYEd7C</a></h4>
            <img
                src="/images/workimage1.png"
                width="150"
                height="150"
                alt="Default PixelDeMN Image Placetaker" />
            <br></br>
            <div className="centerdiv">
                <ReactPlayer playing url='https://www.youtube.com/watch?v=d8oq-BdCaLE'
                    volume={0}
                    height='500px'
                    width='800px'
                />
            </div>
        </div>
    )
};

export default NatasdaoTab;
