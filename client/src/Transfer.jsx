import React, { useState } from "react";
import server from "./server";
import {ecdsaSign} from 'ethereum-cryptography/secp256k1-compat'
import {keccak256} from 'ethereum-cryptography/keccak'
import {toHex, utf8ToBytes} from 'ethereum-cryptography/utils'

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  console.log('transfer outter private key', privateKey)

  async function transfer(evt) {
    evt.preventDefault();

  console.log('transfer inner private key', privateKey)

    try {
      const params = {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
      }
      const hash = utf8ToBytes(JSON.stringify(params))
      const signature = ecdsaSign(hash, privateKey).signature

      console.log('hash signature', hash, signature)
      params.hash = hash
      params.signature = signature
      
      const {
         balance ,
      } = await server.post(`api/send`, params);
      setBalance(balance);
    } catch (ex) {
      console.error(ex.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
