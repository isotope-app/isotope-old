import Image from 'next/image';
import metamaskIcon from '../public/metamask-fox.svg'
import { useAccounts, useEthereum } from '../hooks/zustand';
import Router from 'next/router';
import { toast } from 'react-toastify';

export default function Signin() {
  const metamaskLogin = () => {
    const ethereum = (window as any).ethereum;
    if (!ethereum) {
      toast.error('Could not detect metamask.')
      return;
    }
    useEthereum.setState({ ethereum });
    ethereum.request({ method: 'eth_requestAccounts' })
      .then(() => ethereum.request({ method: 'eth_accounts' }))
      .then((accounts: string[]) => { useAccounts.setState({ accounts }) })
      .then(() => ethereum.request({ method: 'eth_getEncryptionPublicKey', params: [useAccounts.getState().accounts[0]] }))
      .then((publicKey: string) => { useAccounts.setState({ publicKey }) })
      .then(() => Router.push('/'))
      .catch((e: any) => toast.error(e.toString()))
  }

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
