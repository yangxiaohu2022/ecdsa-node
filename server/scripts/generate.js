const secp = require('ethereum-cryptography/secp256k1')
const utils = require('ethereum-cryptography/utils')

// type of Uint8Array
const privateKey = secp.secp256k1.utils.randomPrivateKey()
const publicKey = secp.secp256k1.getPublicKey(privateKey)
const hex = utils.toHex(privateKey)

console.log('private key: ', utils.toHex(privateKey))
console.log('public key: ', utils.toHex(publicKey))