import { Router } from 'express';
import {
  submitContact,
  getContactMessages,
  markMessageRead,
  deleteContactMessage,
} from '../controllers/contactController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/', submitContact);
router.get('/', authenticateToken, getContactMessages);
router.put('/:id', authenticateToken, markMessageRead);
router.delete('/:id', authenticateToken, deleteContactMessage);

export default router;
