const readline = require('readline-sync'); 
const controlador = require('./controlador'); 

function menu() {
  console.log('\n=== MENU ===');
  console.log('1. Adicionar contato');
  console.log('2. Buscar contato');
  console.log('3. Atualizar contato');
  console.log('4. Remover contato');
  console.log('5. Sair');
}

async function escolherOpcao(opcao) {
  switch (opcao) {
    case '1':
      var nome = readline.question('Nome da tarefa: ');
      await controlador.adicionarTarefa(nome);
      console.log('Tarefa adicionada.');
      break;

    case '2':
      var nome = readline.question('Nome da tarefa a buscar: ');
      var resultado = await controlador.buscarTarefa(nome);
      if (resultado) {
        console.log('Tarefa encontrada:');
        console.log('ID:', resultado.id);
        console.log('Nome:', resultado.nome);
        console.log('Concluída:', resultado.concluida);
      } else {
        console.log('Tarefa não encontrada.');
      }
      break;

    case '3':
      var nome = readline.question('Nome da tarefa a atualizar: ');
      var resp = readline.question('A tarefa está concluída? (s/n ou true/false): ');
      var concluida = (resp.trim().toLowerCase() === 's' || resp.trim().toLowerCase() === 'true');
      var atualizada = await controlador.atualizarTarefa(nome, concluida);
      if (atualizada) console.log('Tarefa atualizada.');
      else console.log('Tarefa não encontrada.');
      break;

    case '4':
      var nome = readline.question('Nome da tarefa a remover: ');
      var removida = await controlador.removerTarefa(nome);
      if (removida) console.log('Tarefa removida.');
      else console.log('Tarefa não encontrada.');
      break;

    case '5':
      console.log('Saindo...');
      process.exit(0);
      break;

    default:
      console.log('Opção inválida. Digite 1-5.');
      break;
  }
}

async function main() {
  while (true) {
    menu();
    const opcao = readline.question('Escolha uma opção: ');
    await escolherOpcao(opcao);
  }
}

main();
