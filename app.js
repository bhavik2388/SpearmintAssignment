const { ethers } = require('ethers');
const config = require('./config');
const provider = new ethers.providers.WebSocketProvider(config.WSS_RPC_PROVIDER);
const wallet = new ethers.Wallet(config.PRIVATE_KEY, provider);

const tokenA = "0xaB1a4d4f1D656d2450692D237fdD6C7f9146e814";
const tBNB = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";

let routerContract,factoryContract
try {
  routerContract = new ethers.Contract(config.PANCAKESWAP_ROUTER_ADDRESS.testnet, config.PANCAKE_ROUTER_ABI, wallet);
  factoryContract= new ethers.Contract(config.PANCAKESWAP_FACTORY_ADDRESS.testnet, config.PANCAKE_FACTORY_ABI, wallet);
  
} catch (error) {
  console.log(error)
}

async function main() {

  // Define the BSC liquidity pool contract address and ABI
  const liquidityPoolAddress = await factoryContract.getPair(tokenA,tBNB);
  const liquidityPoolAbi = require("./pairABI.json")

  const liquidityPoolContract = new ethers.Contract(liquidityPoolAddress, liquidityPoolAbi, provider);

  // Define the event you want to listen to 
  const eventName = config.EVENT_NAME;


  // Subscribe to the event
  liquidityPoolContract.on(eventName, async (from, amount) => {
    console.log("-------------------- Liquidity added ----------------------")
    let payload = {
      Event: eventName,
      From: from,
      Amount: amount.toString()
    }
    console.table(payload)

    
    let amountToSwap = "0.001"
    const currentTime = new Date();
    const tenMinutesLater = new Date(currentTime.getTime() + 10 * 60 * 1000);
    const unixTimestamp = Math.floor(tenMinutesLater.getTime() / 1000); 
    let swap = await routerContract.swapExactETHForTokens(0,[tBNB,tokenA],config.USER_ADDRESS,unixTimestamp,{value: ethers.utils.parseEther(amountToSwap), gasLimit:config.GAS_LIMIT})
    console.log("Swap transaction has been processed with transaction hash:",swap.hash)
  });

  console.log(`Listening for ${eventName} events...`);

  // Keep the script running
  process.stdin.resume();
}

main().catch((error) => {
  console.error('Error:', error);
});
