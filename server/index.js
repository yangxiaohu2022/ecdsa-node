const express = require("express");
const compression = require('compression')
const cors = require("cors");
const generate = require('./scripts/generate')
const { secp256k1 } = require('ethereum-cryptography/secp256k1')

const app = express();
const port = 3042;

app.use(compression())
app.use(cors());
app.use(express.json());

const balances = {
  "030e2e93d97c7dba600d3ad766bdc5d6150db56d8c1faa1e8dfe1a1edde6afac18": 100,  //private key: 77f6d594fc4c317c831fbe8b04333599fad7de28d12d9b42ccc6613e0e37d2d9
  "02e054d27dc0ac798ac03a191d95d8779e8c17850106ce2ecf5e2b33de35e17724": 50,  //private key: 24d31eff35ba7670b55bd4197c59333d32ccec5690c43ac5f89e7bdfd7ef08a2
  "025289e28448cad8d72842f804da8a61368c1c752bffaa7c4ec963780d92578c88": 75, //private key: d399a7802091d847053da5cf0bac26dcacd125199e3c89be2a0df1209d1f8d86
};

app.get("/api/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/api/send", (req, res) => {
  // TODO: get a signature from the client-side application
  // recover the public address from the signature

  const { sender, recipient, amount, hash, signature } = req.body;

  const isValid = secp256k1.verify(signature, hash, sender)

  if (!isValid) {
    res.status(400).send({ message: "Invalid transfer!"});
    return
  }

  console.log('校验成功')

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
