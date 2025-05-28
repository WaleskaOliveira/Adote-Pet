import express from 'express';
import { getAdocoes, createAdocao, updateAdocao, deleteAdocao } from '../controllers/adocoesController.js';

const router = express.Router();

router.get('/', getAdocoes);
router.post('/', createAdocao);
router.put('/:id', updateAdocao);
router.delete('/:id', deleteAdocao);

export default router;



