// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

contract Payment { 
    event Deposit(address sender, uint amount, uint balance);
    event Withdraw(uint amount, uint balance);
    event Transfer(address to, uint amount, uint balance);

struct Node{ 
   address minerWallet;
   string ips;
   string password;
}

struct Vendas{
    address minerWallet;
    address comprador;
    string ips;
}

    address payable public to;
    address payable public comprador;
    address payable public contract_retain;
    string sold_ip;


mapping (uint => Node) public nodes;
event savingsEvent(uint indexed _nodeId);
uint public nodeCount;

mapping (uint => Vendas) public venda;
event salvaVenda(uint indexed _vendaId);
uint public vendaCount;



constructor(){
    nodeCount = 0;
    addNode(0xe068cAdAB4957AE06668C221E8a0ce498F6ecf14,"192.168.15.8","duduzinho123");
    addNode(0x7DB048b40772a5574c85605502eE1f17458dB18D,"192.168.15.2","1234admin");
  }

  function addVenda(address producerAddr,address buyerAddress,string memory producerIP) public {
    venda[vendaCount] = Vendas(producerAddr,buyerAddress,producerIP);
    vendaCount++;
  }

  function addNode(address producerAddr,string memory producerIP,string memory producerPassword) public {
    nodes[nodeCount] = Node(producerAddr,producerIP,producerPassword);
    nodeCount++;
  }

//   function deleteNode(uint index) public{
//     Node[index] = Node[Node.lenght - 1];
//     Node.pop();
//   }
    function deposit() public payable {
        emit Deposit(msg.sender, msg.value, contract_retain.balance);
    }


    function notPayable() public{

    }

    modifier onlyComprador() {
        require(msg.sender == comprador, "Nao e o comprador");
        _;
    }

    function withdraw(uint _amount) public onlyComprador{
        comprador.transfer(_amount);
        emit Withdraw(_amount,address(this).balance);
    }

    function transfer(address payable _to, uint _amount) public onlyComprador{
        _to.transfer(_amount);
        emit Transfer(_to, _amount, contract_retain.balance);
    }

// fazer função para pagar contrato que chama deliver IP que envia uma transação pra quem pagou o contrato 
    function pagar() public payable onlyComprador{
        require(contract_retain.balance >= 0.5 ether);

        deliver_IP();
        addVenda(to,address(this),sold_ip);
        transfer(to, 0.5 ether);        
    }


    function random() private view returns(uint){
        return uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty)));
    }
 


    function deliver_IP() public returns(string memory,string memory){
          uint index = random() % nodeCount;

          to = payable(nodes[index].minerWallet);
          sold_ip = nodes[index].ips;

        return (nodes[index].ips, nodes[index].password); 
    }

        function getComprador() public view returns(address payable){
        return comprador;
    }

        function get_contract_retain_Balance() public view returns (uint) {
        return contract_retain.balance;
    }
          function get_your_Balance() public view returns (uint) {
        return address(this).balance;
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

//voltar a função de depositar, afinal o código terá que verificar os valores e os vendedores depois do saldo. 
// feito isso criar a pagina ou a aba do vendedor para que entre mais um node para vender.
// fazer um local que armazene os valores internamente depois de depositados 
// Isso pode ser usado da forma que é feito o armazenamento de tickets da loteria do código da loteria. 
//  terminando essa parte fazer com que o contrato salve os nodes, de acordo com os inputs dos vendedores
//depois que os compradores depositem valores para pode comprar coisas do contrato. 
// quando comprar, subtrair o valor da compra do valor depositado total 

