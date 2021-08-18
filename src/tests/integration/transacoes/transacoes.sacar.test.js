const request = require('supertest');
const server = require('../../../server');
const resetDB = require('../../utils/resetDB');

describe("Testando rota de sacar", () => {

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

    await request(server).post('/contas/depositar').send({
      numero_conta: "1",
      valor: 100
    });
  });

  it("Sacar com body inválido", async () => {
    const res = await request(server).post('/contas/sacar').send({ valor: 100 });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Sacar de conta não existente", async () => {

    const res = await request(server).post('/contas/sacar').send({
      numero_conta: "10",
      valor: 10,
      senha: "1234"
    });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Sacar de conta com senha inválida", async () => {

    const res = await request(server).post('/contas/sacar').send({
      numero_conta: "1",
      valor: 10,
      senha: "123123"
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Sacar valor negativo", async () => {
    const res = await request(server).post('/contas/sacar').send({
      numero_conta: "1",
      valor: -10,
      senha: "1234"
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Sacar valor maior que o saldo", async () => {
    const res = await request(server).post('/contas/sacar').send({
      numero_conta: "1",
      valor: 1000,
      senha: "1234"
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Sacar valor de conta", async () => {
    const res = await request(server).post('/contas/sacar').send({
      numero_conta: "1",
      valor: 10,
      senha: "123456"
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('mensagem');
  });
});
