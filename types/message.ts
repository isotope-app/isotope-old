import type { EthEncryptedData } from '@metamask/eth-sig-util';

interface JoinMessage {
  event: 'join',
  publicKey: string,
  address: string,
}

type Member = { address: string, publicKey: string };

interface MemberMessage {
  event: 'member',
  publicKey: string,
  address: string,
}

type EncryptedMessage = { address: string, message: EthEncryptedData };

interface TextMessage {
  event: 'message',
  author: string,
  content: EncryptedMessage[],
}

export type { JoinMessage, MemberMessage, EncryptedMessage, Member, TextMessage };