const SafeMath = artifacts.require("./SafeMath.sol")
const TokenIOLib = artifacts.require("./TokenIOLib.sol")
const TokenIOStorage = artifacts.require("./TokenIOStorage.sol")
const TokenIOERC20 = artifacts.require("./TokenIOERC20.sol")
const TokenIOAuthority = artifacts.require("./TokenIOAuthority.sol")
const TokenIOFX = artifacts.require("./TokenIOFX.sol")
const TokenIOCurrencyAuthority = artifacts.require("./TokenIOCurrencyAuthority.sol")
const { mode, development, production } = require('../token.config.js');
const {
    AUTHORITY_DETAILS: { firmName, authorityAddress },
    TOKEN_DETAILS
} = mode == 'production' ? production : development;

module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        await deployContracts(deployer, accounts)
        console.log('### finished deploying contracts')
    })
    .catch(err => console.log('### error deploying contracts', err))
}

const deployContracts = async (deployer, accounts) => {
  try {
      /* library */
      const safeMath = await deployer.deploy(SafeMath)
      await deployer.link(SafeMath, [TokenIOLib])
      const tokenIOLib = await deployer.deploy(TokenIOLib)
      await deployer.link(TokenIOLib,
          [TokenIOStorage, TokenIOERC20, TokenIOAuthority, TokenIOCurrencyAuthority, TokenIOFX])

      /* storage */
      const storage = await deployer.deploy(TokenIOStorage)

      /* token */
      const token = await deployer.deploy(TokenIOERC20, storage.address)
      await storage.allowOwnership(token.address)
      await token.setParams(...Object.keys(TOKEN_DETAILS[0]).map((k) => { return TOKEN_DETAILS[0][k] }))

      /* authority */
      const authority = await deployer.deploy(TokenIOAuthority, storage.address)
      await storage.allowOwnership(authority.address)
      const currencyAuthority = await deployer.deploy(TokenIOCurrencyAuthority, storage.address)
      await storage.allowOwnership(currencyAuthority.address)

      /* fx */
      const fx = await deployer.deploy(TokenIOFX, storage.address)
      await storage.allowOwnership(fx.address)

      /* registration */
      await authority.setRegisteredFirm(firmName, true)
      await authority.setRegisteredAuthority(firmName, accounts[0], true)

      return true
  } catch (err) {
      console.log('### error deploying contracts', err)
  }
}
