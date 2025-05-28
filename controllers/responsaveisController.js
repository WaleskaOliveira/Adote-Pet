import { connection } from '../config/db.js';

export const criarResponsavel = (req, res) => {
  const { nome, telefone } = req.body;

  // Verificação simples
  if (!nome || !telefone) {
    return res.status(400).json({ error: "Nome e telefone são obrigatórios." });
  }

  const sql = 'INSERT INTO responsaveis (nome, telefone) VALUES (?, ?)';
  connection.query(sql, [nome, telefone], (err, results) => {
    if (err) {
      console.error("Erro ao inserir responsável:", err);
      return res.status(500).json({ error: err });
    }

    res.status(201).json({ id: results.insertId });
  });
};

    

  

