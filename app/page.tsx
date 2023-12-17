import Image from "next/image";
import { Api, JsonRpc } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig"; // development only

import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { ChainsForm } from "./_components/chains-form";

export default async function Home() {
  const client = createPublicClient({
    chain: mainnet,
    transport: http(),
  });

  const rpc = new JsonRpc("http://eos.newdex.one"); //required to read blockchain state

  // const privateKeys = [];
  // const signatureProvider = new JsSignatureProvider(privateKeys);
  // const api = new Api({ rpc, signatureProvider }); //required to submit transactions
  // (async () => {
  //   await rpc.get_block(1) //get the first block
  // })();

  const blockNumber = await client.getBlockNumber();

  return (
    <>
      {/* navbar */}
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <h2 className="text-2xl font-bold text-teal-50">eosInscription</h2>
      </nav>

      {/* chains */}
      <main className="flex min-h-screen flex-col items-start justify-start p-12">
        <ChainsForm />
        <div>{blockNumber.toString()}</div>
      </main>
    </>
  );
}
