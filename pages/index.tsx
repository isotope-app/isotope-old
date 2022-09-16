import Router from "next/router"
import { useEffect } from "react"
import { useAccounts } from "../hooks/zustand"

export default function Home() {
  const accounts = useAccounts((state) => state.accounts)

  useEffect(() => {
    if (!accounts[0]) Router.push('/signin?reason=no_address')
  }, [])

  return (
    <div className="p-8 text-white">
      <div className="flex justify-between border-b pb-4">
        <span className="text-xl font-bold">Isotope</span>
        <span className="">Logged in as {accounts[0]}</span>
      </div>
    </div>
  )
}
