import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { Dispatch, SetStateAction } from "react";

interface ButtonProps {
  wallet: BeaconWallet | null;
  setPublicToken: Dispatch<SetStateAction<string | null>>;
  setUserAddress: Dispatch<SetStateAction<string>>;
  setUserBalance: Dispatch<SetStateAction<number>>;
  setWallet: Dispatch<SetStateAction<any>>;
  setTezos: Dispatch<SetStateAction<TezosToolkit>>;
  setBeaconConnection: Dispatch<SetStateAction<boolean>>;
}

const DisconnectButton = ({
  wallet,
  setPublicToken,
  setUserAddress,
  setUserBalance,
  setWallet,
  setTezos,
  setBeaconConnection,
}: ButtonProps): JSX.Element => {
  const disconnectWallet = async (): Promise<void> => {
    window.localStorage.clear();
    setUserAddress("");
    setUserBalance(0);
    setWallet(null);
    const tezosTK = new TezosToolkit("https://mainnet.api.tez.ie");
    setTezos(tezosTK);
    setBeaconConnection(false);
    setPublicToken(null);
    console.log("disconnecting wallet");
    if (wallet) {
      await wallet.client.removeAllAccounts();
      await wallet.client.removeAllPeers();
      await wallet.client.destroy();
    }
  };

  return (
<div className="disconnect-container">
<div className="image-container">
<a href="https://discord.gg/9UTJgTsHCW" target="_blank" rel="noopener noreferrer">
      <img
        src="/images/discord.png"
        width="50"
        alt="Discord Logo"
      />
    </a>
    <a href="https://twitter.com/NatasToken" target="_blank" rel="noopener noreferrer">
      <img
        src="/images/twitter.png"
        width="50"
        alt="Twitter Logo"
      />
    </a>
  </div>
  <button className="disconnect-button" onClick={disconnectWallet}>
    <i className="fas fa-times"></i>&nbsp; Disconnect
  </button>

</div>
  );
};

export default DisconnectButton;
