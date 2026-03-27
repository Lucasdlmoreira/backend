const express = require('express');
const app = express();
const apidocsRouter = require('./routes/apidocsRouter');

app.use(express.json());
app.use('/api-docs', apidocsRouter);

module.exports = app;
