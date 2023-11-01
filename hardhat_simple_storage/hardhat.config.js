require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")



task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


GOERLI_RPC_URL=process.env.GOERLI_RPC_URL
PRIVATE_KEY=process.env.PRIVATE_KEY
ETHERSCAN_API_KEY=process.env.ETHERSCAN_API_KEY
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:"hardhat",
  networks:{
    goerli:{
      url:GOERLI_RPC_URL,
      accounts:[PRIVATE_KEY],
      chainId: 5,

    }
  },
  solidity: "0.8.8",
  etherscan:{
    apiKey:ETHERSCAN_API_KEY
  },
};
