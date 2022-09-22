import { useEffect } from "react";
import { useAccounts, useChatRooms, useIPFS } from "../hooks/zustand";
import BlankSlate from "./Blankslate";
import { Message } from '@libp2p/interface-pubsub';

export default function ChatArea() {
  const ipfs = useIPFS((state) => state.ipfs);
  const selectedChat = useChatRooms((state) => state.selected)
  const accounts = useAccounts((state) => state.accounts);

  const decodeMsg = (msg: Message) => console.log(new TextDecoder().decode(msg.data))

  useEffect(() => {
    if (!ipfs || !selectedChat) return;
    ipfs.pubsub.subscribe(selectedChat, decodeMsg).then(() => console.log(`subscribed to ${selectedChat}`))
  }, [ipfs, selectedChat])

  if (!accounts) return ( <BlankSlate title="Not logged in." body="Redirecting to sign in page..." /> )
  if (!ipfs) return ( <BlankSlate title="IPFS is loading" body="Please wait..." /> )
  if (!selectedChat) return ( <BlankSlate title="Welcome to Isotope." body="Create or join a chat room to start." />)

  return (
    <div className="h-full">
      <h3 className="text-2xl font-medium">{selectedChat}</h3>
      <hr className="m-2" />
    </div>
  );
}