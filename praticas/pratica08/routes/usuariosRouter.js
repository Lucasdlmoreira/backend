const express = require('express');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

function gerarToken(payload) {
  const expiresIn = 120; 
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  } catch (error) {
    throw new Error('Erro ao gerar o token');
  }
}

router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario === 'email@exemplo.com' && senha === 'abcd1234') {
    const token = gerarToken({ email: usuario });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ msg: 'Credenciais inválidas' });
});

router.post('/renovar', authMiddleware, (req, res) => {
  try {
    const novoToken = gerarToken({ email: req.user.email });
    return res.status(200).json({ token: novoToken });
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao renovar token' });
  }
});

module.exports = router;
