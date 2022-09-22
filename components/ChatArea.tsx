import { useAccounts, useChatRooms, useIPFS } from "../hooks/zustand";
import BlankSlate from "./Blankslate";

export default function ChatArea() {
  const ipfs = useIPFS((state) => state.ipfs);
  const chatRooms = useChatRooms((state) => state.selected)
  const accounts = useAccounts((state) => state.accounts);

  if (!accounts) return ( <BlankSlate title="Not logged in." body="Redirecting to sign in page..." /> )
  if (!ipfs) return ( <BlankSlate title="IPFS is loading" body="Please wait..." /> )
  if (!chatRooms) return ( <BlankSlate title="Welcome to Isotope." body="Create or join a chat room to start." />)

  return (
    <div className="h-full">
      <h3 className="text-2xl font-medium">{chatRooms}</h3>
      <hr className="m-2" />
    </div>
  );
}