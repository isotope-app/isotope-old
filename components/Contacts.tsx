import { useEffect, useRef } from "react";
import { HiUserAdd, HiUserRemove, HiOutlineChatAlt2 } from 'react-icons/hi';
import { useContacts } from "../hooks/zustand";

export default function Contacts() {
  const contacts = useContacts();
  const inputRef = useRef(null);

  const addContact = () => {
    if (!inputRef || !inputRef.current.value) return;
    if (!contacts) {
      contacts.setAddresses([inputRef.current.value])
    } else {
      if (contacts.addresses.includes(inputRef.current.value)) return;
      contacts.addAddresses(inputRef.current.value);
    }
  }

  useEffect(() => {
    const sessionContacts = window.sessionStorage.getItem('contacts');
    if (!sessionContacts) return;
    contacts.setSelected(JSON.parse(sessionContacts));
  }, []);

  useEffect(() => {
    if (!contacts) return;
    window.sessionStorage.setItem('contacts', JSON.stringify(contacts.addresses));
  }, [contacts]);

  return (
    <div className='flex flex-col justify-between h-full'>
      {!contacts ? (<span>Contacts is empty.</span>) : contacts.addresses.map((a) => (
        <div className='flex justify-between items-center' key={`contacts-${a}`}>
          <span>{a}</span>
          <div className="flex">
            <div className='p-2'><HiOutlineChatAlt2 className='w-5 h-5 cursor-pointer' onClick={() => contacts.setSelected(a)} /></div>
            <div className='p-2'><HiUserRemove className='w-5 h-5 cursor-pointer' onClick={() => { contacts.removeAddress(a) }} /></div>
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