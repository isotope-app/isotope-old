import Router from "next/router"
import { useEffect } from "react"
import ChatArea from "../components/ChatArea"
import ChatRooms from "../components/ChatRooms"
import { create } from 'ipfs-http-client'
import { useAccounts, useIPFS } from "../hooks/zustand"
import { HiCog } from "react-icons/hi"

export default function Home() {
  const accounts = useAccounts((state) => state.accounts)

  useEffect(() => {
    if (!accounts[0]) Router.push('/signin')
  }, [accounts])

  useEffect(() => {
    if (!accounts[0]) return;
    useIPFS.setState({ ipfs: create({ url: useIPFS.getState().apiAddr }) })
    console.log(useAccounts.getState().publicKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="p-8 text-white h-screen flex flex-col">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">Isotope</span>
        <div className="flex items-center">
          <span className="">Logged in as {accounts[0]}</span>
          <HiCog className="cursor-pointer w-5 h-5 mx-3" onClick={() => { Router.push('/config') }} />
        </div>
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-5 gap-x-8 h-full">
        <div className="col-span-1"><ChatRooms /></div>
        <div className="col-span-4"><ChatArea /></div>
      </div>
    </div>
  )
}
