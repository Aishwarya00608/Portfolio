import { Router } from 'express';
import {
  getInternships,
  createInternship,
  updateInternship,
  deleteInternship,
} from '../controllers/internshipController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getInternships);
router.post('/', authenticateToken, createInternship);
router.put('/:id', authenticateToken, updateInternship);
router.delete('/:id', authenticateToken, deleteInternship);

export default router;
