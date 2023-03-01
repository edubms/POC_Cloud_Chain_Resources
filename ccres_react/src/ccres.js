// importa o web3
import web3 from "./web3";
// Endereço do contrato gerado no deploy
const address = "0xd9145CCE52D386f254917e481eB44e9943F39138";
// const address = "Adicionar endereço do deploy aqui";
// Abi gerada no deploy do contrato
const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
    signature: "constructor",
  },
  // {
  //   inputs: [],
  //   name: "gerente",
  //   outputs: [{ internalType: "address", name: "", type: "address" }],
  //   stateMutability: "view",
  //   type: "function",
  //   constant: true,
  //   signature: "0x9e18d087",
  // },
  {
    inputs: [],
    name: "getComprador",
    outputs: [
      { internalType: "address payable", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x0040b837",
  },
  {
    inputs: [],
    name: "comprar",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
    signature: "0xbd6ac043",
  },
  // {
  //   inputs: [],
  //   name: "sorteio",
  //   outputs: [],
  //   stateMutability: "nonpayable",
  //   type: "function",
  //   signature: "0xc1f27e47",
  // }
   {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "comprador",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0xfdcd0731",
  }

];

//exporte o contrato
export default new web3.eth.Contract(abi, address);