import { Router } from 'express';
import multer from 'multer';
import {
  uploadPhoto,
  uploadResume,
  uploadProjectImage,
  uploadCertificate,
  viewCertificate,
} from '../controllers/uploadController';
import { authenticateToken } from '../middleware/authMiddleware';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

const router = Router();

router.post('/photo', authenticateToken, upload.single('file'), uploadPhoto);
router.post('/resume', authenticateToken, upload.single('file'), uploadResume);
router.post('/project-image', authenticateToken, upload.single('file'), uploadProjectImage);
router.post('/certificate', authenticateToken, upload.single('file'), uploadCertificate);
router.get('/certificate/view', viewCertificate);

export default router;
