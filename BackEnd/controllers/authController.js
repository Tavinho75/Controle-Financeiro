const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.register = (req, res) => {
  const { nome, email, senha } = req.body;

  bcrypt.hash(senha, 10, (err, hash) => {
    if (err) return res.status(500).send(err);

    User.create({ nome, email, senha: hash }, (err) => {
      if (err) return res.status(500).send(err);
      res.send({ message: '✅ Usuário criado com sucesso!' });
    });
  });
};

exports.login = (req, res) => {
  const { email, senha } = req.body;

  User.findByEmail(email, (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).send({ message: '❌ Usuário não encontrado' });
    }

    const user = results[0];
    bcrypt.compare(senha, user.senha, (err, match) => {
      if (!match) return res.status(401).send({ message: '❌ Senha incorreta' });
      res.send({ message: '✅ Login realizado com sucesso!' });
    });
  });
};
