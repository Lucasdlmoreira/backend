const express = require('express'); 
const app = express(); 
app.use(express.json());

const tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true }
];

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

app.get('/tarefas', (req, res) => res.json(tarefas)); 

app.post('/tarefas', (req, res) => {
  const novaTarefa = { id: tarefas.length + 1, ...req.body };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

app.get('/tarefas/:id', (req, res, next) => {
  const t = tarefas.find(t => t.id === parseInt(req.params.id));
  if (!t) return next(new Error('Tarefa não encontrada')); 
  res.json(t);
});

app.put('/tarefas/:id', (req, res, next) => {
  const t = tarefas.find(t => t.id === parseInt(req.params.id));
  if (!t) return next(new Error('Tarefa não encontrada')); 
  Object.assign(t, req.body);
  res.json(t);
});

app.delete('/tarefas/:id', (req, res, next) => {
  const index = tarefas.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return next(new Error('Tarefa não encontrada')); 
  tarefas.splice(index, 1);
  res.sendStatus(204);
});

app.use((err, req, res, next) => {
  res.status(400).json({ mensagem: err.message });
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));

module.exports = app;