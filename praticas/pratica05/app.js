var express = require('express');
var logger = require('morgan');
const tarefaRouter = require('./routes/tarefaRouter');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use('/tarefas', tarefaRouter);

module.exports = app;   