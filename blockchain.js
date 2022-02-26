const Block = require("./block");
const cryptoHash = require('./crypto-hash')

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()]
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data
    })

    this.chain.push(newBlock)
  }

  static isValidChain(chainToValidate) {
    if (JSON.stringify(chainToValidate[0]) !== JSON.stringify(Block.genesis())) {
      return false
    }

    for (let i = 1; i < chainToValidate.length; i++) {
      const { timestamp, lastHash, hash, data } = chainToValidate[i]
      const actualLastHash = chainToValidate[i - 1].hash

      if (lastHash !== actualLastHash) return false
      
      const validateHash = cryptoHash(timestamp, lastHash, data)
      if (hash !== validateHash) return false
    }

    return true
  }
}

module.exports = Blockchain;

