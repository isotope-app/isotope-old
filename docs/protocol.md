# Deuterium

Protocol used by isotope.

## Diagram notation

```
+================+    +------------------+
| encrypted data |    | unencrypted data |
+================+    +------------------+
```

## Join event:

When a user wants to join a channel, they will first need to send their public
key, their wallet address, and as well as a signed message to prove their
identity. If the user failed to prove their identity, a termination event will
be sent. There will also be a verify field to store the message authentication
code(MAC).

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
---
```

## Accepted event

When a user is accepted into the channel, the channel's creator will first get
the X and Y coordinates from the public key in order to perform a Diffie-Hellman
key exchange with the user that wants to join the channel. After performing the
key exchange, the server will send the generated public key back to the user,
encrypted using the public key of the user. The blob will also be signed, in
order to prove the channel creator's identity. A verify field is also provided
to store the MAC.

### Diagram

```
+------+==============+
| 0x06 | msgpack blob |
+------+==============+
```

### MessagePack blob

```
---
publicKey:  string
signature:  string
verify:     string
---
```

## Denied event

When a user is denied for joining into the channel, a denied event will be sent.

### Diagram

```
+------+
| 0x15 |
+------+
```

## Termination event

When a user is failed to prove their identity, key exchange failed, the channel
creator kicks the user, or the it failed to send a beat event for longer than 5
seconds, the channel creator will send a termination event to the user, as well
as invalidating the group key that was created earlier.

### Diagram

```
+------+
| 0x24 |
+------+
```

## Request for rotate event

When a request for rotate event is sent to all the users in the room, and when
the users receive this event, they will all send a join event mentioned above.
Then, a new group key will be generated.

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
a message event. The MessagePack blob will also be encrypted using the group key
that was created earlier in the key exchange. The blob will also contain an
index, which will be updated every time a message is sent to prevent replay
attacks. The verify field is provided to prevent message tampering.

### Diagram

```
+------+==============+
| 0x02 | msgpack blob |
+------+==============+
```

### MessagePack Blob

```
---
  content:  string
  id:       number
  verify:   string
---
```
