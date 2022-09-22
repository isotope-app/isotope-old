import type { IPFSHTTPClient } from 'ipfs-http-client/dist/src/types';
import create from 'zustand'

interface Accounts {
  accounts: string[],
}

interface ChatRooms {
  rooms: string[],
  selected: string,
  addRoom: (room: string) => void,
  removeRoom: (room: string) => void,
}

interface IPFSNode {
  ipfs: IPFSHTTPClient | undefined,
  apiAddr: string,
}

const useAccounts = create<Accounts>((set) => ({
  accounts: [],
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