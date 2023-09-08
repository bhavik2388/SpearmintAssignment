module.exports = {

    USER_ADDRESS:"0xb4CB6422944469E58dec25812848A1f8535a0C27",
    PRIVATE_KEY:"93e0a8947d9bfd817562d5ae1779d877b20b3cc11759808564d36bf30e6f5f09",

    WSS_RPC_PROVIDER :"wss://small-warmhearted-morning.bsc-testnet.discover.quiknode.pro/6c849d6d2626a8ff4219aa845e3c76613255b243/",

    PANCAKESWAP_FACTORY_ADDRESS: { testnet: '0x6725F303b657a9451d8BA641348b6761A6CC7a17', mainnet: '0xBCfCcbde45cE874adCB698cC183deBcF17952812' },
    PANCAKESWAP_ROUTER_ADDRESS: { testnet: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1', mainnet: '' },

    PANCAKE_FACTORY_ABI: require('./factoryABI.json'),
    PANCAKE_ROUTER_ABI: require('./routerABI.json'),
    PANCAKE_PAIR_ABI: require('./pairABI.json'),
    TOKEN_ABI: require('./tokenABI.json'),

    GAS_LIMIT: "300000",
    EVENT_NAME: "Mint"
}


