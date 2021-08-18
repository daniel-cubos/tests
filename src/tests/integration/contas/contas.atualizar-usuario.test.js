const request = require('supertest');
const server = require('../../../server');
const resetDB = require('../../utils/resetDB');

describe("Testando rota de atualizar usuário da conta", () => {

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
  });


  it("Atualizando conta com body inválido", async () => {
    const res = await request(server).put('/contas/2/usuario').send({});

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Atualizando conta com dados inválidos", async () => {
    const res = await request(server).put('/contas/9/usuario').send({
      nome: "Daniel Lopes",
      cpf: "11122233344",
      data_nascimento: "10/01/1992",
      telefone: "(18) 99999-9999",
      email: "daniel@cubos.academy",
      senha: "12345678"
    });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Atualizando conta com cpf já existente", async () => {

    const res = await request(server).put('/contas/1/usuario').send({
      nome: "Daniel",
      cpf: "32132132112",
      data_nascimento: "10/01/2000",
      telefone: "71999998888",
      email: "daniel@daniel.com",
      senha: "123456"
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Atualizando conta com e-mail já existente", async () => {

    const res = await request(server).put('/contas/1/usuario').send({
      nome: "Daniel",
      cpf: "12312312312",
      data_nascimento: "10/01/2000",
      telefone: "71999998888",
      email: "guido@guido.com",
      senha: "123456"
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Atualizando conta", async () => {
    const res = await request(server).put('/contas/1/usuario').send({
      nome: "Daniel Lopes",
      cpf: "11122233344",
      data_nascimento: "10/01/1992",
      telefone: "(18) 99999-9999",
      email: "daniel@cubos.academy",
      senha: "12345678"
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('mensagem')
  });
});
