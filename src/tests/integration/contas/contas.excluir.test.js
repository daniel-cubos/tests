const request = require('supertest');
const server = require('../../../server');
const resetDB = require('../../utils/resetDB');

describe("Testando rota de Excluir conta", () => {

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

  it("Excluindo conta com número inexistente", async () => {
    const res = await request(server).delete('/contas/9');

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('mensagem')
  });

  it("Excluindo conta com saldo maior que zero", async () => {
    const res = await request(server).delete('/contas/1')

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem')
  });

  it("Excluindo conta!", async () => {
    const res = await request(server).delete('/contas/2');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('mensagem')
  });
});
