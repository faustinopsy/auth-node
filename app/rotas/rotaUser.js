const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  const { nome, email, senha, perfil } = req.body;
  try {
    const user = await User.create({ nome, email, senha, perfil });
    user.senha = undefined;

    const token = jwt.sign({ id: user.id, perfil: user.perfil }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });

    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: 'Falha no registro' });
  }
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(400).send({ error: 'Usuário não encontrado' });

    const isMatch = await bcrypt.compare(senha, user.senha);

    if (!isMatch)
      return res.status(400).send({ error: 'Senha inválida' });

    user.senha = undefined;

    const token = jwt.sign({ id: user.id, perfil: user.perfil }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });

    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: 'Falha no login' });
  }
});

module.exports = router;
