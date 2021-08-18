const express = require('express');
const contas = require('./controladores/contas');
const transacoes = require('./controladores/transacoes');

const rotas = express();

rotas.get('/health', (req, res) => {
  return res.send("Server is running");
});
g
rotas.get('/contas', contas.listarContas);
rotas.post('/contas', contas.criarConta);
rotas.put('/contas/:numeroConta/usuario', contas.atualizarUsuarioConta);
rotas.delete('/contas/:numeroConta', contas.excluirConta);

rotas.post('/contas/depositar', transacoes.depositar);
rotas.post('/contas/sacar', transacoes.sacar);
rotas.post('/contas/transferir', transacoes.transferir);
rotas.get('/contas/saldo', transacoes.saldo);
rotas.get('/contas/extrato', transacoes.extrato);

module.exports = rotas;