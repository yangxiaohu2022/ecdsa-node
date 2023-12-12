import React from "react";
import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1'
import {toHex} from 'ethereum-cryptography/utils'

function Wallet({ address, setAddress, balance, setBalance , privateKey, setPrivateKey}) {
  async function onChange(evt) {
    const privateKey = evt.target.value;

    setPrivateKey(privateKey)

    console.log('setPrivateKey', privateKey)

    const address = toHex(secp.secp256k1.getPublicKey(privateKey))
    setAddress(address);

    if (address) {
      const {
         balance 
      } = await server.get(`api/balance/${address}`);
      setBalance(balance);
      console.log('balance: ', balance)
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key:
        <input type="text" placeholder="Type an private key" value={privateKey} onChange={onChange}></input>
      </label>
       <p>
        Address:
        {address}
      </p>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
