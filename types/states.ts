import type { IPFSHTTPClient } from 'ipfs-http-client/dist/src/types';

interface Accounts {
  accounts: string[],
  publicKey: any,
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

export type { Accounts, ChatRooms, IPFSNode };