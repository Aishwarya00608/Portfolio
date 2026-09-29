import { Router } from 'express';
import {
  getSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from '../controllers/socialController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getSocialLinks);
router.post('/', authenticateToken, createSocialLink);
router.put('/:id', authenticateToken, updateSocialLink);
router.delete('/:id', authenticateToken, deleteSocialLink);

export default router;
