import create from 'zustand'

interface Accounts {
  accounts: string[],
  setAccounts: (accounts: string[]) => void,
}

interface Contacts {
  addresses: string[],
  selected: string,
  setAddresses: (addresses: string[]) => void,
  addAddresses: (addresses: string) => void,
  removeAddress: (addresses: string) => void,
  setSelected: (selected: string) => void,
}

const useAccounts = create<Accounts>((set) => ({
  accounts: [],
  setAccounts: (accounts) => set(() => ({ accounts })),
}))

const useContacts = create<Contacts>((set) => ({
  addresses: [],
  selected: undefined,
  setAddresses: (addresses: string[]) => set(() => ({ addresses })),
  addAddresses: (address: string) => set((state) => ({ addresses: [address, ...state.addresses] })),
  removeAddress: (address: string) => set((state) => ({ addresses: state.addresses.filter((a) => a !== address )})),
  setSelected: (selected: string) => set(() => ({ selected }))
}))

export { useAccounts, useContacts };