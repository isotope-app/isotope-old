import * as sigUtil from '@metamask/eth-sig-util'
import { useAccounts } from '../hooks/zustand';
// import { randomUUID } from 'crypto';

/*
handleSignMessage = ({ publicAddress, nonce }) => {
    return new Promise((resolve, reject) =>
      web3.personal.sign(
        web3.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
        publicAddress,
        (err, signature) => {
          if (err) return reject(err);
          return resolve({ publicAddress, signature });
        }
      )
    );
  };
 */

// function authenticate(address: string) {
// }

function encryptMessage(publicKey: string, message: string) {
  return sigUtil.encrypt({
    publicKey,
    data: message,
    // https://github.com/MetaMask/eth-sig-util/blob/v4.0.0/src/encryption.ts#L40
    version: "x25519-xsalsa20-poly1305"
  });
}

// eth_decrypt to decrypt

export { encryptMessage };