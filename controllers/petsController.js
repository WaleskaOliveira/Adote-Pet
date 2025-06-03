import { connection } from '../config/db.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});

export const upload = multer({ storage });

export const createPet = (req, res) => {
  const {
    nome,
    especie,
    genero,
    idade,
    estado,
    cidade,
    id_responsavel,
    detalhes
  } = req.body;

  const imagem = req.file ? req.file.filename : null;

  const insertPet = `
    INSERT INTO pets (nome, especie, genero, idade, estado, cidade, detalhes, imagem, id_responsavel)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [nome, especie, genero, idade, estado, cidade, detalhes, imagem, id_responsavel];

  connection.query(insertPet, values, (err, results) => {
    if (err) {
      console.error("Erro ao inserir pet:", err);
      return res.status(500).send(err);
    }
    res.status(201).json({ id: results.insertId, nome });
  });
};

export const getPets = (req, res) => {
  const sql = `
    SELECT 
      pets.*, 
      responsaveis.nome AS responsavel_nome, 
      responsaveis.telefone AS responsavel_telefone
    FROM pets
    JOIN responsaveis ON pets.id_responsavel = responsaveis.id
  `;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar pets:", err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
};

export const updatePet = (req, res) => {
  const { id } = req.params;
  const {
    nome,
    especie,
    genero,
    idade,
    estado,
    cidade,
    imagem,
    id_responsavel,
    detalhes
  } = req.body;

  const sql = `
    UPDATE pets
    SET nome = ?, especie = ?, genero = ?, idade = ?, estado = ?, cidade = ?, imagem = ?, id_responsavel = ?, detalhes = ?
    WHERE id = ?
  `;

  const values = [nome, especie, genero, idade, estado, cidade, imagem, id_responsavel, detalhes, id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erro ao atualizar pet:", err);
      return res.status(500).json(err);
    }
    res.json({ mensagem: 'Pet atualizado com sucesso!' });
  });
};

export const deletePet = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM pets WHERE id = ?';

  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao deletar pet:", err);
      return res.status(500).json(err);
    }
    res.json({ mensagem: 'Pet deletado com sucesso!' });
  });
};

