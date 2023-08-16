import { TezosToolkit } from "@taquito/taquito";
import React, { useState } from "react";

const Rewards_admin_5 = ({
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
    const [nftcon2, setNftcon2] = useState<string>("KT1Pj9nj41MTeaTkZ31uU164NLnpd9F2dvfp");
    const [nftcon3, setNftcon3] = useState<string>("KT1Pj9nj41MTeaTkZ31uU164NLnpd9F2dvfp");
    const [nftcon4, setNftcon4] = useState<string>("KT1Pj9nj41MTeaTkZ31uU164NLnpd9F2dvfp");
    const [nftcon5, setNftcon5] = useState<string>("KT1Pj9nj41MTeaTkZ31uU164NLnpd9F2dvfp");

    const [nftid1, setNftid1] = useState<number>(666);
    const [nftid2, setNftid2] = useState<number>(666);
    const [nftid3, setNftid3] = useState<number>(666);
    const [nftid4, setNftid4] = useState<number>(666);
    const [nftid5, setNftid5] = useState<number>(666);

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
                const nft2 = nftcon2;
                const nft2tokenId = nftid2;
                const nft3 = nftcon3;
                const nft3tokenId = nftid3;
                const nft4 = nftcon4;
                const nft4tokenId = nftid4;
                const nft5 = nftcon5;
                const nft5tokenId = nftid5;
                const contractName = "KT19VbSBWrAPn6GkUKa9V5PtXyXZcCk1cRGu";
                const contractName_a = await Tezos.wallet.at("KT19VbSBWrAPn6GkUKa9V5PtXyXZcCk1cRGu");
                const nft1Contract = nft1;
                const nft1Contract_a = await Tezos.wallet.at(nft1);
                const nft2Contract = nft2;
                const nft2Contract_a = await Tezos.wallet.at(nft2);
                const nft3Contract = nft3;
                const nft3Contract_a = await Tezos.wallet.at(nft3);
                const nft4Contract = nft4;
                const nft4Contract_a = await Tezos.wallet.at(nft4);
                const nft5Contract = nft5;
                const nft5Contract_a = await Tezos.wallet.at(nft5);
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
                        {
                            "id":
                                nft2tokenId,
                            "fa2":
                                nft2Contract,
                            "amount":
                                "1",
                            "royalty_addresses":
                                [
                                    "tz1XQZVcQbSA56cf5ZKGGeM9jH4qzfwYL8rk",
                                ]
                        },
                        {
                            "id":
                                nft3tokenId,
                            "fa2":
                                nft3Contract,
                            "amount":
                                "1",
                            "royalty_addresses":
                                [
                                    "tz1XQZVcQbSA56cf5ZKGGeM9jH4qzfwYL8rk",
                                ]
                        },
                        {
                            "id":
                                nft4tokenId,
                            "fa2":
                                nft4Contract,
                            "amount":
                                "1",
                            "royalty_addresses":
                                [
                                    "tz1XQZVcQbSA56cf5ZKGGeM9jH4qzfwYL8rk",
                                ]
                        },
                        {
                            "id":
                                nft5tokenId,
                            "fa2":
                                nft5Contract,
                            "amount":
                                "1",
                            "royalty_addresses":
                                [
                                    "tz1XQZVcQbSA56cf5ZKGGeM9jH4qzfwYL8rk",
                                ]
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
                    .withContractCall(nft2Contract_a.methods.update_operators([
                        {
                            add_operator: {
                                owner: userAddress,
                                operator: contractName,
                                token_id: nft2tokenId
                            }
                        }
                    ]))
                    .withContractCall(nft3Contract_a.methods.update_operators([
                        {
                            add_operator: {
                                owner: userAddress,
                                operator: contractName,
                                token_id: nft3tokenId
                            }
                        }
                    ]))
                    .withContractCall(nft4Contract_a.methods.update_operators([
                        {
                            add_operator: {
                                owner: userAddress,
                                operator: contractName,
                                token_id: nft4tokenId
                            }
                        }
                    ]))
                    .withContractCall(nft5Contract_a.methods.update_operators([
                        {
                            add_operator: {
                                owner: userAddress,
                                operator: contractName,
                                token_id: nft5tokenId
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
                type="string"
                placeholder="nft2 address"
                onChange={e => setNftcon2(e.target.value)}
            />
            <input
                className="inputfield"
                type="string"
                placeholder="nft2 id"
                onChange={e => setNftid2(parseInt(e.target.value))}
            />
            <br></br>
            <input
                className="inputfield"
                type="string"
                placeholder="nft3 address"
                onChange={e => setNftcon3(e.target.value)}
            />
            <input
                className="inputfield"
                type="string"
                placeholder="nft3 id"
                onChange={e => setNftid3(parseInt(e.target.value))}
            />
            <br></br>
            <input
                className="inputfield"
                type="string"
                placeholder="nft4 address"
                onChange={e => setNftcon4(e.target.value)}
            />
            <input
                className="inputfield"
                type="string"
                placeholder="nft4 id"
                onChange={e => setNftid4(parseInt(e.target.value))}
            />
            <br></br>
            <input
                className="inputfield"
                type="string"
                placeholder="nft5 address"
                onChange={e => setNftcon5(e.target.value)}
            />
            <input
                className="inputfield"
                type="string"
                placeholder="nft5 id"
                onChange={e => setNftid5(parseInt(e.target.value))}
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

export default Rewards_admin_5;
