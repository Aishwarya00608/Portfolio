import { Router } from 'express';
import {
  getHackathons,
  createHackathon,
  updateHackathon,
  deleteHackathon,
} from '../controllers/hackathonController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getHackathons);
router.post('/', authenticateToken, createHackathon);
router.put('/:id', authenticateToken, updateHackathon);
router.delete('/:id', authenticateToken, deleteHackathon);

export default router;
