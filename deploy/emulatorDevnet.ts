import * as dotenv from "dotenv";
import * as hre from "hardhat";
import { ethers, Wallet, ContractFactory, Contract, Provider } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { abi, bytecode } from "../artifacts/contracts/erc20/MyERC20Token.sol/MyERC20Token.json";

dotenv.config();

async function deployERC20(hre: HardhatRuntimeEnvironment) {
  console.log(`Deploying ERC20 on ${hre.network.name}...`);

  const provider = new ethers.JsonRpcProvider(hre.network.config.url);
  const wallet = new Wallet(process.env.WALLET_PRIVATE_KEY as string, provider);

  const factory = new ContractFactory(abi, bytecode, wallet);

  const contract = await factory.deploy();

  const token = await contract.waitForDeployment();
  console.log(`✅ ERC20 deployed at: ${contract.target} on ${hre.network.name}`);
  const deploymentHash = token.deploymentTransaction()?.hash;
  if (!deploymentHash) {
    throw new Error("Deployment hash not found");
  }
  const deploymentReceipt = await provider.getTransactionReceipt(deploymentHash);
  console.log(`Deployment Cost: ${deploymentReceipt?.gasUsed}`);

  return { token, wallet, provider };
}

async function performTransfers(token: Contract, provider: Provider) {
  console.log("Performing 10 transfers...");

  const recipient = ethers.Wallet.createRandom().address;
  const amount = ethers.parseEther("1");

  let totalGasUsed = BigInt(0);

  for (let i = 0; i < 10; i++) {
    const tx = await token.transfer(recipient, amount);
    //wait for the transaction to be mined
    await tx.wait();
    const receipt = await provider.getTransactionReceipt(tx.hash);
    if (receipt) {
      console.log(`Transfer ${i + 1} Gas Used: ${receipt.gasUsed.toString()}`);
      totalGasUsed = totalGasUsed + receipt.gasUsed;
    } else {
      console.log(`Transfer ${i + 1} failed`);
    }
  }

  console.log(`Total Gas Used for 10 Transfers: ${totalGasUsed.toString()}`);
  return totalGasUsed;
}

async function main() {
  // Deploy to ZKSync Era
  const tokenData = await deployERC20(hre);
  const sophonGasUsed = await performTransfers(
    tokenData.token as any as Contract,
    tokenData.provider as any as Provider
  );

  console.log("\n=== GAS USAGE COMPARISON ===");
  console.log(`Sophon Testnet Gas Used: ${sophonGasUsed.toString()}`);
}

main().catch(console.error);
