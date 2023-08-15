import { TezosToolkit } from "@taquito/taquito";
import React, { useState } from "react";

const Nft4DeMN_admin_1 = ({
    Tezos,
    userAddress,
    wallet,
}: {
    Tezos: TezosToolkit;
    userAddress: string;
    wallet: any;
}): JSX.Element => {
    const [recipient, setRecipient] = useState<string>("KT1FYct7DUK1mUkk9BPJEg7AeH7Fq3hQ9ah3");
    const [nftcon1, setNftcon1] = useState<string>("KT1Pj9nj41MTeaTkZ31uU164NLnpd9F2dvfp");
    const [nftid1, setNftid1] = useState<number>(666);
    const [price, setPrice] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const sendTransfer = async (): Promise<void> => {
        if (recipient && price) {
            setLoading(true);
            try {

                // const op = Tezos.wallet
                Tezos.setWalletProvider(wallet);
                const nft1 = nftcon1;
                const nft1tokenId = nftid1;

                const contractName = "KT1UPXeumBHFrtzryDKbWJm3ybQaMgcLShXK";
                const contractName_a = await Tezos.wallet.at("KT19VbSBWrAPn6GkUKa9V5PtXyXZcCk1cRGu");
                const nft1Contract = nft1;
                const nft1Contract_a = await Tezos.wallet.at(nft1);

                const paymentNft = "KT1GBgCd5dk7v4TSzWvtk1X64TxMyG4r7eRX"
                const paymentNft_a = await Tezos.wallet.at("KT1GBgCd5dk7v4TSzWvtk1X64TxMyG4r7eRX");
                const transfer_nft1 = (
                    [
                        {
                            "id": nft1tokenId,
                            "fa2": nft1Contract,
                            "amount": "1",
                            "royalty_addresses":
                                [
                                    "tz1SrztDp8MVcbom6T8FMPSRFns4PGFoFqxx"
                                ],
                        },

                    ]
                );

                const transfer_cost = (
                    [
                        {
                            "id":
                                "0",
                            "fa2":
                                paymentNft,
                            "amount":
                                price * Math.pow(10, 8),
                            "royalty_addresses":
                                [
                                    "KT1GBgCd5dk7v4TSzWvtk1X64TxMyG4r7eRX",
                                ]
                        }
                    ]
                );

                const transfer_param1 = (userAddress);
                const transfer_param2 = (contractName);
                const transfer_param3 = ("0");
                const transfer_param4 = ("0");

                const result = await Tezos.wallet.batch()
                    .withContractCall(nft1Contract_a.methods.update_operators([
                        {
                            add_operator: {
                                owner: userAddress,
                                operator: contractName,
                                token_id: nft1tokenId
                            }
                        }
                    ]))

                    .withContractCall(contractName_a.methods.propose_trade(transfer_param1, transfer_param2, transfer_param3, transfer_param4, transfer_nft1, transfer_cost));

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
        <span>

            <br></br>
            <input
                className="inputfield"
                type="string"
                placeholder="nft1 address"
                onChange={e => setNftcon1(e.target.value)}
            />
            <input
                className="inputfield"
                type="string"
                placeholder="nft1 id"
                onChange={e => setNftid1(parseInt(e.target.value))}
            />
            <br></br>
            <input
                className="inputfield"
                type="number"
                step="0.00000001"
                placeholder="Price"
                onChange={e => setPrice(Number(e.target.value))}
            />

            <button
                className="button-a"
                disabled={!recipient && !price}
                onClick={() => { sendTransfer() }}
            >
                {loading ? (
                    <span>
                        <i className="fas fa-spinner fa-spin"></i>&nbsp; Please wait
                    </span>
                ) : (
                    <span>
                        Insert NFTs
                    </span>
                )}
            </button>
        </span>
    );
};

export default Nft4DeMN_admin_1;
