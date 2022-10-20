import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useAccounts, useChatRooms, useIPFS } from "../hooks/zustand";
import BlankSlate from "./Blankslate";
import { Message } from '@libp2p/interface-pubsub';
import { toast } from "react-toastify";
import { encryptMessage } from "../utils/ethereum";

export default function ChatArea() {
  const ipfs = useIPFS((state) => state.ipfs);
  const selectedChat = useChatRooms((state) => state.selected)
  const accounts = useAccounts((state) => state.accounts);
  const publicKey = useAccounts((state) => state.publicKey)
  const [subscribeStatus, setSubscribeStatus] = useState<boolean | Error>(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [members, setMembers] = useState<string[]>([accounts[0]]);
  const textInputRef = useRef(null);

  const sendMessage = (event: string, content: any) => {
    ipfs.pubsub.publish(selectedChat, new TextEncoder().encode(JSON.stringify({ event: 'message', ...content })))
  }

  const onReceieve = (msg: Message) => {
    const decodedMessage = JSON.parse(new TextDecoder().decode(msg.data));
    switch (decodedMessage.event) {
      case 'join':
        sendMessage('members', { members })
        setMessages([...messages, `${decodedMessage.address} with public key ${decodedMessage.publicKey} has joined.`]);
        break;
      case 'members':
        if (decodedMessage.members.length >= members.length) {
          setMembers(decodedMessage.members);
        }
        break;
      default:
        break;
    }
  }

  const onSend = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key !== 'Enter') return;
    if (!textInputRef.current.value) return;
    textInputRef.current.value = '';
    sendMessage('message', { content: encryptMessage(publicKey, textInputRef.current.value) })
  }

  useEffect(() => {
    if (!ipfs || !selectedChat) return;
    setSubscribeStatus(false);
    ipfs.pubsub.ls().then((subscribed) => {
      if (subscribed.includes(selectedChat)) return;
    });
    ipfs.pubsub.subscribe(selectedChat, onReceieve)
      .then(() => {
        setSubscribeStatus(true);
        sendMessage('join', { publicKey, address: accounts[0] })
      })
      .catch((e: any) => {
        setSubscribeStatus((e as Error));
        console.error(e);
        toast.error(
          <div>
            <span>Failed to subscribe to topic.</span> <br />
            <span>Is <i className="italic">kubo</i> connected?</span> <br />
            <span className="text-zinc-600" >{Intl.DateTimeFormat(navigator.language, { dateStyle: 'short', timeStyle: 'short' }).format(new Date())}</span>
          </div>
        );
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ipfs, selectedChat])

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
          onKeyUp={onSend}
          type="text"
          placeholder={`Message ${selectedChat}`} />
      </div>
    </div>
  );
}