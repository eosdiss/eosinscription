"use client";

import Image from "next/image";
import { Api, JsonRpc } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig"; // development only

import { createPublicClient, http } from "viem";
import { eos } from "viem/chains";

// Rainbow kit
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
// import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import ChainForm from "./_components/chain-form";
import InscriptionForm from "./_components/inscription-form";
import ReceivedAddress from "./_components/received-address";
import MintAmount from "./_components/mint-amount";

// const privateKeys = [];
// const signatureProvider = new JsSignatureProvider(privateKeys);
// const api = new Api({ rpc, signatureProvider }); //required to submit transactions
// (async () => {
//   await rpc.get_block(1) //get the first block
// })();

const App = () => {
  // Rainbow kit
  const { chains, publicClient } = configureChains(
    [eos],
    // @ts-ignore
    [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "EOS Inscription App",
    projectId: "ab455cb89b96c4a9fcae69ecd97a6643",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  const rpc = new JsonRpc("http://eos.newdex.one"); //required to read blockchain state

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          {/* navbar */}
          <nav className="flex items-center justify-between flex-wrap bg-teal-500 px-12 py-6">
            <h2 className="text-3xl font-bold text-white">EOSInscription 🌼</h2>
            <ConnectButton />
          </nav>

          {/* hero */}
          <div className="flex flex-col items-center justify-center mt-12 mb-6 gap-3">
            <h3 className="text-neutral-950 text-4xl font-bold tracking-tight">
              EOS Inscription Tool
            </h3>
            <p className="text-muted-foreground">
              Mint inscriptions on EOS chain.
            </p>
          </div>

          {/* chains */}
          <main className="flex min-h-screen flex-col items-start justify-start px-12">
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="flex flex-col gap-6">
                <ChainForm />
                <InscriptionForm />
                <ReceivedAddress />
                <MintAmount />
              </div>
            </div>
          </main>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};

export default App;
