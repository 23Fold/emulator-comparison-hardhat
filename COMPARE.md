# Gas Comparison

Both the emulator and sophon testnet are used to compare the gas used for an ERC20 token deployment and 10 transfers.

## Emulator

```javascript
Deploying ERC20 on emulatorDevnet...
✅ ERC20 deployed at: 0x4567d92db579e333a334529d7d503A42D56e5dFB on emulatorDevnet
Deployment Cost: 355772
Performing 10 transfers...
Transfer 1 Gas Used: 227068
Transfer 2 Gas Used: 207558
Transfer 3 Gas Used: 188028
Transfer 4 Gas Used: 182238
Transfer 5 Gas Used: 182232
Transfer 6 Gas Used: 182238
Transfer 7 Gas Used: 182232
Transfer 8 Gas Used: 182232
Transfer 9 Gas Used: 182232
Transfer 10 Gas Used: 182238
Total Gas Used for 10 Transfers: 1898296
```

## zkSync Sepolia

```javascript
Starting deployment process of "MyERC20Token"...
Estimated deployment cost: 0.00004458005 ETH
Estimated gas to be used: 1783202
Actual gas used: 786611

Performing 10 transfers...
Transfer 1 Gas Used: 178623
Transfer 2 Gas Used: 76491
Transfer 3 Gas Used: 76491
Transfer 5 Gas Used: 76491
Transfer 6 Gas Used: 76491
Transfer 7 Gas Used: 76491
Transfer 9 Gas Used: 76491
Transfer 10 Gas Used: 76491
Total Gas Used for 10 Transfers: 714060
```

## Sophon Testnet

```javascript
Estimated deployment cost: 2.09836 ETH
Estimated gas used: 209836
Performing 10 transfers...
Transfer 1 Gas Used: 98536
Transfer 2 Gas Used: 92986
Transfer 3 Gas Used: 92986
Transfer 5 Gas Used: 92986
Transfer 6 Gas Used: 92986
Transfer 8 Gas Used: 92986
Transfer 10 Gas Used: 92986
Total Gas Used for 10 Transfers: 656452
```

## Conclusion

Sophon testnet is 60% cheaper to deploy and more than 50% cheaper to transfer on.
