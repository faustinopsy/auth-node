const express = require('express');
const sequelize = require('./database/database');
const User = require('./models/userModel');
const Produto = require('./models/produtoModel');
require('dotenv').config();

const app = express();
app.use(express.json());

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Banco de dados sincronizado');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });

const rotaUsuarios = require('./rotas/rotaUser');
app.use('/auth', rotaUsuarios);

const rotaProdutos = require('./rotas/rotaProduto');
app.use('/products', rotaProdutos);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
