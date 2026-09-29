import { Router } from 'express';
import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from '../controllers/certificationController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getCertifications);
router.post('/', authenticateToken, createCertification);
router.put('/:id', authenticateToken, updateCertification);
router.delete('/:id', authenticateToken, deleteCertification);

export default router;
