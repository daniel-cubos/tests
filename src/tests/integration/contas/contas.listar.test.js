const request = require('supertest');
const server = require('../../../server');
const resetDB = require('../../utils/resetDB');

describe("Testando rota de Listar Contas", () => {
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

  it("Listando contas sem a senha!", async () => {
    const res = await request(server).get('/contas');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Listando contas com senha inválida!", async () => {
    const res = await request(server).get('/contas?senha_banco=123');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Listando contas!", async () => {
    const res = await request(server).get('/contas?senha_banco=Cubos123Bank')

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([
      {
        "numero": "1",
        "usuario": {
          "nome": "Daniel",
          "cpf": "12312312312",
          "data_nascimento": "10/01/2000",
          "telefone": "71999998888",
          "email": "daniel@daniel.com"
        }
      }
    ]);
  });
});