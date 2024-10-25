const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  perfil: {
    type: DataTypes.ENUM('inserir', 'listar', 'admin'),
    allowNull: false,
  },
});

User.beforeCreate(async (user) => {
  user.senha = await bcrypt.hash(user.senha, 10);
});

module.exports = User;
