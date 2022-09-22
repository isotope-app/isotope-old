import Router from "next/router"
import { useEffect } from "react"
import ChatArea from "../components/ChatArea"
import ChatRooms from "../components/ChatRooms"
import { create } from 'ipfs-http-client'
import { useAccounts, useIPFS } from "../hooks/zustand"

export default function Home() {
  const accounts = useAccounts((state) => state.accounts)

  useEffect(() => {
    if (!accounts[0]) Router.push('/signin?reason=no_address')
  }, [accounts])

  useEffect(() => {
    if (!accounts[0]) return;
    useIPFS.setState({ ipfs: create({ url: "http://127.0.0.1:5002/" }) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="p-8 text-white h-screen">
      <div className="flex justify-between border-b pb-4 mb-4">
        <span className="text-xl font-bold">Isotope</span>
        <span className="">Logged in as {accounts[0]}</span>
      </div>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-1"><ChatRooms /></div>
        <div className="col-span-4"><ChatArea /></div>
      </div>
    </div>
  )
}
