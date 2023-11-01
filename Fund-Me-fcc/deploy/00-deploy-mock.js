const { network } = require("hardhat")
const {developmentChain, DECIMALS, INITIAL_ANSWER}= require("../helper-hardhat-config")

module.exports = async (hre) => {
    const { getNamedAccounts, deployments } = hre

    const { deploy, log } = deployments

    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    
    if(developmentChain.includes(network.name))
    {
        log("Local network detected, deploying mocks...")
       const Mock= await deploy("MockV3Aggregator",{
            contract: "MockV3Aggregator",
            from:deployer,
            log:true,
            args:[DECIMALS,INITIAL_ANSWER],
        })
        log("Mocks have been deployed")
        log("___________________________________________")
    }

}

module.exports.tags =["all","mocks"]
