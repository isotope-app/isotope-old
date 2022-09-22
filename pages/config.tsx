import { create } from "ipfs-http-client";
import { useRef, useState } from "react"
import { useIPFS } from "../hooks/zustand";

export default function Config() {
  const [saveState, setSaveState] = useState(false);
  const ipfsAPIRef = useRef(null);

  const saveConfig = () => {
    if (!ipfsAPIRef || !ipfsAPIRef.current.validity) return;
    useIPFS.setState({ apiAddr: ipfsAPIRef.current.value });
    useIPFS.getState().ipfs.stop()
      .then(() => {
        useIPFS.setState((state) => ({ ipfs: create({ url: state.apiAddr }) }))
      })
  }

  return (
    <div className="p-8 max-w-screen-md mx-auto dark:text-white">
      <h1 className="font-bold italic text-3xl">IPFS Config</h1>
      <hr className="my-4 border-none outline" />
      <div className="flex flex-col">
        <span className="font-medium italic mb-4"><a href="https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-server" className="underline cursor-pointer">ipfs-http-server</a> API address:</span>
        <input
          type="url"
          className="p-2 outline transition-colors dark:bg-black dark:hover:bg-zinc-800 dark:outline-white invalid:outline-dashed invalid:outline-red-600 invalid:bg-red-900"
          placeholder="http://127.0.0.1:5002/"
          onInput={() => { setSaveState(true) }}
          ref={ipfsAPIRef} />
      </div>
      <div className="mt-4 flex justify-end">
        <button onClick={() => { setSaveState(false) }} className={`font-medium transition-colors p-2 ${saveState ? 'outline-dashed outline-yellow-500 bg-yellow-800 hover:bg-yellow-600' : 'outline outline-white hover:bg-zinc-800'}`}>Save</button>
      </div>
    </div>
  )
}