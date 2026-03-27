var express = require('express');
var usuariosController = require('../controllers/usuariosController');
var { verificarToken } = require('../middlewares/authMiddleware');

var router = express.Router();

router.post('/', usuariosController.criar);
router.post('/login', usuariosController.entrar);
router.post('/renovar', verificarToken, usuariosController.renovar);
router.delete('/', verificarToken, usuariosController.remover); 

module.exports = router;