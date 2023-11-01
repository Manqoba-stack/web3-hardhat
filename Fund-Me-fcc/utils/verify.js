const {run}= require("hardhat")


const verfy=async(contractAddress,args)=>{
    console.log ("Verifying contract",contractAddress)
    try{
        await run("verify:verify",{
            address:contractAddress,
            constructorArguments:args,
        })
        console.log("Contract verified")
    }catch(e){
        console.log("Contract verification failed")
        if(e.message.toLowerCase.includes("already verified")){
            console.log("Contract already verified")
        console.log(e)
    }
}

}
 module.exports={verify}