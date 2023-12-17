import Image from 'next/image'
import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';  // development only

import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export default async function Home() {

  const client = createPublicClient({
    chain: mainnet,
    transport: http(),
  })

  const rpc = new JsonRpc('http://eos.newdex.one'); //required to read blockchain state

  // const privateKeys = [];
  // const signatureProvider = new JsSignatureProvider(privateKeys);
  // const api = new Api({ rpc, signatureProvider }); //required to submit transactions
  // (async () => { 
  //   await rpc.get_block(1) //get the first block
  // })();

  const blockNumber = await client.getBlockNumber()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>{blockNumber.toString()}</div>
    </main>
  )

  
}
