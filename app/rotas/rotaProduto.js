const express = require('express');
const router = express.Router();
const Produto = require('../models/produtoModel');
const autentica = require('../middleware/autenticar');
const autoriza = require('../middleware/autorizar');

router.use(autentica);

router.get('/', autoriza(['listar', 'admin']), async (req, res) => {
  try {
    const prods = await Produto.findAll();
    res.send(prods);
  } catch (error) {
    res.status(400).send({ error: 'Erro ao listar produtos' });
  }
});

router.post('/', autoriza(['inserir', 'admin']), async (req, res) => {
  const { nome, quantidade, preco } = req.body;

  try {
    const prods = await Produto.create({ nome, quantidade, preco });
    res.send(prods);
  } catch (error) {
    res.status(400).send({ error: 'Erro ao inserir produto' });
  }
});

router.put('/:id', autoriza(['admin']), async (req, res) => {
  const { nome, quantidade, preco } = req.body;

  try {
    const prods = await Produto.findByPk(req.params.id);
    if (!prods)
      return res.status(404).send({ error: 'Produto não encontrado' });

    await prods.update({ nome, quantidade, preco });
    res.send(prods);
  } catch (error) {
    res.status(400).send({ error: 'Erro ao atualizar produto' });
  }
});

router.delete('/:id', autoriza(['admin']), async (req, res) => {
  try {
    const prods = await Produto.findByPk(req.params.id);
    if (!prods)
      return res.status(404).send({ error: 'Produto não encontrado' });

    await prods.destroy();
    res.send({ message: 'Produto deletado' });
  } catch (error) {
    res.status(400).send({ error: 'Erro ao deletar produto' });
  }
});

module.exports = router;
