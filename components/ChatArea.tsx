import { useEffect } from "react";
import { useAccounts, useChatRooms, useIPFS } from "../hooks/zustand";
import BlankSlate from "./Blankslate";
import { Message } from '@libp2p/interface-pubsub';
import { toast } from "react-toastify";

export default function ChatArea() {
  const ipfs = useIPFS((state) => state.ipfs);
  const selectedChat = useChatRooms((state) => state.selected)
  const accounts = useAccounts((state) => state.accounts);

  const decodeMsg = (msg: Message) => console.log(new TextDecoder().decode(msg.data))

  useEffect(() => {
    if (!ipfs || !selectedChat) return;
    ipfs.pubsub.subscribe(selectedChat, decodeMsg)
      .catch((e: any) => {
        console.error(e);
        toast.error(
          <div>
            <span>Failed to subscribe to topic.</span> <br />
            <span>Is the <i className="italic">ipfs-http-server</i> running?</span> <br />
            <span className="text-zinc-600" >{Intl.DateTimeFormat(navigator.language, { dateStyle: 'short', timeStyle: 'short' }).format(new Date())}</span>
          </div>
        );
      })
  }, [ipfs, selectedChat])

  if (!accounts) return (<BlankSlate title="Not logged in." body="Redirecting to sign in page..." />)
  if (!ipfs) return (<BlankSlate title="IPFS is loading" body="Please wait..." />)
  if (!selectedChat) return (<BlankSlate title="Welcome to Isotope." body="Create or join a chat room to start." />)

  return (
    <div className="h-full">
      <h3 className="text-2xl font-medium text-center">{selectedChat}</h3>
    </div>
  );
}