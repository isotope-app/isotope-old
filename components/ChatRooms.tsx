import { useEffect, useRef } from "react";
import { HiUserAdd, HiUserRemove, HiOutlineChatAlt2 } from 'react-icons/hi';
import { useChatRooms } from "../hooks/zustand";

export default function ChatRooms() {
  const chatRooms = useChatRooms();
  const inputRef = useRef(null);

  const addContact = () => {
    if (!inputRef || !inputRef.current.value) return;
    if (!chatRooms) {
      chatRooms.setRooms([inputRef.current.value])
    } else {
      if (chatRooms.rooms.includes(inputRef.current.value)) return;
      chatRooms.addRoom(inputRef.current.value);
    }
  }

  useEffect(() => {
    const sessionChatRooms = window.sessionStorage.getItem('chatrooms');
    if (!sessionChatRooms) return;
    chatRooms.setRooms(JSON.parse(sessionChatRooms));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!chatRooms) return;
    window.sessionStorage.setItem('chatrooms', JSON.stringify(chatRooms.rooms));
  }, [chatRooms]);

  return (
    <div className='flex flex-col justify-between h-full'>
      {!chatRooms ? (<span>Contacts is empty.</span>) : chatRooms.rooms.map((a) => (
        <div className='flex justify-between items-center' key={`contacts-${a}`}>
          <span>{a}</span>
          <div className="flex">
            <div className='p-2'><HiOutlineChatAlt2 className='w-5 h-5 cursor-pointer' onClick={() => chatRooms.setSelected(a)} /></div>
            <div className='p-2'><HiUserRemove className='w-5 h-5 cursor-pointer' onClick={() => { chatRooms.removeRoom(a) }} /></div>
          </div>
        </div>
      ))}
      <div className='flex items-center justify-between'>
        <input className='bg-black caret-white outline-none p-2 border-b' placeholder='Address' ref={inputRef}></input>
        <div className='p-4' onClick={addContact}>
          <HiUserAdd className='w-5 h-5 cursor-pointer' />
        </div>
      </div>
    </div>
  )
}