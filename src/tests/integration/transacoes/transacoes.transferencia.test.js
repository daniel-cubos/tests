const request = require('supertest');
const server = require('../../../server');
const resetDB = require('../../utils/resetDB');

describe("Testando rota de transferência", () => {

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
      valor: 100
    });

  });

  it("Transferir com body inválido", async () => {
    const res = await request(server).post('/contas/transferir').send({
      numero_conta_origem: "1",
      numero_conta_destino: "2",
      senha: "1234"
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Transferir em conta origem não existente", async () => {
    const res = await request(server).post('/contas/transferir').send({
      numero_conta_origem: "9",
      numero_conta_destino: "2",
      valor: 30,
      senha: "1234"
    });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Transferir em conta destino não existente", async () => {
    const res = await request(server).post('/contas/transferir').send({
      numero_conta_origem: "1",
      numero_conta_destino: "10",
      valor: 30,
      senha: "123456"
    });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Transferir com senha inválida", async () => {

    const res = await request(server).post('/contas/transferir').send({
      numero_conta_origem: "1",
      numero_conta_destino: "2",
      valor: 30,
      senha: "12345678"
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Transferir valor zero", async () => {
    const res = await request(server).post('/contas/transferir').send({
      numero_conta_origem: "1",
      numero_conta_destino: "2",
      valor: -30,
      senha: "1234"
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Transferir saldo insuficiente", async () => {
    const res = await request(server).post('/contas/transferir').send({
      numero_conta_origem: "1",
      numero_conta_destino: "2",
      valor: 300,
      senha: "1234"
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Transferir com dados corretos!", async () => {
    const res = await request(server).post('/contas/transferir').send({
      numero_conta_origem: "1",
      numero_conta_destino: "2",
      valor: 30,
      senha: "123456"
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Receber transferência!", async () => {
    const res = await request(server).post('/contas/transferir').send({
      numero_conta_origem: "2",
      numero_conta_destino: "1",
      valor: 5,
      senha: "123456"
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('mensagem');
  });
});

