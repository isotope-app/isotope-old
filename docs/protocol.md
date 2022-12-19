## Diagram notation

```
+================+    +------------------+
| encrypted data |    | unencrypted data |
+================+    +------------------+
```

## Join event:

When a user wants to join a channel, they will first need to send their public
key, their wallet address, and as well as a digital signature to prove their
identity. If the user failed to prove their identity, a termination event will
be sent. An id is also provided to ensure the originality of the message.

### Diagram

```
+------+--------------+
| 0x05 | msgpack blob |
+------+--------------+
```

### MessagePack blob

```
---
  publicKey:  string
  address:    string
  signature:  string
  id:         number
---
```

## Accepted event

When a user is accepted into the channel, the channel's creator will first get
the X and Y coordinates from the public key in order to perform a Diffie-Hellman
key exchange with the user that wants to join the channel. After performing the
key exchange, the server will send the generated group key back to the user,
encrypted using the public key of the user. A digital signature is also required
by the channel creator. A message authentication code is also used instead of id
that was used previously to protect the integrity of the event, and GMAC will be
used as the algorithm to generate authentication codes.

### Diagram

```
+------+==============+
| 0x06 | msgpack blob |
+------+==============+
```

### MessagePack blob

```
---
  groupKey:   string
  signature:  string
  mac:        string
---
```

## Termination event

When a user is denied for entry, failed to prove their identity, key exchange
failed, the channel creator kicks the user, or the it failed to send a beat
event for longer than 5 seconds, the channel creator will send a termination
event to the user, as well as invalidating the group key that was created
earlier. A MessagePack blob will be sent with the request as well, in order to
indicate the reason why the connection was terminated.

### Diagram

```
+------+--------------+
| 0x24 | msgpack blob |
+------+--------------+
```

### MessagePack blob

```
---
  reason:   string
---
```

## Request for rotate event

When a request for rotate event is sent to all the users in the room, and when
the users receive this event, they will all send a join event mentioned above.
Then, a new group key will be generated. The request for rotate event will be
automatically sent by the channel creator every minute.

### Diagram

```
+------+
| 0x16 |
+------+
```

## Beat event

Beat event is sent periodically by the user to the channel creator every second.

### Diagram

```
+------+
| 0x07 |
+------+
```

## Message event

When the user sends a message, it will be first signed, and then converted into
a message event. The MessagePack blob will also be encrypted using the
X25519-XSalsa-Poly1305 algorithm, which uses the group key that was created
earlier in the key exchange. A message authentication code(MAC) is also used
instead of an index, since we already have the shared group key. A separate
digital signature is also required. Last but not least, a timestamp must be
provided.

### Diagram

```
+------+==============+
| 0x02 | msgpack blob |
+------+==============+
```

### MessagePack Blob

```
---
  address:    string
  publicKey:  string
  content:    string
  signature:  string
  mac:        string
  timestamp:  number
---
```
