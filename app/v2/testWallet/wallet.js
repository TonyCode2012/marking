var Web3 = require('web3')

//var web3 = new Web3(new Web3.providers.HttpProvider("http://120.27.237.152:8811"));
var web3 = new Web3();
console.log('new web3 successfully!')

web3.setProvider(new Web3.providers.HttpProvider("http://120.27.237.152:8811"));
console.log('set httpProvider successfully!')

var coinbase = web3.eth.coinbase;
console.log('coinbase is:', coinbase)

var balance = web3.eth.getBalance(coinbase);

console.log('balance is:', balance)
