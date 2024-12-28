# Verify Proofs on Diamante Chain Using Reclaim Starterpack

This project provides a secure and efficient method for proof verification using the Reclaim protocol and Diamante blockchain. The workflow leverages off-chain proof verification for computational efficiency and on-chain proof registration for data immutability and high transaction throughput.

## Features

1. **Proof Verification**:
   - Leverages Reclaim infrastructure for computationally intensive tasks.
2. **On-Chain Proof Registration**:
   - Utilizes Diamante’s Account Storage Layer to immutably store proof identifiers and metadata.
3. **Efficient Data Management**:
   - Stores only essential data on-chain to optimize costs and blockchain storage.
4. **Verification Workflow**:
   - Query proof verification status from Diamante’s Account Storage Layer.
   - Cross-reference on-chain identifiers with off-chain records for detailed proof data.

## Project Structure

```
.
├── backend
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
└── frontend
    ├── package-lock.json
    ├── package.json
    ├── public
		├── src
		│   ├── App.css
		│   ├── App.jsx
		│   ├── components
		│   ├── index.css
		│   ├── main.jsx
		│   └── utils
		├── tailwind.config.js
		└── vite.config.js
```

## Key Files

### Frontend

### `frontend/src/App.jsx`

- Handles proof verification and transaction submission.
- Integrates Reclaim SDK for generating proof requests.
- Connects to Diamante Wallet for submitting transactions.
- Displays a QR code for users to scan and verify proofs.

### `frontend/src/utils/submitTransaction.js`

- Manages interaction with Diamante Wallet and submits transactions.
- Connects to the backend API to create and submit transactions.

### Backend

### `backend/index.js`

- Provides endpoints for creating and submitting transactions to the Diamante blockchain.
- Uses the Diamante SDK to interact with the blockchain.

## Setup and Installation

### Prerequisites

- Node.js and npm installed.
- Diamante [Wallet extension](https://chromewebstore.google.com/detail/diam-wallet/ghncoolaiahphiaccmhdofdfkdokbljk) installed.
- Diamante Testnet account and access to the [Diamante Faucet](https://diamantefaucet.com/).

### Installation Steps

1. Clone the repository:

   ```
   git clone https://gitlab.reclaimprotocol.org/starterpacks/reclaim-diamante-example.git
   cd reclaim-diamante-example
   ```

2. Install dependencies for the backend and frontend:

   ```
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Start the backend:

   ```
   cd backend
   node index.js
   ```

4. Start the frontend:

   ```
   cd frontend
   npm run dev
   ```

5. Access the frontend at `http://localhost:5173` and ensure the backend is running on `http://localhost:3001`.

## Usage

1. Connect your Diamante Wallet using the provided button on the app.
2. Generate a proof request by clicking "Create Claim."
3. Scan the QR code displayed to start the verification process.
4. Verify the proof using the Reclaim SDK and submit the transaction.
5. Check the transaction details on the [Diamante Explorer](https://testnetexplorer.diamante.io/).

## Important Notes

- Replace the placeholders for `APP_ID`, `APP_SECRET`, and `PROVIDER_ID` in `App.jsx` with your actual Reclaim credentials.
- Ensure the Diamante Wallet is installed and connected to the Testnet.
