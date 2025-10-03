const tarefaModel = require('../models/tarefaModel');

function listar(req, res) {
  const resultado = tarefaModel.listar();
  res.json(resultado);
}

function buscarPeloId(req, res) {
  const { tarefaId } = req.params;
  const resultado = tarefaModel.buscarPeloId(tarefaId);

  if (!resultado) {
    return res.status(404).json({ msg: "Tarefa não encontrada" });
  }

  res.json(resultado);
}

function criar(req, res) {
  const novaTarefa = {
    nome: req.body.nome,
    concluida: req.body.concluida
  };

  const resultado = tarefaModel.criar(novaTarefa);
  res.status(201).json(resultado);
}

function atualizar(req, res) {
  const tarefa = {
    id: req.params.tarefaId,
    nome: req.body.nome,
    concluida: req.body.concluida
  };

  const resultado = tarefaModel.atualizar(tarefa);

  if (!resultado) {
    return res.status(404).json({ msg: "Tarefa não encontrada" });
  }

  res.json(resultado);
}

function remover(req, res) {
  const { tarefaId } = req.params;
  const resultado = tarefaModel.remover(tarefaId);

  if (!resultado) {
    return res.status(404).json({ msg: "Tarefa não encontrada" });
  }

  res.status(204).send();
}

module.exports = {
  listar, buscarPeloId, criar, atualizar, remover
};