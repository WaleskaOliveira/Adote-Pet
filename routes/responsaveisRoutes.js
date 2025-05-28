import express from 'express';
import { criarResponsavel } from '../controllers/responsaveisController.js';

const router = express.Router();

router.post('/', criarResponsavel);

export default router;




