const Tarefa = require('./modelo');

async function adicionarTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.inserir();
  return tarefa;
}

async function buscarTarefa(nome) {
  const tarefa = new Tarefa(nome);
  const resultado = await tarefa.buscar();
  return resultado; 
}

async function atualizarTarefa(nome, concluida) {
  const tarefa = new Tarefa(nome);
  const encontrada = await tarefa.buscar();
  if (!encontrada) {
    return null;
  }
  tarefa.concluida = concluida;
  await tarefa.alterar();
  return tarefa;
}

async function removerTarefa(nome) {
  const tarefa = new Tarefa(nome);
  const encontrada = await tarefa.buscar();
  if (!encontrada) return null;
  await tarefa.deletar();
  return tarefa;
}

module.exports = {
  adicionarTarefa,
  buscarTarefa,
  atualizarTarefa,
  removerTarefa
};
