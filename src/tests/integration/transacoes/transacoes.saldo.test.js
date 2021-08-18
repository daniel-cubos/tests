const request = require('supertest');
const server = require('../../../server');
const resetDB = require('../../utils/resetDB');

describe("Testando rota verificar saldo", () => {

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

  it("Saldo com query parameters inválido", async () => {
    const res = await request(server).get('/contas/saldo?senha=1234');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Saldo de conta não existente", async () => {
    const res = await request(server).get('/contas/saldo?senha=1234&numero_conta=10');

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Saldo de conta com senha inválida", async () => {
    const res = await request(server).get('/contas/saldo?senha=1234&numero_conta=1');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Saldo de conta correto", async () => {
    await request(server).post('/contas/depositar').send({
      numero_conta: "1",
      valor: 100
    });

    const res = await request(server).get('/contas/saldo?senha=123456&numero_conta=1')

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      saldo: 100
    });
  });
})
