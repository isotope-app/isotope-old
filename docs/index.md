<div align="center"><b><i>A peer to peer messaging app built using web3 technology.</i></b></div>

## About

Isotope is built using IPFS for information exchange, metamask for encryption
and verification, and next.js for the web interface. It is a messaging app that
allows you to send messages to anyone in the world, without the need for a
server. It is a decentralized application, meaning that it is not controlled by
any single entity, and is not subject to censorship. It is also anonymous,
meaning that no one can see who you are, or who you are talking to. It is also
free, and open source, meaning that you can use it for free, and you can see how
it works.

## How it works

When first opening the app, you will be asked to connect your metamask wallet,
and also providing your public encryption key. This is necessary for the app to
send and encrypt your messages.

Once you have connected your wallet, you can either create or join a chatroom.
In that chatroom, every message sent will be encrypted using the encryption key
of every one else that is in the room. They will be able to find the message
that was encrypted using their key, and then decrypt and read the message.

This is made possible using the _Publish/Subscribe_, aka the pubsub feature of
IPFS.

|     ![pubsub figure](https://docs.libp2p.io/concepts/assets/publish-subscribe/subscribed_peers.png)     |
| :-----------------------------------------------------------------------------------------------------: |
| _Some peers subscribed to a common topic. [source](https://docs.libp2p.io/concepts/publish-subscribe/)_ |

When someone sends a message, it is published to the IPFS network, and then
every node that is subscribed to that topic will receive the message.

| ![publishing a message to a topic](https://docs.libp2p.io/concepts/assets/publish-subscribe/message_delivered_to_all.png) |
| :-----------------------------------------------------------------------------------------------------------------------: |
|              _Publishing a message to a topic. [source](https://docs.libp2p.io/concepts/publish-subscribe/)_              |

When a node receives a message, it will check if it is encrypted using its
encryption key. If it is, it will decrypt the message, and then display it to
the user.

IPFS uses libp2p for its networking, and libp2p uses a protocol called
_gossipsub_ for its pubsub feature. It is named after the fact that peers gossip
to each other about which messages they have seen and use this information to
maintain a message delivery network. [Here](http://arxiv.org/abs/2007.02754) is
the arXiv paper for _gossipsub_.

## How to use

First, you need IPFS installed. You can find the downloads
[here](https://ipfs.io).

Then, change the CORS config of ipfs to allow isotope to interact with it.

If you are using the command line version of IPFS, set the
`Access-Control-Allow-Methods` to `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`, and
`Access-Control-Allow-Origin` to `*` by running the following command:

```bash
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST", "OPTIONS"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
```

If you are using the graphical interface version of IPFS, you can change the
CORS config by going to `Settings > IPFS Config` and add the following to the
`HTTPHeaders` section:

```json
"HTTPHeaders": {
  "Access-Control-Allow-Methods": [
    "PUT",
    "GET",
    "POST",
    "OPTIONS"
  ],
  "Access-Control-Allow-Origin": [
    "*"
  ]
}
```

Then, clone the repo and install the dependencies:

```bash
git clone https://github.com/not-ivy/isotope.git && cd isotope
yarn # or npm install
```
Then, run the app:

```bash
yarn build && yarn start # or npm run build && npm run start
```

