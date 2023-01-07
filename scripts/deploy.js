const { ethers, run, network } = require("hardhat")

async function main() {
    //grab contract
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    // deploy contract
    console.log("deploying contract")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()

    console.log(`Deployed contract to ${simpleStorage.address}`)
    //verify contract    
    if(network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY){
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address,[])

    }

    //contract interaction
    const transactionResponse= await simpleStorage.store(7)
    await transactionResponse.wait(2)

    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value is ${updatedValue}`)



    

}

async function verify(contractAddress, args) {
    console.log("Verifying contract...")

    try {
        await run("verify:verify", {
            address: contractAddress,
            contractArguements: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
