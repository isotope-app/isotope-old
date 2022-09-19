import create from 'zustand'

interface Accounts {
  accounts: string[],
  setAccounts: (accounts: string[]) => void,
}

interface Contacts {
  selected: string,
  setSelected: (selected: string) => void,
}

const useAccounts = create<Accounts>((set) => ({
  accounts: [],
  setAccounts: (accounts) => set(() => ({ accounts })),
}))

const useContacts = create<Contacts>((set) => ({
  selected: undefined,
  setSelected: (selected: string) => set(() => ({ selected }))
}))

export { useAccounts, useContacts };