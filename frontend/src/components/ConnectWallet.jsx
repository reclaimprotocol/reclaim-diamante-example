import { useState } from "react";

const ConnectWalletButton = ({ onConnectionChange }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [userPublicKey, setUserPublicKey] = useState(null);

  const connectToDiamWallet = async () => {
    if (!window.diam) {
      alert("Diam wallet is not installed. Please install it to proceed.");
      return;
    }

    try {
      const result = await window.diam.connect();
      setIsConnecting(true);

      const publicKey = result.message[0]; // Get the user's public key
      setUserPublicKey(publicKey);
      setIsConnected(true);

      // Notify the higher component
      onConnectionChange({ isConnected: true, userPublicKey: publicKey });
    } catch (error) {
      console.error("Error connecting to Diam wallet:", error);
      alert("Failed to connect to Diam wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div>
      {!isConnected ? (
        <button
          onClick={connectToDiamWallet}
          disabled={isConnecting}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: isConnecting ? "not-allowed" : "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {isConnecting ? "Connecting..." : "Connect to Diam Wallet"}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ConnectWalletButton;
