// import * as sigUtil from '@metamask/eth-sig-util'
import { encrypt } from 'eth-sig-util';
import { ethers } from 'ethers';
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

function encryptMessage(encryptionKey: string, message: string) {
  return ethers.utils.hexlify(
    Buffer.from(
      JSON.stringify(
        // sigUtil.encrypt({
        //   publicKey,
        //   data: message,
        //   // https://github.com/MetaMask/eth-sig-util/blob/v4.0.0/src/encryption.ts#L40
        //   version: "x25519-xsalsa20-poly1305"
        // })
        encrypt(
          encryptionKey,
          { data: message },
          'x25519-xsalsa20-poly1305',
        ),
      )
    )
  )
}

function decryptMessage(ethereum: any, message: string, address: string) {
  return ethereum.request({
    method: 'eth_decrypt',
    params: [message, address],
  })
    .catch((error: any) => console.log(error));
}

export { encryptMessage, decryptMessage };