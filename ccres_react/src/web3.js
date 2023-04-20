// Importa módulo web3
import Web3 from "web3";
import contractAbi from "./abi.json";
const getWeb3 = () => new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"))

const contractAddress = "";
export const getContract = async(walletAddressToTransaction) => {
    const web3 = getWeb3();
    await window.ethereum.enable();
    web3.eth.defaultAccount = walletAddressToTransaction
    return new web3.eth.Contract(contractAbi, contractAddress);
}

export const web3 = getWeb3();



export const connectWallet = async() => {
    if (window.ethereum){
        try {
            const walletAddress = await window.ethereum.request({method:"eth_requestAccounts"});
            return {connected: true, walletAddress};
        }
        catch{
            return {connected: false}
        }
    }
    else{
        return {connected:false}
    }
}


export const getMyBalance = async(walletAddressToTransaction) => {
    const contract = await getContract(walletAddressToTransaction);
    const response = await contract.methods.myBalance().call()
    return response;
}

export const deposit = async(walletAddressToTransaction, value) =>{
    const contract = await  getContract(walletAddressToTransaction);
    const response = await contract.methods.deposit().send({from:walletAddressToTransaction,value:web3.utils.toWei(value.toString(),"ether")});
    return response; 
}

export const createNode = async(node) =>{
    const contract = await  getContract(walletAddressToTransaction);
    const response = await contract.methods.addNode(node.param1,node.param2,node.param3);
    return response; 
}

