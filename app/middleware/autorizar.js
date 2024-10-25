module.exports = (perfisPermitidos) => {
    return (req, res, next) => {
      if (!perfisPermitidos.includes(req.userPerfil)) {
        return res.status(403).send({ error: 'Acesso negado' });
      }
      next();
    };
  };
  