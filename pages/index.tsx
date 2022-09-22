import Router from "next/router"
import { useEffect } from "react"
import ChatArea from "../components/ChatArea"
import ChatRooms from "../components/ChatRooms"
import * as IPFS from "ipfs-core";
import { useAccounts, useIPFS } from "../hooks/zustand"

export default function Home() {
  const accounts = useAccounts((state) => state.accounts)

  useEffect(() => {
    if (!accounts[0]) Router.push('/signin?reason=no_address')
  }, [accounts])

  useEffect(() => {
    if (!accounts[0]) return;
    IPFS.create().then((node) => useIPFS.setState({ ipfs: node }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="p-8 text-white h-screen">
      <div className="flex justify-between border-b pb-4 mb-4">
        <span className="text-xl font-bold">Isotope</span>
        <span className="">Logged in as {accounts[0]}</span>
      </div>
      <div className="grid grid-cols-6 gap-8">
        <div className="col-span-1"><ChatRooms /></div>
        <div className="col-span-4"><ChatArea /></div>
      </div>
    </div>
  )
}
