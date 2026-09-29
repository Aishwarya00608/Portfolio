import { Router } from 'express';
import {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from '../controllers/achievementController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getAchievements);
router.post('/', authenticateToken, createAchievement);
router.put('/:id', authenticateToken, updateAchievement);
router.delete('/:id', authenticateToken, deleteAchievement);

export default router;
