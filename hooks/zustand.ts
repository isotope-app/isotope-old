import { IPFS } from 'ipfs-core-types';
import create from 'zustand'

interface Accounts {
  accounts: string[],
  setAccounts: (accounts: string[]) => void,
}

interface ChatRooms {
  rooms: string[],
  selected: string,
  setRooms: (rooms: string[]) => void,
  addRoom: (room: string) => void,
  removeRoom: (room: string) => void,
  setSelected: (selected: string) => void,
}

interface IPFSNode {
  ipfs: IPFS | undefined,
}

const useAccounts = create<Accounts>((set) => ({
  accounts: [],
  setAccounts: (accounts) => set(() => ({ accounts })),
}))

const useChatRooms = create<ChatRooms>((set) => ({
  rooms: [],
  selected: undefined,
  setRooms: (rooms: string[]) => set(() => ({ rooms })),
  addRoom: (room: string) => set((state) => ({ rooms: [room, ...state.rooms] })),
  removeRoom: (room: string) => set((state) => ({ rooms: state.rooms.filter((r) => r !== room )})),
  setSelected: (selected: string) => set(() => ({ selected }))
}))

const useIPFS = create<IPFSNode>((set) => ({
  ipfs: undefined,
}))

export { useAccounts, useChatRooms, useIPFS };