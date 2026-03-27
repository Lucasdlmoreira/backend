const Produto = require('../models/produtosModel');

const criar = async (req, res) => {
  try {
    const { nome, preco } = req.body;
    if (!nome || preco === undefined) {
      return res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
    }

    const novoProduto = await Produto.create({ nome, preco });
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const listar = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const buscar = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(400).json({ msg: 'Parâmetro inválido' });
    }

    const produto = await Produto.findById(id);
    if (!produto) {
      return res.status(404).json({ msg: 'Produto não encontrado' });
    }

    req.produto = produto;
    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const exibir = (req, res) => {
  res.status(200).json(req.produto);
};

const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, preco } = req.body;

    if (!id || id.length !== 24) {
      return res.status(400).json({ msg: 'Parâmetro inválido' });
    }

    if (!nome || preco === undefined) {
      return res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
    }

    const produtoAtualizado = await Produto.findByIdAndUpdate(
      id,
      { nome, preco },
      { new: true, runValidators: true }
    );

    if (!produtoAtualizado) {
      return res.status(404).json({ msg: 'Produto não encontrado' });
    }

    res.status(200).json(produtoAtualizado);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const remover = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(400).json({ msg: 'Parâmetro inválido' });
    }

    const produtoRemovido = await Produto.findByIdAndDelete(id);

    if (!produtoRemovido) {
      return res.status(404).json({ msg: 'Produto não encontrado' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  criar,
  listar,
  buscar,
  exibir,
  atualizar,
  remover
};