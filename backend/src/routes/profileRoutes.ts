import { Router } from 'express';
import { getProfile, updateProfile, downloadResume } from '../controllers/profileController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getProfile);
router.get('/resume/download', downloadResume);
router.put('/', authenticateToken, updateProfile);

export default router;
