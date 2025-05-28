import { connection } from '../config/db.js';


// Buscar todos os usuários
export const getUsuarios = (callback) => {
  db.query('SELECT * FROM usuarios', callback);
};

// Buscar usuário por ID
export const getUsuarioPorId = (id, callback) => {
  db.query('SELECT * FROM usuarios WHERE id = ?', [id], callback);
};

// Criar novo usuário
export const createUsuario = (usuario, callback) => {
  const { nome, email, senha, telefone } = usuario;
  db.query(
    'INSERT INTO usuarios (nome, email, senha, telefone) VALUES (?, ?, ?, ?)',
    [nome, email, senha, telefone],
    callback
  );
};

// Atualizar dados do usuário
export const updateUsuario = (id, usuario, callback) => {
  const { nome, email, senha, telefone } = usuario;
  db.query(
    'UPDATE usuarios SET nome = ?, email = ?, senha = ?, telefone = ? WHERE id = ?',
    [nome, email, senha, telefone, id],
    callback
  );
};

// Deletar usuário
export const deleteUsuario = (id, callback) => {
  db.query('DELETE FROM usuarios WHERE id = ?', [id], callback);
};
