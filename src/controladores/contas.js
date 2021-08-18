const bancodedados = require("../bancodedados");

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { contas } = bancodedados;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios!' });
    }

    const existeConta = contas.find(conta => {
        return conta.usuario.cpf === cpf || conta.usuario.email === email
    });

    if (existeConta) {
        return res.status(400).json({ mensagem: 'E-mail ou CPF já existe cadastrado!' });
    }

    const novaConta = {
        numero: (contas.length + 1).toString(),
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }

    contas.push(novaConta);

    return res.json(novaConta);
}

const listarContas = (req, res) => {
    const { senha_banco } = req.query;
    const { banco, contas } = bancodedados;

    if (!senha_banco) {
        return res.status(400).json({ mensagem: 'Senha Obrigatória!' });
    }

    if (senha_banco !== banco.senha) {
        return res.status(400).json({ mensagem: 'Senha Inválida!' });
    }

    const listagemContas = contas.map(conta => {
        return {
            numero: conta.numero,
            usuario: {
                nome: conta.usuario.nome,
                cpf: conta.usuario.cpf,
                email: conta.usuario.email,
                data_nascimento: conta.usuario.data_nascimento,
                telefone: conta.usuario.telefone
            }
        }
    });

    return res.json(listagemContas);
}

const atualizarUsuarioConta = (req, res) => {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { contas } = bancodedados;

    if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) {
        return res.status(400).json({ mensagem: 'É necessário informar ao meno um campo para atualizar!' });
    }

    const contaEncontrada = contas.find(conta => conta.numero === numeroConta);

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontada!' });
    }

    if (cpf && contaEncontrada.usuario.cpf !== cpf) {
        const existeCpf = contas.find(conta => conta.usuario.cpf === cpf);

        if (existeCpf) {
            return res.status(400).json({ mensagem: 'O CPF informado já existe cadastrado!' });
        }
    }

    if (email && contaEncontrada.usuario.email !== email) {
        const existeEmail = contas.find(conta => conta.usuario.email === email);

        if (existeEmail) {
            return res.status(400).json({ mensagem: 'O E-mail informado já existe cadastrado!' });
        }
    }

    const novoUsuario = {
        nome: nome || contaEncontrada.usuario.nome,
        cpf: cpf || contaEncontrada.usuario.cpf,
        data_nascimento: data_nascimento || contaEncontrada.usuario.data_nascimento,
        telefone: telefone || contaEncontrada.usuario.telefone,
        email: email || contaEncontrada.usuario.email,
        senha: senha || contaEncontrada.usuario.senha
    }

    contaEncontrada.usuario = novoUsuario;

    return res.json({ mensagem: 'Dados do usuário atualizado com sucesso!' });
}

const excluirConta = (req, res) => {
    const { numeroConta } = req.params;
    const { contas } = bancodedados;

    const contaEncontrada = contas.find(conta => conta.numero === numeroConta);

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontada!' });
    }

    if (contaEncontrada.saldo > 0) {
        return res.status(400).json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' });
    }

    bancodedados.contas = contas.filter(conta => conta.numero !== numeroConta);

    return res.json({ mensagem: 'Conta bancária removida com sucesso!' });
}

module.exports = {
    criarConta,
    listarContas,
    atualizarUsuarioConta,
    excluirConta
}