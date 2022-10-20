import { create } from "ipfs-http-client";
import { useRef, useState } from "react"
import { useIPFS } from "../hooks/zustand";
import { toast } from "react-toastify";

export default function Config() {
  const [saveState, setSaveState] = useState(false);
  const ipfsAPIRef = useRef(null);

  const saveConfig = () => {
    if (!ipfsAPIRef || !ipfsAPIRef.current.validity) return;
    useIPFS.setState({ apiAddr: ipfsAPIRef.current.value });
    useIPFS.setState((state) => ({ ipfs: create({ url: state.apiAddr }) }))
    toast('Saved Config');
    setSaveState(false);
  }

  return (
    <div className="p-8 max-w-screen-md mx-auto dark:text-white">
      <h1 className="font-bold italic text-3xl">IPFS Config</h1>
      <hr className="my-4 border-none outline" />
      <div className="flex flex-col">
        <span className="font-medium italic mb-4"><a href="https://github.com/ipfs/kubo" className="underline cursor-pointer">kubo</a> API address:</span>
        <input
          type="url"
          className="p-2 outline transition-colors dark:bg-black dark:hover:bg-zinc-800 dark:outline-white invalid:outline-dashed invalid:outline-red-600 invalid:bg-red-900"
          placeholder="http://127.0.0.1:5001/"
          onInput={() => { setSaveState(true) }}
          ref={ipfsAPIRef} />
      </div>
      <div className="mt-4 flex justify-end">
        <button onClick={saveConfig} className={`font-medium transition-colors p-2 ${saveState ? 'outline-dashed outline-yellow-500 bg-yellow-800 hover:bg-yellow-600' : 'outline outline-white hover:bg-zinc-800'}`}>Save</button>
      </div>
    </div>
  )
}