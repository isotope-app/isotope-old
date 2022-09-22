import { useChatRooms, useIPFS } from "../hooks/zustand";
import { useState } from "react";

export default function ChatArea() {
  const ipfs = useIPFS((state) => state.ipfs);
  const chatRooms = useChatRooms((state) => state.selected)


  if (!ipfs) return (
    <div>
      <h3 className="text-center m-4 text-2xl font-medium">Please wait...</h3>
      <p className="text-center">IPFS is loading</p>
    </div>
  )

  if (!chatRooms) return (
    <div>
      <h3 className="text-center m-4 text-2xl font-medium">Welcome to Isotope.</h3>
      <p className="text-center">Create or join a chatroom to start.</p>
    </div>
  )

  return (
    <div className="h-full">
      <h3 className="text-2xl font-medium">{chatRooms}</h3>
      <hr className="m-2" />
    </div>
  );
}