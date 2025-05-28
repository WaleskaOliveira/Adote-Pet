import express from 'express';
import {
  createPet,
  getPets,
  updatePet,
  deletePet,
  upload
} from '../controllers/petsController.js';

const router = express.Router();

router.get('/', getPets);
router.post('/', upload.single('imagem'), createPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

export default router;


