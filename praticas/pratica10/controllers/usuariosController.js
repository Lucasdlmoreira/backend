const { cifrarSenha, gerarToken, compararSenha } = require('../middlewares/authMiddleware');
const usuariosModel = require('../models/usuariosModel');

async function criar(req, res) {
    try {
        if (!req.body.email || !req.body.senha) {
            throw new Error("Dados incompletos");
        }
        
        const senhaCifrada = cifrarSenha(req.body.senha);
        const novoUsuario = await usuariosModel.create({
            email: req.body.email,
            senha: senhaCifrada
        });
        
        res.status(201).json({
            _id: novoUsuario._id,
            email: novoUsuario.email
        });
    } catch (error) {
        console.error("ERRO NO CONTROLLER:", error);
        res.status(422).json({ msg: "Email e Senha são obrigatórios" });
    }
}

async function entrar(req, res) {
    try {
        const usuarioEncontrado = await usuariosModel.findOne({ email: req.body.usuario });
        
        if (usuarioEncontrado) {
            const senhaConfere = compararSenha(req.body.senha, usuarioEncontrado.senha);
            if (senhaConfere) {
                const token = gerarToken({ email: req.body.usuario });
                return res.status(200).json({ token });
            }
        }
        res.status(401).json({ msg: "Credenciais inválidas" });
    } catch (error) {
        res.status(500).json({ msg: "Erro interno" });
    }
}

async function renovar(req, res) {
    const token = gerarToken({ email: req.usuario.email });
    res.status(200).json({ token });
}

async function remover(req, res) {
    await usuariosModel.findOneAndDelete({ email: req.body.usuario });
    res.status(204).end();
}

module.exports = { criar, entrar, renovar, remover };