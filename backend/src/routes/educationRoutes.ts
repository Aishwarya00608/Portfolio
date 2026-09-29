import { Router } from 'express';
import {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from '../controllers/educationController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getEducation);
router.post('/', authenticateToken, createEducation);
router.put('/:id', authenticateToken, updateEducation);
router.delete('/:id', authenticateToken, deleteEducation);

export default router;
