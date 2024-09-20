# Chainpay

**Chainpay** is a decentralized platform designed to streamline the process of sending bulk cryptocurrency transactions, specifically on the **Solana blockchain**, to multiple wallet addresses in one seamless operation. Built with a modern tech stack and optimized for speed and security, Chainpay ensures users can send bulk transactions effortlessly while keeping track of their activity with a robust history and billing system.

## Key Features

### 1. **Bulk Transaction Processing**
   - Send transactions in bulk to multiple wallet addresses in a single click.
   - Supports up to 50 recipients depending on the subscription plan.

### 2. **Google Authentication**
   - Secure and fast login via Google OAuth.

### 3. **Network Switching (Solana)**
   - Seamlessly switch between `devnet` and `mainnet` environments to test or execute live transactions.
   - **Solana RPC URL** is integrated to manage on-chain interactions.

### 4. **Dashboard**
   - Post-login, the dashboard provides:
     - Overview of recent transactions.
     - Total transaction count.
     - Total number of recipients managed.
   
### 5. **Send Transaction Page**
   - Add recipients with required details: name, email, wallet address, and country.
   - Wallet addresses must be verified before adding recipients.
   - A table with filter functionality helps manage and select recipients for bulk payments.
   - Initiate payments to multiple recipients in one click.

### 6. **Payment History Page**
   - View details of all transactions:
     - Time and date.
     - Signature (Solana transaction hash).
     - Wallet address and country.
   - The table allows filtering by signature, wallet address, name, country, or date range.

### 7. **Billing and Subscription Management**
   - Users must subscribe to access the full functionality:
     - **Free Plan**: Send payments to up to 3 wallet addresses in one click.
     - **Silver Plan**: Send payments to up to 5 wallet addresses in one click.
     - **Gold Plan**: Send payments to up to 10 wallet addresses in one click.
   - If a user tries to exceed their subscription limit, they are redirected to the billing page.
   - View billing history, including account details and transaction signatures, in a user-friendly UI.

### 8. **Wallet Connection**
   - For sending transactions, users must connect a Solana-compatible wallet, such as **Phantom** or **Backpack**.

### 9. **Logout**
   - Users can log out, which clears the session and redirects them to the home page.

---

## Tech Stack

**Chainpay** leverages the following technologies to deliver a smooth, high-performance experience:

- **TypeScript**: Provides type safety and scalability.
- **Next.js**: Powers the server-side rendering, routing, and overall web framework.
- **React.js**: Frontend built with modular and reusable components.
- **Mongoose**: Simplifies interaction with the **MongoDB** database.
- **MongoDB**: Stores user data, transaction details, and recipient information.
- **Solana Blockchain**: Powers the cryptocurrency transactions and wallet interactions.
- **Vercel**: Deployment platform for hosting, offering seamless CI/CD and serverless capabilities.

---

## Installation and Setup

### Prerequisites

- **Node.js** and **npm** (or **yarn**)
- **MongoDB** for storing user and transaction data.
- **Solana Wallet** (Phantom or Backpack) for sending payments.
- **Google OAuth** credentials for authentication.

### Steps to Set Up

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/chainpay.git
   ```

2. **Install Dependencies**:
   ```bash
   cd chainpay
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env.local` file in the root directory with `.env.example` the following:
   ```env
   NEXT_PUBLIC_RPC_URL="your_solana_rpc_url"
   .
   .
   .
   .
   .
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the app.

5. **Database Setup**:
   Ensure MongoDB is running and properly connected via the `DATABASE_URL` in the `.env`.

---

## How to Use

### 1. **Login**
   - Use the Google authentication to securely log in to Chainpay.

### 2. **Dashboard**
   - After login, view an overview of your total transactions and recent activity.

### 3. **Send Transactions**
   - Go to the "Send Transaction" page to add verified recipients.
   - Select recipients and send payments in bulk with a single click.

### 4. **Payment History**
   - Review detailed transaction history, filter results as needed, and track payments made.

### 5. **Billing**
   - Subscribe to a plan to send transactions, and view your billing history at any time.

---

## Demo and Video Tutorial

For a step-by-step walkthrough of Chainpay, check out this video:

[![Chainpay Demo](https://img.youtube.com/vi/3vQOutdw7GE/maxresdefault.jpg)](https://www.youtube.com/watch?v=3vQOutdw7GE)

---

## Contributions

We welcome contributions! Here’s how you can contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add a feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

---

## License

This project is licensed under the **MIT License**. Please see the [LICENSE](LICENSE) file for more information.

---

## Contact

Feel free to reach out for any questions or issues:

- **Twitter**: https://x.com/NishantTechie
- **GitHub**: [https://github.com/nishantcoder108/chainpay](https://github.com/nishantcoder108/chainpay)

---

## IMPORTANT COMMANDS

```bash
 # It will revert the commit
 git reset --hard CommitHashedc5dd4e1d3cefea259e7
```

```bash
   # For generating random secret key
   $ openssl rand -base64 32
```


