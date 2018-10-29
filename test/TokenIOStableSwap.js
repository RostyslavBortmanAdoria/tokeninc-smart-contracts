var { Wallet, utils, SigningKey } = require('ethers');
var Promise = require('bluebird')

var TokenIOERC20 = artifacts.require("./TokenIOERC20.sol");
var TokenIOStorage = artifacts.require("./TokenIOStorage.sol");
var TokenIOCurrencyAuthority = artifacts.require("./TokenIOCurrencyAuthority.sol");
var TokenIOStableSwap = artifacts.require("./TokenIOStableSwap.sol");

const { mode, development, production } = require('../token.config.js');
const {
	AUTHORITY_DETAILS: { firmName, authorityAddress },
	TOKEN_DETAILS
} = mode == 'production' ? production : development;

const USDc = TOKEN_DETAILS['USDc']


contract("TokenIOStableSwap", function(accounts) {

	// Globals
	const DEPOSIT_AMOUNT = 1000e2;
	const SWAP_AMOUNT = 100e2;
	const TEST_ACCOUNT_1 = accounts[1]


	var USDX,
	USDC,
	SWAP,
	CA;

	before(async () => {
		const storage = await TokenIOStorage.deployed()

		CA = await TokenIOCurrencyAuthority.deployed();
		SWAP = await TokenIOStableSwap.deployed();

		USDX = await TokenIOERC20.deployed()

		USDC = await TokenIOERC20.new(storage.address)
		await storage.allowOwnership(USDC.address)
		await USDC.setParams(...Object.values(USDc).map((v) => { return v }))

		await SWAP.setTokenXCurrency(USDX.address, 'USD');
		await SWAP.allowAsset(USDC.address, 'USD');
	})

	it("Should Deposit USDc into TEST_ACCOUNT_1 account", async () => {
		const APPROVE_REQUESTER = await CA.approveKYC(TEST_ACCOUNT_1, true, DEPOSIT_AMOUNT, firmName)

		const DEPOSIT_REQUESTER_AMOUNT_TX = await CA.deposit((await USDC.symbol()), TEST_ACCOUNT_1, DEPOSIT_AMOUNT, firmName)

		assert.equal(DEPOSIT_REQUESTER_AMOUNT_TX['receipt']['status'], "0x1", "Transaction should be successful")


		const TEST_ACCOUNT_1_BALANCE = +(await USDC.balanceOf(TEST_ACCOUNT_1)).toString()
		assert.equal(TEST_ACCOUNT_1_BALANCE, DEPOSIT_AMOUNT, "Requester balance should equal deposit amount")

		await USDC.approve(SWAP.address, SWAP_AMOUNT, { from: TEST_ACCOUNT_1 })
		assert.equal(+(await USDC.allowance(TEST_ACCOUNT_1, SWAP.address)), SWAP_AMOUNT, "Allowance of swap contract should equal requester deposit amount");

	})

	it("Should allow the swap between the requester and the contract", async () => {

		await SWAP.convert(USDC.address, USDX.address, SWAP_AMOUNT, (await USDX.tla()), { from: TEST_ACCOUNT_1 })
		console.log('SWAP_AMOUNT', SWAP_AMOUNT);
		const FEES = +(await USDC.calculateFees(SWAP_AMOUNT))

		const TEST_ACCOUNT_1_USDC_BALANCE = +(await USDC.balanceOf(TEST_ACCOUNT_1)).toString()
		assert.equal(TEST_ACCOUNT_1_USDC_BALANCE, (DEPOSIT_AMOUNT-SWAP_AMOUNT-FEES), "Requester balance should be reduced by swap amount")

		const TEST_ACCOUNT_1_USDX_BALANCE = +(await USDX.balanceOf(TEST_ACCOUNT_1)).toString()
		assert.equal(TEST_ACCOUNT_1_USDX_BALANCE, SWAP_AMOUNT, "Requester balance should equal requester deposit amount for USDX contract")


	})

});