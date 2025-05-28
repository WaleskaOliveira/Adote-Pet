import { connection } from '../config/db.js';

export const getUsuarios = (req, res) => {
  connection.query('SELECT * FROM usuarios', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

export const createUsuario = (req, res) => {
  const { nome, telefone, email, senha } = req.body;
  connection.query('INSERT INTO usuarios (nome, telefone, email, senha) VALUES (?, ?, ?, ?)', [nome, telefone, email,senha], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: results.insertId, nome, telefone, email,senha });
  });
};

// Atualizar usuário
export const updateUsuario = (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
  
    const sql = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?';
  
    db.query(sql, [nome, email, senha, id], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao atualizar usuário', details: err });
      } else {
        res.status(200).json({ message: 'Usuário atualizado com sucesso' });
      }
    });
  };
  
  
  // Deletar usuário
  export const deleteUsuario = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM usuarios WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ mensagem: 'Usuário deletado com sucesso!' });
    });
  };
  
