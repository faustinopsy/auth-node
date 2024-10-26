const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const cabecalho = req.headers['authorization'];

  if (!cabecalho)
    return res.status(401).send({ error: 'Token não fornecido' });
                
  const partes = cabecalho.split(' ');

  if (partes.length !== 2)
    return res.status(401).send({ error: 'Token inválido' });

  const [beare, token] = partes;
  if (!/^Bearer$/i.test(beare))
    return res.status(401).send({ error: 'Token malformado' });


  if (!token)
    return res.status(401).send({ error: 'Token não fornecido' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    
    if (err)
      return res.status(401).send({ error: 'Token inválido' });

    req.userId = decoded.id;
    req.userPerfil = decoded.perfil;
    next();
  });
};
