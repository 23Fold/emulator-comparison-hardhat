import type { HardhatUserConfig } from "hardhat/config";

import "@matterlabs/hardhat-zksync";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const config: HardhatUserConfig = {
  defaultNetwork: "sophonTestnet",
  networks: {
    hardhat: {
      zksync: true,
    },
    emulatorDevnet: {
      url: "http://35.184.110.151:3050",
      chainId: 270,
      accounts: [process.env.WALLET_PRIVATE_KEY as string],
    },
    sophonMainnet: {
      url: "https://rpc.sophon.xyz",
      ethNetwork: "mainnet",
      verifyURL: "https://verification-explorer.sophon.xyz/contract_verification",
      browserVerifyURL: "https://explorer.sophon.xyz/",
      enableVerifyURL: true,
      zksync: true,
      accounts: [process.env.WALLET_PRIVATE_KEY as string],
    },
    sophonTestnet: {
      url: "https://rpc.testnet.sophon.xyz",
      ethNetwork: "sepolia",
      verifyURL: "https://api-explorer-verify.testnet.sophon.xyz/contract_verification",
      browserVerifyURL: "https://explorer.testnet.sophon.xyz/",
      enableVerifyURL: true,
      zksync: true,
      accounts: [process.env.WALLET_PRIVATE_KEY as string],
    },
    zkSyncSepoliaTestnet: {
      url: "https://sepolia.era.zksync.dev",
      ethNetwork: "sepolia",
      zksync: true,
      verifyURL: "https://explorer.sepolia.era.zksync.dev/contract_verification",
      accounts: process.env.WALLET_PRIVATE_KEY ? [process.env.WALLET_PRIVATE_KEY] : [],
    },
  },
  zksolc: {
    version: "latest",
    settings: {},
  },
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  etherscan: {
    enabled: true,
    apiKey: {
      sophonTestnet: process.env.ETHERSCAN_SOPHON_API_KEY as string,
      sophonMainnet: process.env.ETHERSCAN_SOPHON_API_KEY as string,
    },
    customChains: [
      {
        network: "sophonTestnet",
        chainId: 531050104,
        urls: {
          apiURL: "https://api-testnet.sophscan.xyz/api",
          browserURL: "https://testnet.sophscan.xyz",
        },
      },
      {
        network: "sophonMainnet",
        chainId: 50104,
        urls: {
          apiURL: "https://api.sophscan.xyz/api",
          browserURL: "https://sophscan.xyz",
        },
      },
    ],
  },
};

export default config;
