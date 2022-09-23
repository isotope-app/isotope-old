import Image from 'next/image';
import metamaskIcon from '../public/metamask-fox.svg'
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAccounts } from '../hooks/zustand';
import Router from 'next/router';
import { toast } from 'react-toastify';

export default function Signin() {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | undefined | Error>(undefined);

  const metamaskLogin = () => {
    if (provider instanceof Error) {
      toast.error('Could not detect metamask.')
      return;
    }
    provider.send('eth_requestAccounts', [])
      .then(() => provider.send('eth_accounts', []))
      .then((accounts) => { useAccounts.setState({ accounts }) })
      .then(() => Router.push('/'))
      .catch((e: any) => toast.error(e.toString()))
  }

  useEffect(() => {
    try {
      setProvider(new ethers.providers.Web3Provider((window as any).ethereum));
    } catch (e) { setProvider(e); }
  }, []);

  if (!provider) return;

  if (Router.query.reason === 'no_address') toast.error(
    <div>
      <span>Sign in to continue.</span> <br />
      <span className="text-zinc-600" >{Intl.DateTimeFormat(navigator.language, { dateStyle: 'short', timeStyle: 'short' }).format(new Date())}</span>
    </div>
  );

  return (
    <div className='mx-auto max-w-screen-md flex flex-col justify-center items-center border-white border rounded-lg p-8 w-full'>
      <h3 className='text-center text-2xl font-semibold text-white'>Sign in to Isotope</h3>
      <hr className='m-8 w-3/4' />
      <div className='flex items-center bg-white rounded-md cursor-pointer' onClick={metamaskLogin}>
        <div className='relative w-10 h-10 px-8'><Image src={metamaskIcon} layout='fill' objectFit='contain' alt='metamask icon' /></div>
        <span className='rounded-r-md font-bold text-xl text-[#ffffff] bg-[#f6851b] py-4 px-4'>Continue using MetaMask</span>
      </div>
    </div>
  )
}
