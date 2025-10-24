const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

router.post('/', produtosController.criar);
router.get('/', produtosController.listar);
router.get('/:id', produtosController.buscar, produtosController.exibir);
router.put('/:id', produtosController.atualizar);
router.delete('/:id', produtosController.remover);

module.exports = router;