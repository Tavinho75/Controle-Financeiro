const db = require('../db/database');

const User = {
  create: (user, callback) => {
    const query = 'INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)';
    db.query(query, [user.nome, user.email, user.senha], callback);
  },
  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], callback);
  }
};

module.exports = User;
