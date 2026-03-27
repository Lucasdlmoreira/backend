const { conectarDb } = require('./database');

class Tarefa {
 
  db = conectarDb();

  collection = this.db.then(database => database.collection('tarefas'));

  constructor(nome, concluida = false) {
    this.id = null;          
    this.nome = nome;        
    this.concluida = concluida; 
  }

  async inserir() {
    const collection = await this.collection;
    const resultado = await collection.insertOne({ nome: this.nome, concluida: this.concluida });
    this.id = resultado.insertedId;
    return resultado;
  }

  async alterar() {
    const collection = await this.collection;
    await collection.updateOne(
      { _id: this.id }, 
      { $set: { nome: this.nome, concluida: this.concluida } } 
    );
  }

  async deletar() {
    const collection = await this.collection;
    await collection.deleteOne({ nome: this.nome });
  }

  async buscar() {
    const collection = await this.collection;
    const resultado = await collection.findOne({ nome: this.nome });
    if (!resultado) return null; // não achou
    this.id = resultado._id;
    this.nome = resultado.nome;
    this.concluida = resultado.concluida;
    return this;
  }
}

module.exports = Tarefa;
