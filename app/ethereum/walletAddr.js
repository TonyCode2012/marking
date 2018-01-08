var Web3 = require('./web3')

module.exports = ctx => {
    var web3 = new Web3(new Web3.providers.HttpProvider("http://120.27.237.152:8811"));
    var coinbase = web3.eth.coinbase;
    var balance = web3.eth.getBalance(coinbase);

    ctx.state.data = {
        balance: balance
    }
}
