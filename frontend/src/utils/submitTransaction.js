export async function submitTransaction(proof) {
  try {
    if (!window.diam) {
      console.error("DIAM Wallet is not installed or not detected.");
      alert("Please install DIAM Wallet to proceed.");
      return;
    }
    const result = await window.diam.connect();
    const userPublicKey = result.message.data[0].diamPublicKey;

    if (!userPublicKey) {
      console.error("Failed to retrieve public key from DIAM Wallet.");
      alert("Could not connect to DIAM Wallet.");
      return;
    }

    const response = await fetch("http://localhost:3001/create-transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userPublicKey,
        key: proof.identifier,
        value: "verified",
      }),
    });

    const { unsignedTransactionXDR } = await response.json();
    if (!unsignedTransactionXDR) {
      console.error("Failed to retrieve unsigned transaction XDR.");
      alert("Could not create the transaction.");
      return;
    }
    const signedTransactionResponse = await window.diam.sign(
      unsignedTransactionXDR,
      false,
      "Diamante Testnet 2024"
    );
    const signedTransactionXDR = signedTransactionResponse.message.data;
    console.log(
      "Signed Transaction XDR from DIAM Wallet:",
      signedTransactionXDR
    );

    const submitResponse = await fetch(
      "http://localhost:3001/submit-transaction",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signedTransactionXDR }),
      }
    );

    const res = await submitResponse.json();

    return res.hash;
  } catch (error) {
    console.error("Error managing data:", error.message);
  }
}
