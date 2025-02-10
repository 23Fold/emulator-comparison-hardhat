import * as dotenv from "dotenv";
import { deployContract, GENERAL_PAYMASTER_PARAMS, getProvider } from "./utils";
import { Contract, ethers, Provider } from "ethers";
import { utils } from "zksync-ethers";
dotenv.config();

async function performTransfers(token: Contract, provider: Provider) {
  console.log("Performing 10 transfers...");

  const recipient = ethers.Wallet.createRandom().address;
  const amount = ethers.parseEther("1");

  let totalGasUsed = BigInt(0);

  for (let i = 0; i < 10; i++) {
    const tx = await token.transfer(recipient, amount);
    const receipt = await provider.getTransactionReceipt(tx.hash);
    if (receipt) {
      console.log(`Transfer ${i + 1} Gas Used: ${receipt.gasUsed.toString()}`);
      totalGasUsed = totalGasUsed + receipt.gasUsed;
    }
  }

  console.log(`Total Gas Used for 10 Transfers: ${totalGasUsed.toString()}`);
  return totalGasUsed;
}

async function main() {
  // Deploy to Sophon Testnet
  const tokenData = await deployContract(
    "MyERC20Token",
    [],
    {
      noVerify: true,
    },
    false
  );
  const provider = getProvider();
  const sophonGasUsed = await performTransfers(tokenData, provider);

  console.log("\n=== GAS USAGE COMPARISON ===");
  console.log(`Sophon Testnet Gas Used: ${sophonGasUsed.toString()}`);
}

main().catch(console.error);
