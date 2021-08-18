const request = require('supertest');
const server = require('../../../server');
const resetDB = require('../../utils/resetDB');
const extratoSchema = require('../../validacoes/extratoSchema');

describe("Testando rota de extrato", () => {

  beforeEach(async () => {
    resetDB();

    await request(server).post('/contas').send({
      nome: "Daniel",
      cpf: "12312312312",
      data_nascimento: "10/01/2000",
      telefone: "71999998888",
      email: "daniel@daniel.com",
      senha: "123456"
    });

    await request(server).post('/contas').send({
      nome: "Guido",
      cpf: "32132132112",
      data_nascimento: "10/01/2000",
      telefone: "71999998888",
      email: "guido@guido.com",
      senha: "123456"
    });

    await request(server).post('/contas/depositar').send({
      numero_conta: "1",
      valor: 10000
    });

    await request(server).post('/contas/depositar').send({
      numero_conta: "1",
      valor: 3000
    });

    await request(server).post('/contas/depositar').send({
      numero_conta: "2",
      valor: 15000
    });

    await request(server).post('/contas/sacar').send({
      numero_conta: "1",
      valor: 5000,
      senha: "123456"
    });

    await request(server).post('/contas/sacar').send({
      numero_conta: "1",
      valor: 1500,
      senha: "123456"
    });

    await request(server).post('/contas/sacar').send({
      numero_conta: "2",
      valor: 2500,
      senha: "123456"
    });

    await request(server).post('/contas/sacar').send({
      numero_conta: "2",
      valor: 4000,
      senha: "123456"
    });

    await request(server).post('/contas/transferir').send({
      numero_conta_origem: "1",
      numero_conta_destino: "2",
      valor: 2000,
      senha: "123456"
    });

    await request(server).post('/contas/transferir').send({
      numero_conta_origem: "1",
      numero_conta_destino: "2",
      valor: 1000,
      senha: "123456"
    });

    await request(server).post('/contas/transferir').send({
      numero_conta_origem: "2",
      numero_conta_destino: "1",
      valor: 500,
      senha: "123456"
    });

    await request(server).post('/contas/transferir').send({
      numero_conta_origem: "2",
      numero_conta_destino: "1",
      valor: 1000,
      senha: "123456"
    });
  });

  it("Extrato com query parameters inválido", async () => {
    const res = await request(server).get('/contas/extrato?senha=1234');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Extrato de conta não existente", async () => {
    const res = await request(server).get('/contas/extrato?senha=1234&numero_conta=10');

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Extrato de conta com senha inválida", async () => {
    const res = await request(server).get('/contas/extrato?senha=1234&numero_conta=1');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Extrato de conta correto", async () => {
    const res = await request(server).get('/contas/extrato?senha=123456&numero_conta=1');

    expect(res.statusCode).toEqual(200);
    const validate = await extratoSchema.validate(res.body);
    expect(!!validate).toEqual(true);
  });
});

