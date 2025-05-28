import { connection } from '../config/db.js';


// Buscar todos os pets
export const getPets = (callback) => {
  db.query('SELECT * FROM pets', callback);
};

// Buscar pet por ID
export const getPetPorId = (id, callback) => {
  db.query('SELECT * FROM pets WHERE id = ?', [id], callback);
};

// Criar novo pet
export const createPet = (pet, callback) => {
  const { nome, especie, sexo, idade, cidade, estado, id_responsavel } = pet;
  db.query(
    'INSERT INTO pets (nome, especie, sexo, idade, cidade, estado, id_responsavel) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [nome, especie, sexo, idade, cidade, estado, id_responsavel],
    callback
  );
};

// Atualizar pet
export const updatePet = (id, pet, callback) => {
  const { nome, especie, sexo, idade, cidade, estado, id_responsavel } = pet;
  db.query(
    'UPDATE pets SET nome = ?, especie = ?, sexo = ?, idade = ?, cidade = ?, estado = ?, id_responsavel = ? WHERE id = ?',
    [nome, especie, sexo, idade, cidade, estado, id_responsavel, id],
    callback
  );
};

// Deletar pet
export const deletePet = (id, callback) => {
  db.query('DELETE FROM pets WHERE id = ?', [id], callback);
};
