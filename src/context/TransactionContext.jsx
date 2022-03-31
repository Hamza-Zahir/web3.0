import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const grtEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
    );
    return transactionContract;
};

export const TransactionProvider = ({ children }) => {
    const [CurrentAccount, setCurrentAccount] = useState();
    const [formData, setFormData] = useState({
        addressTo: "",
        amount: "",
        keyoword: "",
        message: "",
    });
    const [isLoding, setIsLoding] = useState(false);
    const [Transactoins, setTransactoins] = useState([]);


    const checkWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("please install metamask");
            const accountes = await ethereum.request({ method: "eth_accounts" });

            if (accountes.length) {
                setCurrentAccount(accountes[0]);
                getAllTransactions();
            }
        } catch (error) {
            console.log(error);
            throw new Error("no etherum object");
        }
    };
    const getAllTransactions = async () => {
        try {
            if (!ethereum) return alert("please install metamask");
            const transactionContract = grtEthereumContract();
            const availableTransactions =
                await (transactionContract.getAllTransactions());
            const structuredTransactions = availableTransactions.map(
                (transaction, index) => ({
                    id: index + 1,
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / 10 ** 18,
                    message: transaction.message,
                    timestamp: new Date(
                        transaction.timestamp.toNumber() * 1000
                    ).toLocaleString(),
                })
            );

            setTransactoins(structuredTransactions);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("please install metamask");

      await ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        chainId: `0x${Number(56).toString(16)}`,
                        chainName: "Binance Smart Chain Mainnet",
                        nativeCurrency: {
                            name: "Binance Chain Native Token",
                            symbol: "BNB",
                            decimals: 18,
                        },
                        rpcUrls: [
                            "https://bsc-dataseed1.binance.org",
                            "https://bsc-dataseed2.binance.org",
                            "https://bsc-dataseed3.binance.org",
                            "https://bsc-dataseed4.binance.org",
                            "https://bsc-dataseed1.defibit.io",
                            "https://bsc-dataseed2.defibit.io",
                            "https://bsc-dataseed3.defibit.io",
                            "https://bsc-dataseed4.defibit.io",
                            "https://bsc-dataseed1.ninicoin.io",
                            "https://bsc-dataseed2.ninicoin.io",
                            "https://bsc-dataseed3.ninicoin.io",
                            "https://bsc-dataseed4.ninicoin.io",
                            "wss://bsc-ws-node.nariox.org"
                        ],
                        blockExplorerUrls: ["https://bscscan.com"]

                    }
                ]
                 
            });
            const accountes = await ethereum.request({
                method: "eth_requestAccounts",
            })
        
            setCurrentAccount(accountes[0]);
        } catch (error) {
            console.log(error);
            throw new Error("no etherum object");
        }
    };
    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("please install metamask");
            const { addressTo, amount, keyoword, message } = formData;
            const transactionContract = grtEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: "eth_sendTransaction",
                params: [
                    {
                        from: CurrentAccount,
                        to: addressTo,
                        gas: "0x5208",
                        value: parsedAmount._hex,
                    },
                ],
            });
            const transactionHash = await transactionContract.addToBlockchain(
                addressTo,
                parsedAmount,
                message,
                keyoword
            );

            setIsLoding(true);
            console.log(`loading ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoding(false);
            console.log(`success ${transactionHash.hash}`);

            window.reload();
        } catch (error) {
            console.log(error);
            throw new Error("no etherum object");
        }
    };
    useEffect(() => {
        checkWalletIsConnected();

        if (!CurrentAccount) {
            connectWallet();
        }
        

    });




    return (
        <TransactionContext.Provider
            value={{
                connectWallet,
                CurrentAccount,
                formData,
                handleChange,
                sendTransaction,
                Transactoins,
                isLoding,

            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};

