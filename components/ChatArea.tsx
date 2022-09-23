import { useEffect, useRef, useState } from "react";
import { useAccounts, useChatRooms, useIPFS } from "../hooks/zustand";
import BlankSlate from "./Blankslate";
import { Message } from '@libp2p/interface-pubsub';
import { toast } from "react-toastify";

export default function ChatArea() {
  const ipfs = useIPFS((state) => state.ipfs);
  const selectedChat = useChatRooms((state) => state.selected)
  const accounts = useAccounts((state) => state.accounts);
  const [subscribeStatus, setSubscribeStatus] = useState<boolean | Error>(false);
  const [messages, setMessages] = useState<string[]>([]);
  const textInputRef = useRef(null);

  useEffect(() => {
    if (!ipfs || !selectedChat) return;
    ipfs.pubsub.ls().then((subscribed) => {
      if (subscribed.includes(selectedChat)) {
        return;
      }
    })
    ipfs.pubsub.subscribe(selectedChat, (msg: Message) => { setMessages([...messages, new TextDecoder().decode(msg.data)]) })
      .then(() => setSubscribeStatus(true))
      .catch((e: any) => {
        setSubscribeStatus((e as Error));
        console.error(e);
        toast.error(
          <div>
            <span>Failed to subscribe to topic.</span> <br />
            <span>Is the <i className="italic">ipfs-http-server</i> running?</span> <br />
            <span className="text-zinc-600" >{Intl.DateTimeFormat(navigator.language, { dateStyle: 'short', timeStyle: 'short' }).format(new Date())}</span>
          </div>
        );
      })
  }, [ipfs, selectedChat, messages])

  useEffect(() => {
    console.log(`Subscribed to topic: ${subscribeStatus.toString()}`)
  }, [subscribeStatus])

  if (accounts.length === 0) return (<BlankSlate title="Not logged in." body="Redirecting to sign in page..." />)
  if (!ipfs) return (<BlankSlate title="IPFS is loading" body="Please wait..." />)
  if (!selectedChat) return (<BlankSlate title="Welcome to Isotope." body="Create or join a chat room to start." />)
  if (!subscribeStatus) return (<BlankSlate title="Subscribing to topic" body="Please wait..." />)
  if (subscribeStatus instanceof Error) return (<BlankSlate title="Failed to subscribe to topic" body="Check the console for details." />)

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-medium text-center">{selectedChat}</h3>
        <div className="flex flex-col">
          {messages.map((m, index) => (
            <span key={`message-${index}`}>
              {m} {Intl.DateTimeFormat(navigator.language, { dateStyle: 'short', timeStyle: 'short' }).format(new Date())}
            </span>
          ))}
        </div>
      </div>
      <div className="outline">
        <input
          className="outline-none bg-black text-white w-full p-4"
          ref={textInputRef}
          onKeyUp={(ev) => {
            if (ev.key !== 'Enter') return;
            if (!textInputRef.current.value) return;
            ipfs.pubsub.publish(selectedChat, new TextEncoder().encode(textInputRef.current.value))
            textInputRef.current.value = '';
          }}
          type="text"
          placeholder={`Message ${selectedChat}`} />
      </div>
    </div>
  );
}