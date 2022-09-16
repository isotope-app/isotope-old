import create from 'zustand'

interface Accounts {
  accounts: string[],
  setAccounts: (accounts: string[]) => void,
}

interface Contacts {
  addresses: string[],
  setAddresses: (addresses: string[]) => void,
  addAddress: (address: string) => void,
}

const useAccounts = create<Accounts>((set) => ({
  accounts: [],
  setAccounts: (accounts) => set(() => ({ accounts })),
}))

const useContacts = create<Contacts>((set) => ({
  addresses: [],
  setAddresses: (addresses) => set(() => ({ addresses })),
  addAddress: (address) => set((state) => ({ addresses: [address, ...state.addresses] }))
}))

export { useAccounts, useContacts };