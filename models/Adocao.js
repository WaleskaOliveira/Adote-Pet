import { connection } from '../config/db.js';


// Buscar todas as adoções
export const getAdocoes = (callback) => {
  db.query('SELECT * FROM adocoes', callback);
};

// Buscar adoção por ID
export const getAdocaoPorId = (id, callback) => {
  db.query('SELECT * FROM adocoes WHERE id = ?', [id], callback);
};

// Criar nova adoção
export const createAdocao = (adocao, callback) => {
  const { id_usuario, id_pet, data_adocao } = adocao;
  db.query(
    'INSERT INTO adocoes (id_usuario, id_pet, data_adocao) VALUES (?, ?, ?)',
    [id_usuario, id_pet, data_adocao],
    callback
  );
};

// Atualizar adoção
export const updateAdocao = (id, adocao, callback) => {
  const { id_usuario, id_pet, data_adocao } = adocao;
  db.query(
    'UPDATE adocoes SET id_usuario = ?, id_pet = ?, data_adocao = ? WHERE id = ?',
    [id_usuario, id_pet, data_adocao, id],
    callback
  );
};

// Deletar adoção
export const deleteAdocao = (id, callback) => {
  db.query('DELETE FROM adocoes WHERE id = ?', [id], callback);
};
