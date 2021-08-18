const request = require('supertest');
const server = require('../../../server');
const resetDB = require('../../utils/resetDB');

describe("Testando rota de depositar", () => {

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
  });

  it("Depositar com body inválido", async () => {
    const res = await request(server).post('/contas/depositar').send({ valor: 100 });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Depositar valor zero", async () => {
    const res = await request(server).post('/contas/depositar').send({
      numero_conta: "2",
      valor: -10,
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Depositar em conta não existente", async () => {
    const res = await request(server).post('/contas/depositar').send({
      numero_conta: "10",
      valor: 100
    });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Depositar em conta", async () => {
    const res = await request(server).post('/contas/depositar').send({
      numero_conta: "1",
      valor: 100
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('mensagem');
  });
});