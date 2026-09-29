import { Request, Response } from 'express';
import path from 'path';
import { uploadFileToStorage } from '../services/storageService';

export const uploadPhoto = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please select an image file.' });
    }

    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const fileExt = path.extname(req.file.originalname).toLowerCase();

    if (!allowedMimeTypes.includes(req.file.mimetype) && !allowedExtensions.includes(fileExt)) {
      return res.status(400).json({
        message: 'Only JPG, PNG and WEBP files are supported.',
      });
    }

    // 5MB limit check
    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ message: 'Profile photo must be smaller than 5MB.' });
    }

    const url = await uploadFileToStorage(req.file, 'photo');
    return res.json({
      url,
      message: 'Profile photo uploaded successfully!',
    });
  } catch (error) {
    console.error('Error uploading photo:', error);
    return res.status(500).json({ message: 'Upload failed. Please try again.' });
  }
};

export const uploadResume = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please select a PDF file.' });
    }

    const allowedMimeTypes = ['application/pdf'];
    const allowedExtensions = ['.pdf'];
    const fileExt = path.extname(req.file.originalname).toLowerCase();

    if (!allowedMimeTypes.includes(req.file.mimetype) && !allowedExtensions.includes(fileExt)) {
      return res.status(400).json({
        message: 'Only PDF files are supported.',
      });
    }

    // 10MB limit check
    if (req.file.size > 10 * 1024 * 1024) {
      return res.status(400).json({ message: 'Resume PDF must be smaller than 10MB.' });
    }

    const url = await uploadFileToStorage(req.file, 'resume');
    return res.json({
      url,
      message: 'Resume uploaded successfully!',
    });
  } catch (error) {
    console.error('Error uploading resume:', error);
    return res.status(500).json({ message: 'Upload failed. Please try again.' });
  }
};
