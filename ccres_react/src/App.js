import React, { useState, useEffect } from "react";
// Configuração para requisições na rede
import web3 from "./web3";
// Informação do contrato
//import loteria from "./ccres";
import ccres from "./ccres";

const App = () => {
  // Cria variáveis e funções de alteração
 const [comprador, setComprador] = useState("");
  // const [jogadores, setJogadores] = useState("");
 const [saldo, setSaldo] = useState("");
 const [value, setValue] = useState("");
 const [mensagem, setMensagem] = useState("");

  // Função assincrona que carrega os dados do contrato
  const carregarDados = async () => {
    // Pega a carteira do gerente do contrato
//    const _gerente = await ccres.methods.gerente().call();
    // Pega a carteira dos jogadores
    const _comprador = await ccres.methods.getComprador().call();
    // Pega o valor total vinculado ao contrato
     const _saldo = await web3.eth.getBalance(ccres.options.address);

    // Armazena os valores nas variáveis de gerente, jogador e saldo
//    setGerente(_gerente);
    setComprador(_comprador);
    setSaldo(_saldo);
    setValue("");
  };
  // Antes da página carregar ele chama seu conteúdo
  useEffect(() => {
    // Busca dados do contrato
    carregarDados();
  }, []);

  const verifica_saldo = async (event) => {
    try{
      setMensagem("Saldo atual é:",saldo);
    }
    catch{
      setMensagem("Erro ao consultar o saldo.")
    }
  }
  // * Realiza a compra 
  const comprar = async (event) => {
    try {
      // Evita que a página seja recarregada
      event.preventDefault();
      // Altera valor da mensagem exibida
      setMensagem("Aguardando a  validação da transação...");
      // Pega contas do metamask
      // const contas = await web3.eth.getAccounts();
      // console.log(contas);

      // Joga passando valor da conta principal e o valor de ether em wei
      await ccres.methods.pagar().send({
        from: comprador,
        value: web3.utils.toWei(value, "ether"),
      });
      // Recarrega dados da página
      await carregarDados();
      // Altera mensagem
      setMensagem("Transação concluida!");
    } catch (error) {
      // Caso o usuário cancele a solicitação no metamask
      if (error.code === 4001) {
        setMensagem("Transação cancelada!");
      } else {
        // Caso algo esteja fora das políticas do contrato
        setMensagem("Transação vai contra regras do contrato");
      }
    }
  };
  // const withdraw = async (amount) => {
  //   try {
  //     const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  //     const account = accounts[0];
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner(account);
  //     const contract = new ethers.Contract(contractAddress, contractAbi, signer);
  //     const tx = await contract.withdraw(ethers.utils.parseEther(amount.toString()));
  //     console.log(`Transaction hash: ${tx.hash}`);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // // * Realiza sorteio
  // const comprar = async () => {
  //   try {
  //     // Altera mensagem
  //     setMensagem("Aguardando processamento...");
  //     // Pega contas do metamask
  //     const contas = await web3.eth.getAccounts();
  //     // Solicita sorte e manda conta que está realizando o sorteio
  //     await ccres.methods.pagar().send({
  //       from: comprador,
  //     });
  //     // Recarrega dados da página
  //     await carregarDados();
  //     // Altera mensagem
  //     setMensagem("Voce adquiriu recursos computacionais!");
  //   } catch (error) {
  //     // Caso o usuário cancele a solicitação no metamask
  //     if (error.code === 4001) {
  //       setMensagem("Transação cancelada!");
  //     } else {
  //       // Caso algo esteja fora das políticas do contrato
  //       setMensagem("Transação vai contra regras do contrato");
  //     }
  //   }
  // };
  return (
    <div>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
      <link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' rel='stylesheet' type='text/css'></link>
      <body class="p-3 mb-2 bg-info text-white">
        <h2 class="page-header">Compra de recursos</h2>
        <a href="./subscription.html" class="btn btn-primary">Cadastrar</a>
        <a href="./login.html" class="btn btn-secondary">Login</a>
        <div class="sub-header">
          <h4>Deseja comprar recursos? </h4>
          <button class="btn-sm" onClick={verifica_saldo}> Saldo atual</button>
        </div>
      <div class="container">
        <label>Insira o endereço da sua carteira:</label>
        <input class="form-control" type="text" id="wallet_address_input" name="wallet" placeholder="0x5e4B0675d85c995cABb06419199Ec5D958f04e73"></input>
      </div>
      <div class="container">
        <label>Quanto deseja depositar?</label>
        <input class="form-control" type="text" id="deposit_value" name="wallet" ></input>
      </div>
      <div class="container">
          <select class="active">
            {/* Colocar aqui as opções de compra */}
          </select>
          <br></br>
          <button class="btn-success" onClick={comprar}> Comprar </button>
          {/* fazer uma função que carrega as informações ao abrir a tela {onCreate} */}
      </div>
      <div class="sub-header">
        <h5>Venda de Recursos</h5>
      </div>
      <div class="container">

        <label>Digite o ip do seu recurso:</label>
        <input class="form-control" type="text" id="resource_ip_address" name="resource_ip_address" ></input>
        <label>Digite o login do seu recurso:</label>
        <input class="form-control" type="text" id="resource_login" name="resource_login" ></input>
        <label>Digite a senha do seu recurso:</label>
        <input class="form-control" type="text" id="resource_password" name="resource_password" ></input>
        <label>Digite o espaço do seu recurso(GB):</label>
        <input class="form-control" type="number" id="resource_size" name="resource_size" ></input>
        <label>Digite o preço para vender seu recurso(valor em Ether):</label>
        <input class="form-control" type="number" step=".0001" min="0" id="resource_price" name="resource_price" ></input>
        <p></p>
        <button class="btn-sm" /*onClick={cadastra_recurso}*/> Cadastrar recurso</button>

      </div>
      
      {/* Mostra mensagem ao usuário */}
      <h1>{mensagem}</h1>

      </body>

    </div>
  );
};

export default App;