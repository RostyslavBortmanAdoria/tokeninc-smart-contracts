var { utils } = require('ethers');
var Promise = require('bluebird')
var TokenIOAuthority = artifacts.require("./TokenIOAuthority.sol");

const { mode, development, production } = require('../token.config.js');
const {
  AUTHORITY_DETAILS: { firmName, authorityAddress },
  TOKEN_DETAILS: { USDx }
} = mode == 'production' ? production : development;




contract("TokenIOAuthority", function(accounts) {

  // Global Test Variables;
  const AUTHORITY_ACCOUNT = accounts[0];
  const FIRM_NAME = firmName;

  it("Should confirm AUTHORITY_ACCOUNT has been set appropriately", async () => {
    const authority = await TokenIOAuthority.deployed();
    const isAuthorized = await authority.isRegisteredToFirm(FIRM_NAME, AUTHORITY_ACCOUNT);
    assert.equal(isAuthorized, true, "Authority firm and address should be authorized");
  });

  it("Should confirm FIRM_NAME has been set appropriately", async () => {
    const authority = await TokenIOAuthority.deployed();
    const authorityFirm = await authority.getFirmFromAuthority(AUTHORITY_ACCOUNT);
    assert.equal(authorityFirm, FIRM_NAME, "Authority firm should be set to the firmName");
  })

  

});
