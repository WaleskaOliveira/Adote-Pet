import express from 'express';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario, loginUsuario } from '../controllers/usuariosController.js';

const router = express.Router();

router.get('/', getUsuarios);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);
router.post('/login', loginUsuario); 


export default router;


