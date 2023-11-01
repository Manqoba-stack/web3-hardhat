const { network } = require("hardhat")
const {networkConfig, developmentChain}=require("../helper-hardhat-config")

//anonymous function, when hardhat deploy is run hre is passed to this function
// hardhat knows about the function
module.exports = async (hre) => {
    const { getNamedAccounts, deployments } = hre // we want these 2 variables, there are more

    const { deploy, log } = deployments

    const { deployer } = await getNamedAccounts()  //
    const chainId = network.config.chainId

    //use certain address when at a certain blockchain
 //   const ethUsdPriceFeedAddress=networkConfig[chainId]["ethusdPriceFeed"]
    let ethUsdPriceFeedAddress
    if(developmentChain.includes(network.name))
    {
        const ethUsdAggregator=await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress=ethUsdAggregator.address
    }else
    {
        ethUsdPriceFeedAddress=networkConfig[chainId]["ethusdPriceFeed"]
    }

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress
            /*price feed address i.e from which blockchain.. */
        ],
        log: true,
    })
    log("____________________________________________________")
}

module.exports.tags = ["all", "fundme"]