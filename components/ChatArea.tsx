import { useChatRooms } from "../hooks/zustand";

export default function ChatArea() {
  const chatRooms = useChatRooms((state) => state.selected)

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