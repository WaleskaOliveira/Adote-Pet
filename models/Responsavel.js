import { connection } from '../config/db.js';


// Buscar todos os responsáveis
export const getResponsaveis = (callback) => {
  db.query('SELECT * FROM responsaveis', callback);
};

// Buscar responsável por ID
export const getResponsavelPorId = (id, callback) => {
  db.query('SELECT * FROM responsaveis WHERE id = ?', [id], callback);
};

// Criar novo responsável
export const createResponsavel = (responsavel, callback) => {
  const { nome, email, telefone, cidade, estado } = responsavel;
  db.query(
    'INSERT INTO responsaveis (nome, email, telefone, cidade, estado) VALUES (?, ?, ?, ?, ?)',
    [nome, email, telefone, cidade, estado],
    callback
  );
};

// Atualizar responsável
export const updateResponsavel = (id, responsavel, callback) => {
  const { nome, email, telefone, cidade, estado } = responsavel;
  db.query(
    'UPDATE responsaveis SET nome = ?, email = ?, telefone = ?, cidade = ?, estado = ? WHERE id = ?',
    [nome, email, telefone, cidade, estado, id],
    callback
  );
};

// Deletar responsável
export const deleteResponsavel = (id, callback) => {
  db.query('DELETE FROM responsaveis WHERE id = ?', [id], callback);
};
