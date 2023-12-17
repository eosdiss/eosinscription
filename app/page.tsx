"use client";

import Image from "next/image";
import { Api, JsonRpc } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig"; // development only

import { createPublicClient, http } from "viem";
import { mainnet, eos } from "viem/chains";

// Rainbow kit
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
// import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { ConnectButton } from "@rainbow-me/rainbowkit";

// const privateKeys = [];
// const signatureProvider = new JsSignatureProvider(privateKeys);
// const api = new Api({ rpc, signatureProvider }); //required to submit transactions
// (async () => {
//   await rpc.get_block(1) //get the first block
// })();

const App = () => {
  // Rainbow kit
  const { chains, publicClient } = configureChains(
    [mainnet, eos],
    [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId: "ab455cb89b96c4a9fcae69ecd97a6643",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  // viem
  // const client = createPublicClient({
  //   chain: mainnet,
  //   transport: http(),
  // });

  const rpc = new JsonRpc("http://eos.newdex.one"); //required to read blockchain state
  // const blockNumber = await client.getBlockNumber();

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          {/* navbar */}
          <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <h2 className="text-2xl font-bold text-white">eosInscription 🌼</h2>
            <ConnectButton />
          </nav>

          {/* chains */}
          <main className="flex min-h-screen flex-col items-start justify-start p-12">
            {/* <div>{blockNumber.toString()}</div> */}
          </main>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};

export default App;
