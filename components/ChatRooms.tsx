import { useEffect, useRef } from "react";
import { HiUserAdd, HiUserRemove, HiOutlineChatAlt2 } from 'react-icons/hi';
import { useChatRooms } from "../hooks/zustand";

export default function ChatRooms() {
  const chatRooms = useChatRooms();
  const inputRef = useRef(null);

  const addChatRoom = () => {
    if (!inputRef || !inputRef.current.value) return;
    if (!chatRooms) {
      useChatRooms.setState({ rooms: [inputRef.current.value] })
    } else {
      if (chatRooms.rooms.includes(inputRef.current.value)) return;
      chatRooms.addRoom(inputRef.current.value);
    }
    inputRef.current.value = "";
  }

  useEffect(() => {
    const sessionChatRooms = window.localStorage.getItem('chatrooms');
    if (!sessionChatRooms) return;
    useChatRooms.setState({ rooms: JSON.parse(sessionChatRooms) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!chatRooms) return;
    window.localStorage.setItem('chatrooms', JSON.stringify(chatRooms.rooms));
  }, [chatRooms]);

  return (
    <div className='flex flex-col justify-between h-full'>
      {!chatRooms ? (<span>There are no rooms.</span>) : chatRooms.rooms.map((a) => (
        <div className={`px-4 flex justify-between items-center ${chatRooms.selected === a ? 'bg-zinc-800 border-l-4' : 'bg-inherit border-none'}`} key={`room-${a}`}>
          <span>{a}</span>
          <div className="flex">
            <div className='p-2'><HiOutlineChatAlt2 className='w-5 h-5 cursor-pointer' onClick={() => useChatRooms.setState({ selected: a })} /></div>
            <div className='p-2'><HiUserRemove className='w-5 h-5 cursor-pointer' onClick={() => { chatRooms.removeRoom(a) }} /></div>
          </div>
        </div>
      ))}
      <div className='flex items-center justify-between'>
        <input className='bg-black caret-white outline-none p-2 border-b' placeholder='Room name' ref={inputRef}></input>
        <div className='p-4' onClick={addChatRoom}>
          <HiUserAdd className='w-5 h-5 cursor-pointer' />
        </div>
      </div>
    </div>
  )
}