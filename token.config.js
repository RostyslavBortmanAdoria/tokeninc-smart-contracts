const USDx = {
  // Ensure these values are ordered in the object for the respective param list
  // index in the erc20 contract setPrams() method.
  tokenName: 'USD by token.io', // tokenName
  tokenSymbol: 'USDx', // tokenSymbol
  tokenTLA: 'USD', // tokenTLA
  tokenVersion: 'v0.1.3', // tokenVersion
  tokenDecimals: 2, // tokenDecimals
  feeContract: "0x0" // fee account
}

const MXNx = {
  // Ensure these values are ordered in the object for the respective param list
  // index in the erc20 contract setPrams() method.
  tokenName: 'MXN by token.io', // tokenName
  tokenSymbol: 'MXNx', // tokenSymbol
  tokenTLA: 'MXN', // tokenTLA
  tokenVersion: 'v0.1.3', // tokenVersion
  tokenDecimals: 2, // tokenDecimals
  feeContract: "0x0" // fee account
}

const GBPx = {
  // Ensure these values are ordered in the object for the respective param list
  // index in the erc20 contract setPrams() method.
  tokenName: 'GBP by token.io', // tokenName
  tokenSymbol: 'GBPx', // tokenSymbol
  tokenTLA: 'GBP', // tokenTLA
  tokenVersion: 'v0.1.3', // tokenVersion
  tokenDecimals: 2, // tokenDecimals
  feeContract: "0x0" // fee account
}

const JPYx = {
  // Ensure these values are ordered in the object for the respective param list
  // index in the erc20 contract setPrams() method.
  tokenName: 'JPY by token.io', // tokenName
  tokenSymbol: 'JPYx', // tokenSymbol
  tokenTLA: 'JPY', // tokenTLA
  tokenVersion: 'v0.1.3', // tokenVersion
  tokenDecimals: 2, // tokenDecimals
  feeContract: "0x0" // fee account
}

const EURx = {
  // Ensure these values are ordered in the object for the respective param list
  // index in the erc20 contract setPrams() method.
  tokenName: 'EUR by token.io', // tokenName
  tokenSymbol: 'EURx', // tokenSymbol
  tokenTLA: 'EUR', // tokenTLA
  tokenVersion: 'v0.1.3', // tokenVersion
  tokenDecimals: 2, // tokenDecimals
  feeContract: "0x0" // fee account
}

const AUTHORITY_DETAILS = {
  firmName: "Token, Inc.",
  authorityAddress: "0x8cb2cebb0070b231d4ba4d3b747acaebdfbbd142"
}

const FEE_PARAMS = {
    feeBps: 2, // bps fee
    feeMin: 0, // min fee
    feeMax: 100, // max fee
    feeFlat: 2 // flat fee
}

module.exports = {
  mode: 'development',
  development: {
    TOKEN_DETAILS: [
        USDx,
        MXNx,
        GBPx,
        JPYx,
        EURx,
    ],
    AUTHORITY_DETAILS,
    FEE_PARAMS
  },
  production: {
    TOKEN_DETAILS: [
        USDx,
        MXNx,
        GBPx,
        JPYx,
        EURx,
    ],
    AUTHORITY_DETAILS,
    FEE_PARAMS
  }
}


// CSV
// "0x8cb2cebb0070b231d4ba4d3b747acaebdfbbd142",
// "0x8cb2cebb0070b231d4ba4d3b747acaebdfbbd142",
// "USD by token.io",
// "USDx",
// "USD",
// "v0.1.2",
// 2
