// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract Payment { 
    event Deposit(address sender, uint amount, uint balance);
    event Withdraw(uint amount, uint balance);
    event Transfer(address to, uint amount, uint balance);

struct Node{ 
   address minerWallet;
   string ips;
   string password;
}


mapping (uint => Node) public nodes;
event savingsEvent(uint indexed _nodeId);
uint public nodeCount;

constructor() public {
    nodeCount = 0;
    addNode(0xAfa2108E80259855Ee421586169F23E05bd73798,"192.168.15.8","duduzinho123");
    addNode(0x4Cf44eE3695b95fCA534D20e27bcbdBa5eAe3f3a,"192.168.15.2","1234admin");
    addNode(0x04fF512cb81DA7ba50Db469A9A3C3F5ec3241116,"192.168.15.3","senha1234");
  }
  function addNode(address producerAddr,string memory producerIP,string memory producerPassword) public {
    nodes[nodeCount] = Node(producerAddr,producerIP,producerPassword);
    nodeCount++;
  }


//    address[] public to = [0xAfa2108E80259855Ee421586169F23E05bd73798,0x4Cf44eE3695b95fCA534D20e27bcbdBa5eAe3f3a,0x04fF512cb81DA7ba50Db469A9A3C3F5ec3241116,0xf13Ce17Ff080432eCbaB0f818957e982319A407E];
//    string[] strings = ["192.168.15.8","192.168.15.2","192.168.15.3"];
    address payable public owner;
    uint number = 4;

//    constructor() public payable{
//
//    }

    function deposit() public payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }

    function notPayable() public{

    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function withdraw(uint _amount) public onlyOwner {
        owner.transfer(_amount);
        emit Withdraw(_amount, address(this).balance);
    }

    function transfer(address payable _to, uint _amount) public onlyOwner{
        _to.transfer(_amount);
        emit Transfer(_to, _amount, address(this).balance);
    }

// fazer função para pagar contrato que chama deliver IP que envia uma transação pra quem pagou o contrato 
    function pay() public payable onlyOwner{
        withdraw(100);
//        require(msg.value==100 gwei);
        deliverIP();

    }


    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function random() private view returns(uint){
        return uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty)));
    }
 
/*    function deliverIP()  view public returns(address,string memory,string memory){
          uint index = random() % nodeCount;

        return (nodes[index].minerWallet, nodes[index].ips, nodes[index].password); 
*/
    function deliverIP()  view public returns(string memory,string memory){
          uint index = random() % nodeCount;

        return (nodes[index].ips, nodes[index].password); 
//        receber(nodes[index].minerWallet)
    }

    function cypher() public pure returns(bytes32 results){
        
      return  sha256(abi.encodePacked(deliverIP()));
    }  

}



// fazer com que o owner envie também uma chave RSA e o retorno do pagamento
// seja uma cifra que é decodificada por essa chave RSA.
// Criar as máquinas virtuais para poder testar. 
// 

// colocar como proximos passos controle temporal(proof of spacetime)
// e prova que a pessoa disponibilizou realmente aquela quantidade de dados. 


// metodologia: colocar o diagrama de estado ( fazer uma topologia do sistema) 
// escrever tudo o que pensamos dentro de um diagrama para apresentar como seria o ideal. 
// mostrando como que é a interação entre as classes 


// dia 04 apresentar o texto e dia 09 ou dia 10 um texto melhor arrumado. 