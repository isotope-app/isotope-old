import { useEffect, useRef, useState } from "react";
import { HiUserAdd, HiUserRemove, HiOutlineChatAlt2 } from 'react-icons/hi';

export default function Contacts() {
  const [contacts, setContacts] = useState<string[] | undefined>(undefined);
  const inputRef = useRef(null);

  const addContact = () => {
    if (!inputRef || !inputRef.current.value || contacts.includes(inputRef.current.value)) return;
    if (!contacts) {
      setContacts([inputRef.current.value]);
    } else {
      setContacts([inputRef.current.value, ...contacts]);
    }
  }

  const removeContact = (address: string) => {
    setContacts(contacts.filter((a) => a !== address))
  }

  useEffect(() => {
    const sessionContacts = window.sessionStorage.getItem('contacts');
    if (!sessionContacts) return;
    setContacts(JSON.parse(sessionContacts));
  }, []);

  useEffect(() => {
    if (!contacts) return;
    window.sessionStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className='flex flex-col justify-between h-full'>
      {!contacts ? (<span>Contacts is empty.</span>) : contacts.map((a) => (
        <div className='flex justify-between items-center'>
          <span>{a}</span>
          <div className="flex">
            <div className='p-2'><HiOutlineChatAlt2 className='w-5 h-5' /></div>
            <div className='p-2'><HiUserRemove className='w-5 h-5' onClick={() => { removeContact(a) }} /></div>
          </div>
        </div>
      ))}
      <div className='flex items-center justify-between'>
        <input className='bg-black caret-white outline-none p-2 border-b' placeholder='Address' ref={inputRef}></input>
        <div className='p-4' onClick={addContact}>
          <HiUserAdd className='w-5 h-5' />
        </div>
      </div>
    </div>
  )
}