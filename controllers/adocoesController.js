import { connection } from '../config/db.js';

export const getAdocoes = (req, res) => {
  connection.query('SELECT * FROM adocoes', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

export const createAdocao = (req, res) => {
  const { id_usuario, id_pet, data_adocao } = req.body;
  connection.query(
    'INSERT INTO adocoes (id_usuario, id_pet, data_adocao) VALUES (?, ?, ?)',
    [id_usuario, id_pet, data_adocao],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: results.insertId, id_usuario, id_pet });
    }
  );
};

export const updateAdocao = (req, res) => {
    const { id } = req.params;
    const { id_pet, id_usuario, data_adocao } = req.body;
    const sql = 'UPDATE adocoes SET id_pet = ?, id_usuario = ?, data_adocao = ? WHERE id = ?';
    db.query(sql, [id_pet, id_usuario, data_adocao, id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ mensagem: 'Adoção atualizada com sucesso!' });
    });
  };
  
  export const deleteAdocao = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM adocoes WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ mensagem: 'Adoção deletada com sucesso!' });
    });
  };
  

