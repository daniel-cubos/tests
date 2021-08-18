const request = require('supertest');
const server = require('../../../server');
const resetDB = require('../../utils/resetDB');

describe("Testando rota de Criar Conta", () => {

  beforeEach(() => {
    resetDB();
  });

  it("Criando conta", async () => {
    const res = await request(server).post('/contas').send({
      nome: "Daniel",
      cpf: "12312312312",
      data_nascimento: "10/01/1992",
      telefone: "(18) 99797-9797",
      email: "daniel.lopes@cubos.academy",
      senha: "123456"
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      numero: '1',
      saldo: 0,
      usuario: {
        nome: 'Daniel',
        cpf: '12312312312',
        data_nascimento: '10/01/1992',
        telefone: '(18) 99797-9797',
        email: 'daniel.lopes@cubos.academy',
        senha: '123456'
      }
    });

    const resTodasContas = await request(server).get('/contas?senha_banco=Cubos123Bank');

    expect(resTodasContas.body).toEqual([
      {
        "numero": "1",
        "usuario": {
          "cpf": "12312312312",
          "data_nascimento": "10/01/1992",
          "email": "daniel.lopes@cubos.academy",
          "nome": "Daniel",
          "telefone": "(18) 99797-9797"
        }
      }
    ]);
  });

  it("Criando conta com o body inválido", async () => {
    const res = await request(server).post('/contas').send({
      nome: "",
      cpf: "22222222212",
      data_nascimento: "10/01/1992",
      telefone: "(18) 99797-9797",
      email: "guido.cerqueira@cubos.academy",
      senha: "22245678"
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Criando conta com cpf ou email já existente", async () => {
    const res = await request(server).post('/contas').send({
      nome: "Daniel",
      cpf: "12312312312",
      data_nascimento: "10/01/1992",
      telefone: "(18) 99797-9797",
      email: "daniel.lopes@cubos.academy",
      senha: "123456"
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem');
  });

  it("Criando conta com dados inválidos", async () => {
    const res = await request(server).post('/contas').send({
      nome: "Daniel Lopes",
      cpf: "12312312312",
      data_nascimento: "10/01/1992",
      telefone: "(18) 99797-9797",
      email: "danieldeandradelopes@gmail.com",
      senha: "12345678"
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem');
  });
});
