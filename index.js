import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connection } from './config/db.js';


import usuariosRoutes from './routes/usuariosRoutes.js';
import petsRoutes from './routes/petsRoutes.js';
import adocoesRoutes from './routes/adocoesRoutes.js';
import responsaveisRoutes from './routes/responsaveisRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuariosRoutes);
app.use('/pets', petsRoutes);
app.use('/adocoes', adocoesRoutes);
app.use('/responsaveis', responsaveisRoutes);
app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) => {
  res.send('API AdotePet está no ar! 🐶🐱');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
