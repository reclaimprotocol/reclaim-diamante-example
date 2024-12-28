const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const DiamSdk = require("diamnet-sdk");
const crypto = require("crypto");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post("/create-transaction", async (req, res) => {
  try {
    const { userPublicKey, key, value } = req.body;

    console.log("Received public key:", userPublicKey);

    if (!userPublicKey || !/^G[A-Z0-9]{55}$/.test(userPublicKey)) {
      throw new Error("Invalid or missing public key.");
    }

    const hashIdentifier = crypto
      .createHash("sha256")
      .update(key)
      .digest("hex")
      .slice(0, 64);

    const server = new DiamSdk.Aurora.Server(
      "https://diamtestnet.diamcircle.io/"
    );
    const account = await server.loadAccount(userPublicKey);

    const transaction = new DiamSdk.TransactionBuilder(account, {
      fee: await server.fetchBaseFee(),
      networkPassphrase: DiamSdk.Networks.TESTNET,
    })
      .addOperation(
        DiamSdk.Operation.manageData({
          name: hashIdentifier,
          value: value,
        })
      )
      .setTimeout(0)
      .build();

    const unsignedTransactionXDR = transaction.toXDR();
    res.json({ unsignedTransactionXDR });
  } catch (error) {
    console.error("Error in create-transaction:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post("/submit-transaction", async (req, res) => {
  try {
    const { signedTransactionXDR } = req.body;

    if (!signedTransactionXDR || typeof signedTransactionXDR !== "string") {
      throw new Error("Invalid or missing signed transaction XDR.");
    }

    const server = new DiamSdk.Aurora.Server(
      "https://diamtestnet.diamcircle.io/"
    );

    const transaction = DiamSdk.TransactionBuilder.fromXDR(
      signedTransactionXDR,
      DiamSdk.Networks.TESTNET
    );
    const result = await server.submitTransaction(transaction);
    res.json(result);
  } catch (error) {
    console.error("Error in submit-transaction:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
