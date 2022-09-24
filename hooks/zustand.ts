import create from 'zustand'
import { Accounts, ChatRooms, IPFSNode } from '../types/states';

const useAccounts = create<Accounts>((set) => ({
  accounts: [],
  publicKey: undefined,
}))

const useChatRooms = create<ChatRooms>((set) => ({
  rooms: [],
  selected: undefined,
  addRoom: (room: string) => set((state) => ({ rooms: [room, ...state.rooms] })),
  removeRoom: (room: string) => set((state) => ({ rooms: state.rooms.filter((r) => r !== room) })),
}))

const useIPFS = create<IPFSNode>((set) => ({
  ipfs: undefined,
  apiAddr: 'http://127.0.0.1:5002/',
}))

export { useAccounts, useChatRooms, useIPFS };