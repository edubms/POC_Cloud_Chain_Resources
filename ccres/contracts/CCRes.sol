// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract Payment { 
//    event Deposit(address sender, uint amount, uint balance);
//    event Withdraw(uint amount, uint balance);
    event Transfer(address to, uint amount, uint balance);

struct Node{ 
   address minerWallet;
   string ips;
   string password;
}

    address payable public to;
    address payable public comprador;

mapping (uint => Node) public nodes;
event savingsEvent(uint indexed _nodeId);
uint public nodeCount;

constructor(){
    nodeCount = 0;
    addNode(0xe068cAdAB4957AE06668C221E8a0ce498F6ecf14,"192.168.15.8","duduzinho123");
    addNode(0x7DB048b40772a5574c85605502eE1f17458dB18D,"192.168.15.2","1234admin");
  }
  function addNode(address producerAddr,string memory producerIP,string memory producerPassword) public {
    nodes[nodeCount] = Node(producerAddr,producerIP,producerPassword);
    nodeCount++;
  }

    function notPayable() public{

    }

    modifier onlyComprador() {
        require(msg.sender == comprador, "Nao e o comprador");
        _;
    }

//    function withdraw(uint _amount) public onlyOwner {
//        owner.transfer(_amount);
//        emit Withdraw(_amount, address(this).balance);
//    }

    function transfer(address payable _to, uint _amount) public onlyComprador{
        _to.transfer(_amount);
        emit Transfer(_to, _amount, address(this).balance);
    }

// fazer função para pagar contrato que chama deliver IP que envia uma transação pra quem pagou o contrato 
    function pagar() public payable onlyComprador{
        require(msg.value >= 0.5 ether);

        deliverIP();
        transfer(to, 0.5 ether);        
    }


    function random() private view returns(uint){
        return uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty)));
    }
 


    function deliverIP() public returns(string memory,string memory){
          uint index = random() % nodeCount;

          to = payable(nodes[index].minerWallet);

        return (nodes[index].ips, nodes[index].password); 
    }

        function getComprador() public view returns(address payable){
        return comprador;
    }

//    function cypher() public pure returns(bytes32 results){
//        
//      return  sha256(abi.encodePacked(deliverIP()));
//    }  

}



// fazer com que o owner envie também uma chave RSA e o retorno do pagamento
// seja uma cifra que é decodificada por essa chave RSA.
// Criar as máquinas virtuais para poder testar. 
// 



// metodologia: colocar o diagrama de estado ( fazer uma topologia do sistema) 
// escrever tudo o que pensamos dentro de um diagrama para apresentar como seria o ideal. 
// mostrando como que é a interação entre as classes 


