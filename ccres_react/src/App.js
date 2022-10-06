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

  // * Realiza a compra 
  const comprar = async (event) => {
    try {
      // Evita que a página seja recarregada
      event.preventDefault();
      // Altera valor da mensagem exibida
      setMensagem("Aguardando a  validação da transação...");
      // Pega contas do metamask
      const contas = await web3.eth.getAccounts();
      console.log(contas);

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
      <h2>Compra de recursos</h2>
      <h4>Deseja comprar recursos? </h4>
      <button onClick={comprar}> Comprar </button>
      {/* Mostra mensagem ao usuário */}
      <h1>{mensagem}</h1>
    </div>
  );
};

export default App;