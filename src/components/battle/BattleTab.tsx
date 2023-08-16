import { useState, useEffect } from "react";
import { TezosToolkit } from "@taquito/taquito";
import DeMNSelect from "../battle/DeMNSelect";
import MySelectedDeMN from "../battle/MySelectedDeMN";
import MySelectedDeMNStats from "../battle/MySelectedDeMNStats";
import RecentWinners from "../battle/RecentWinners";
import DeMNEquip from "../battle/DeMNEquip";
import DeMNEquip2 from "../battle/DeMNEquip2";
import MakeRoll from "../battle/MakeRoll";

interface PixelDemnMetadata {
  series: string;
  name: string;
  link: string;
}

interface SelectedUser {
  id: string;
  demnused: string;
  roll: number;
  taddress: string;
  time: string;
  win: boolean;

}

const BattleTab = ({
  Tezos,
  userAddress,
  wallet,
  combinedData,
  combinedData2,
  pixelDemnMetadata
}: {
  Tezos: TezosToolkit;
  userAddress: string;
  wallet: any;
  combinedData: any;
  combinedData2: number;
  pixelDemnMetadata: PixelDemnMetadata[];
}): JSX.Element => {
  const [todaysrolls, setTodaysrolls] = useState<number | null>(null); // Initialize with null
  const [selectedValue, setSelectedValue] = useState<string>("selectapixeldemn");
  const [activeTab, setActiveTab] = useState<string>("welcome");
  const [selectedUserData, setSelectedUserData] = useState<SelectedUser[]>([]);
  const [sanupekwins, setSanupekwins] = useState<number>(0);
  const [level1, setLevel1] = useState<boolean>(false);


  const ContentComponent = () => {

    const handleBackButtonClick = () => {
      setActiveTab("welcome");
    };
    const handlePage1Click = () => {
      setActiveTab("page1");
    };
    const handlePage2Click = () => {
      setActiveTab("page2");
    };
    const handlePage3Click = () => {
      setActiveTab("page3");
    };
    const handlePage4Click = () => {
      setActiveTab("page4");
    };

    if (activeTab === "welcome") {
      return (
        <div className="centerdiv">
          <div>
            <h3>Welcome To PixelDeMN Battles</h3>
            <h2>Experimental RPG Demo</h2>
            <p>A PixelDeMN NFT on the Tezos Blockchain is required to play.</p>
            <p>Get Series VI PixelDeMNs on <a href="https://salsadao.xyz/#/artdex-pool/KT1NaUfu8ZMoqL3bX3e4RkmuL92VfFZdaTMM:33" target="_blank"> ArtDex</a>
            </p>
            <img
              src="/images/snake.gif"
              width="150"
              height="150"
              alt="SaNupek"
            />
            <br />
            <button className="button-a" onClick={handlePage1Click}>
              Play Demo!
            </button>
            <br></br>
            <RecentWinners // Only Displays Selcted PixelDeMN Stats 
              selectedValue={selectedValue}
              userAddress={userAddress}
              setSelectedUser={setSelectedUserData}
              selectedUser={selectedUserData}
            />
          </div>
        </div>
      );
    } else if (activeTab === "page1") {
      return (
        <div className="centerdiv">
          <div>
            <h2>
              A young PixelDeMN stood at the precipice of his destiny. Before him, the sinuous guardian, Sanupek, coiled with ominous energy.
            </h2>
            <img
              src="/images/snake.gif"
              width="150"
              height="150"
              alt="SaNupek"
            />
            <br />
            <button className="button-a" onClick={handlePage2Click}>
              Next
            </button>
          </div>
        </div>
      );
    } else if (activeTab === "page2") {
      return (
        <div className="centerdiv">
          <div className="container_2c">
            <div className="column_2c">
              <h2>Select PixelDeMN</h2>
              <DeMNSelect
                pixelDemnMetadata={pixelDemnMetadata}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
              />

              <br />
              <h2> Equip PixelDeMN </h2>
              <h4>Slot 1</h4>
              <DeMNEquip
                combinedData={combinedData}
              />
              <h4>Slot 2</h4>
              <DeMNEquip2
                combinedData={combinedData}
              />
              <br />
              <br />
            </div>
            <div className="column_2c">
              <br />
              <MySelectedDeMN
                pixelDemnMetadata={pixelDemnMetadata}
                selectedValue={selectedValue}
              />
              {selectedValue !== "selectapixeldemn" ? (
                <MySelectedDeMNStats
                  selectedValue={selectedValue}
                  userAddress={userAddress}
                  setSelectedUser={setSelectedUserData}
                  selectedUser={selectedUserData}
                  setLevel1={setLevel1}
                />
              ) : null}
              {selectedValue === "selectapixeldemn" ? (
                <p>Select PixelDeMN</p>
              ) : null}
              {pixelDemnMetadata.length === 0 ? (
                <div>
                  <br></br>
                  <p>You need a PixelDeMN to play</p>
                  <p>Get Series VI PixelDeMNs on <a href="https://salsadao.xyz/#/artdex-pool/KT1NaUfu8ZMoqL3bX3e4RkmuL92VfFZdaTMM:33" target="_blank"> ArtDex</a></p>
                </div>
              ) : null}
              <br></br>
              <button className="button-a" onClick={handleBackButtonClick}>
                Back
              </button>{'\u00A0'}
              <button className="button-a" onClick={handlePage3Click} disabled={selectedValue === "selectapixeldemn"}>
                Next
              </button>
            </div>
          </div>
        </div>
      );
    } else if (activeTab === "page3") {
      return (
        <div>
          <div className="centerdiv">
            <div>
              <br />
              <MySelectedDeMN // Only Displays Selected PixelDeMN Image
                pixelDemnMetadata={pixelDemnMetadata}
                selectedValue={selectedValue}
              />
              <br />
              <h1>Vs.</h1>
              <br />
              <img
                src="/images/snake.gif"
                width="150"
                height="150"
                alt="SaNupek"
              />
              <br></br><br></br>
              {!level1 ? (
                <div>
                  <MakeRoll
                    Tezos={Tezos}
                    userAddress={userAddress}
                    wallet={wallet}
                    combinedData2={combinedData2}
                    selectedValue={selectedValue}
                    setSanupekwins={setSanupekwins}
                    setLevel1={setLevel1}
                  />
                  <h4>A roll of 17 or above will defeat SaNupek</h4>
                  <h5>Just one hit to win!</h5>
                  <h5>(PixelDeMN Attack + Sanupek AC)</h5>
                  <button className="button-a" onClick={handleBackButtonClick}>
                    Back
                  </button>
                </div>
             ) : (
                <span>
                  <h4>This Sanupek is Dead! You proceed to the Gate.</h4>
                  <button className="button-a" onClick={handleBackButtonClick}>
                    Back
                  </button>{'\u00A0'}
                  <button className="button-a" onClick={handlePage4Click} disabled={selectedValue === "selectapixeldemn"}>
                    Next
                  </button></span>)}

            </div>
          </div>
        </div>
      )
    } else if (activeTab === "page4") {
      return (
        <div>
          <div className="centerdiv">
            <div>
              <img
                src="/images/gate.png"
                width="250"
                height="250"
                alt="SaNupek Cave Entrance"
              />
              <h2>You Defeated Sanupek</h2>
              <br></br>
              <h2>After conquering the fearsome Sanupek Guard, you now stand at the threshold of the underworld gate. The chilling whispers of dark promises surround you. Will you step through, embracing the shadows and the impending doom that awaits?</h2>
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <div>
      <h1>DeMN Battles Demo</h1>
      <h4>Explore the Dungeons of the PixelDeMNs</h4>
      <h4>Win Real Treasure!</h4>
      <div style={{ position: 'relative', textAlign: 'center' }}>
        <img
          src="/images/chest.png"
          width="150"
          height="150"
          alt="DeMN Token Reward Chest"
        />
        <h5
          style={{
            position: 'absolute',
            top: '40%',
            left: '60%',
            transform: 'translate(-50%, -50%)',
            margin: 0,
            color: 'white',
            fontSize: '19px',
          }}
        >
          500 DeMN
        </h5>
      </div>
      <h4> PixelDeMNs Owned: {combinedData2}</h4>
      <h4>You have {combinedData2 * 3} attacks per day /  {todaysrolls !== null ? todaysrolls : "Loading..."} Left Today</h4>
      <br></br>
      {ContentComponent()}
      <br></br>
      <h2>Unlock Booster Packs to Enrich Your PixelDeMNs Experience!</h2>
      <img
        src="/images/boosterpacks.png"
        width="160"
        alt="Booster Pack"
      />
      <img
        src="/images/samplecard1.png"
        width="200"
        alt="Sample Card from the Booster Pack"
      />
      <h4>Unveiling Soon: Elevate Your PixelDeMNs with 3 Exclusive NFTs per Pack, Featuring Equipment Upgrades, DeMN Token Drop Boosters, and Enchanted Magic Items of Varying Rarities!</h4>

      <br></br><br></br>
      <a href="https://www.kqzyfj.com/click-100958339-15520667" target="_top">
        <img src="https://www.lduhtrp.net/image-100958339-15520667" width="480" height="480" alt="GameFly Video Game Rentals Save You Money" /></a>
    </div>
  )
};

export default BattleTab;
