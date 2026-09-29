import { Router } from 'express';
import multer from 'multer';
import { uploadPhoto, uploadResume } from '../controllers/uploadController';
import { authenticateToken } from '../middleware/authMiddleware';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

const router = Router();

router.post('/photo', authenticateToken, upload.single('file'), uploadPhoto);
router.post('/resume', authenticateToken, upload.single('file'), uploadResume);

export default router;
