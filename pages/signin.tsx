import Image from 'next/image';
import metamaskIcon from '../public/metamask-fox.svg'
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAccounts } from '../hooks/zustand';
import Router from 'next/router';

export default function Signin() {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | undefined | Error>(undefined);

  const metamaskLogin = () => {
    if (provider instanceof Error) {
      return;
    }
    provider.send('eth_requestAccounts', [])
      .then(() => provider.send('eth_accounts', []))
      .then((accounts) => { useAccounts.setState({ accounts }) })
      .then(() => Router.push('/'))
  }

  useEffect(() => {
    try {
      setProvider(new ethers.providers.Web3Provider((window as any).ethereum));
    } catch (e) { setProvider(e); }
  }, []);

  if (!provider) return;

  return (
    <main className='flex flex-col justify-center items-center p-8 text-white'>
      <div className={`${Router.query.reason === 'no_address' ? 'block' : 'hidden'} max-w-screen-md border-2 rounded-md border-rose-600 text-rose-600 font-medium p-8 flex justify-center items-center w-full`}><span>You are not signed in.</span></div>
      <hr className='m-8 border-none' />
      <div className='max-w-screen-md flex flex-col justify-center items-center border-white border rounded-lg p-8 w-full'>
        <h3 className='text-center text-2xl font-semibold'>Sign in to Isotope</h3>
        <hr className='m-8 w-3/4' />
        <div className='flex items-center bg-white rounded-md cursor-pointer' onClick={metamaskLogin}>
          <div className='relative w-10 h-10 px-8'><Image src={metamaskIcon} layout='fill' objectFit='contain' /></div>
          <span className='rounded-r-md font-bold text-xl text-[#ffffff] bg-[#f6851b] py-4 px-4'>Continue using MetaMask</span>
        </div>
      </div>
    </main>
  )
}
