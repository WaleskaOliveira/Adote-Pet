import { connection } from '../config/db.js';

// Buscar todos os usuários
export const getUsuarios = (req, res) => {
  connection.query('SELECT * FROM usuarios', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Criar novo usuário
export const createUsuario = (req, res) => {
  const { nome, telefone, email, senha } = req.body;
  connection.query(
    'INSERT INTO usuarios (nome, telefone, email, senha) VALUES (?, ?, ?, ?)',
    [nome, telefone, email, senha],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: results.insertId, nome, telefone, email });
    }
  );
};

// Atualizar usuário
export const updateUsuario = (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  const sql = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?';

  connection.query(sql, [nome, email, senha, id], (err, result) => {
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

  connection.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ mensagem: 'Usuário deletado com sucesso!' });
  });
};

// Login de usuário (email ou telefone)
export const loginUsuario = (req, res) => {
  const { emailOuTelefone, senha } = req.body;

  // Primeiro, verificar se o usuário existe
  const checkUserSql = `
    SELECT * FROM usuarios 
    WHERE email = ? OR telefone = ?
  `;

  connection.query(checkUserSql, [emailOuTelefone, emailOuTelefone], (err, results) => {
    if (err) {
      console.error("Erro ao verificar usuário:", err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuário não cadastrado' });
    }

    // Usuário existe, agora verificar a senha
    const usuario = results[0];
    if (usuario.senha !== senha) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Login bem-sucedido
    res.status(200).json({ mensagem: 'Login bem-sucedido', usuario });
  });
};
