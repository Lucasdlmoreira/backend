const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function verificarToken(req, res, next) {
    const token = req.headers['authorization']; 
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.usuario = decoded; 
            next();
        } catch (error) {
            return res.status(401).json({ msg: "Token invalido" });
        }
    } else {
        return res.status(401).json({ msg: "Token não fornecido" });
    }
}

function gerarToken(payload) {
    try {
        const expiresIn = parseInt(process.env.JWT_EXPIRES);
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    } catch (error) {
        throw new Error("Erro ao gerar o token");
    }
}

function cifrarSenha(senha) {
    const salto = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salto);
    return hash;
}

function compararSenha(senha, hash) {
    return bcrypt.compareSync(senha, hash);
}

module.exports = {
    verificarToken,
    gerarToken,
    cifrarSenha,
    compararSenha
};