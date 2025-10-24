require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const produtosRouter = require('./routes/produtosRouter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/produtos', produtosRouter);

const startServer = async () => {
  try {
    const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
    console.log('Conectando ao MongoDB...');
    await mongoose.connect(uri);
    console.log('Conectado ao MongoDB Atlas!');
  } catch (err) {
    console.error('Erro ao conectar no MongoDB:', err.message);
  }
};
startServer();
module.exports = app;