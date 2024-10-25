const express = require('express');
const sequelize = require('./database/database');
const User = require('./models/userModel');
const Produto = require('./models/produtoModel');
require('dotenv').config();
const cors = require('cors');


const app = express();

const corsOptions = {
  origin: ['http://127.0.0.1:5500','http://localhost:5500', 'http://localhost:8080', 'http://127.0.0.1:8088'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-KEY', 'X-Requested-With', 'X-Custom-Header'],
  credentials: true,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

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
