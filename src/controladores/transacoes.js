const { format } = require("date-fns");
const bancodedados = require("../bancodedados");

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;
    const { contas, depositos } = bancodedados;

    if (!valor || !numero_conta) {
        return res.status(400).json({ mensagem: 'O número da conta e o valor são obrigatórios!' });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor não pode ser menor que zero!' });
    }

    const contaEncontrada = contas.find(conta => conta.numero === numero_conta);

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontada!' });
    }

    contaEncontrada.saldo += valor;

    depositos.push({
        data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta,
        valor
    });

    return res.json({ mensagem: 'Deposito realizado com sucesso!' });
}

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;
    const { contas, saques } = bancodedados;

    if (!valor || !numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta, senha e o valor são obrigatórios!' });
    }

    const contaEncontrada = contas.find(conta => conta.numero === numero_conta);

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontada!' });
    }

    if (contaEncontrada.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: 'Senha Inválida!' });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor não pode ser menor que zero!' });
    }

    if (contaEncontrada.saldo < valor) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente!' });
    }

    contaEncontrada.saldo -= valor;

    saques.push({
        data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta,
        valor
    });

    return res.json({ mensagem: 'Saque realizado com sucesso!' });
}

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
    const { contas, transferencias } = bancodedados;

    if (!valor || !numero_conta_origem || !numero_conta_destino || !senha) {
        return res.status(400).json({
            mensagem: 'O número da conta de origem, conta de destino, senha e o valor são obrigatórios!'
        });
    }

    const contaOrigemEncontrada = contas.find(conta => conta.numero === numero_conta_origem);

    if (!contaOrigemEncontrada) {
        return res.status(404).json({ mensagem: 'Conta bancária de origem não encontrada!' });
    }

    const contaDestinoEncontrada = contas.find(conta => conta.numero === numero_conta_destino);

    if (!contaDestinoEncontrada) {
        return res.status(404).json({ mensagem: 'Conta bancária de destino não encontrada!' });
    }

    if (contaOrigemEncontrada.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: 'Senha Inválida!' });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor não pode ser menor que zero!' });
    }

    if (contaOrigemEncontrada.saldo < valor) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente!' });
    }

    contaOrigemEncontrada.saldo -= valor;
    contaDestinoEncontrada.saldo += valor;

    transferencias.push({
        data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta_origem,
        numero_conta_destino,
        valor
    });

    return res.json({ mensagem: 'Transferência realizada com sucesso!' });
}

const saldo = (req, res) => {
    const { senha, numero_conta } = req.query;
    const { contas } = bancodedados;

    if (!senha || !numero_conta) {
        return res.status(400).json({ mensagem: 'O número da conta e a senha são obrigatórios!' });
    }

    const contaEncontrada = contas.find(conta => conta.numero === numero_conta);

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontada!' });
    }

    if (contaEncontrada.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: 'Senha Inválida!' });
    }

    return res.json({ saldo: contaEncontrada.saldo });
}

const extrato = (req, res) => {
    const { senha, numero_conta } = req.query;
    const { contas } = bancodedados;

    if (!senha || !numero_conta) {
        return res.status(400).json({ mensagem: 'O número da conta e a senha são obrigatórios!' });
    }

    const contaEncontrada = contas.find(conta => conta.numero === numero_conta);

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontada!' });
    }

    if (contaEncontrada.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: 'Senha Inválida!' });
    }

    const depositos = bancodedados.depositos.filter(deposito => deposito.numero_conta === contaEncontrada.numero);
    const saques = bancodedados.saques.filter(saque => saque.numero_conta === contaEncontrada.numero);

    const transferenciasEnviadas = bancodedados
        .transferencias
        .filter(transferencia => transferencia.numero_conta_origem === contaEncontrada.numero);

    const transferenciasRecebidas = bancodedados
        .transferencias
        .filter(transferencia => transferencia.numero_conta_destino === contaEncontrada.numero);

    return res.json({ depositos, saques, transferenciasEnviadas, transferenciasRecebidas });
}

module.exports = {
    depositar,
    sacar,
    transferir,
    saldo,
    extrato
}