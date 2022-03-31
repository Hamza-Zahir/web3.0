import React from "react";

const images = {
  BNB: {
    imgsrs:
      "https://chainlist.org/_next/image?url=https%3A%2F%2Fdefillama.com%2Fchain-icons%2Frsz_binance.jpg&w=32&q=75",
  },
  NEON: {
    imgsrs:
      "https://chainlist.org/_next/image?url=%2Funknown-logo.png&w=32&q=75",
  },
  VLX: {
    imgsrs:
      "https://chainlist.org/_next/image?url=https%3A%2F%2Fdefillama.com%2Fchain-icons%2Frsz_velas.jpg&w=32&q=75",
  },
  BCH: {
    imgsrs:
      "https://chainlist.org/_next/image?url=https%3A%2F%2Fdefillama.com%2Fchain-icons%2Frsz_smartbch.jpg&w=32&q=75",
  },

  SHIB: {
    imgsrs:
      "https://chainlist.org/_next/image?url=%2Funknown-logo.png&w=32&q=75",
  },
};

const networks = {
  BNB: {
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
      "wss://bsc-ws-node.nariox.org",
    ],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  NEON: {
    chainId: `0x${Number(245022926).toString(16)}`,
    chainName: "Neon EVM DevNet",
    nativeCurrency: {
      name: "Neon",
      symbol: "NEON",
      decimals: 18,
    },
    rpcUrls: ["https://proxy.devnet.neonlabs.org/solana"],
    blockExplorerUrls: ["https://neon-labs.org/"],
  },
  VLX: {
    chainId: `0x${Number(106).toString(16)}`,
    chainName: "Velas EVM Mainnet",
    nativeCurrency: {
      name: "Velas",
      symbol: "VLX",
      decimals: 18,
    },
    rpcUrls: [
      "https://evmexplorer.velas.com/rpc",
      "https://explorer.velas.com/rpc",
    ],
    blockExplorerUrls: ["https://evmexplorer.velas.com"],
  },
  BCH: {
    chainId: `0x${Number(10000).toString(16)}`,
    chainName: "Smart Bitcoin Cash",
    nativeCurrency: {
      name: "Bitcoin Cash",
      symbol: "BCH",
      decimals: 18,
    },
    rpcUrls: [
      "https://smartbch.greyh.at",
      "https://rpc-mainnet.smartbch.org",
      "https://smartbch.fountainhead.cash/mainnet",
      "https://smartbch.devops.cash/mainnet",
    ],
    blockExplorerUrls: ["https://smartbch.org/"],
  },
  SHIB: {
    chainId: `0x${Number(27).toString(16)}`,
    chainName: "ShibaChain",
    nativeCurrency: {
      name: "SHIBA INU COIN",
      symbol: "SHIB",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.shibachain.net"],
    blockExplorerUrls: ["https://exp.shibachain.net"],
  },
};


const chengNetwork = async (name) => {
  try {
    const { ethereum } = window;
    await ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{ ...networks[name] }],
    });
  } catch (error) {
    console.log(error);
  }
};

function switchNetwork() {
  return (
    <div className="border border-dark w-100  justify-content-center text-dark ">
      {[...Object.keys(networks)].map((chainNet) => {
        return (
          <div
            key={chainNet + 1}
            onClick={() => {
              chengNetwork(chainNet);
            }}
            style={{ cursor: "pointer" }}
            className="chain p-3 fw-bold border-bottom border-dark"
          >
            <img src={images[chainNet].imgsrs} alt="" />
            <span className="ms-3">{chainNet}</span>
          </div>
        );
      })}
    </div>
  );
}

export default switchNetwork;
