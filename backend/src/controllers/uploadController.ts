import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import http from 'http';
import https from 'https';
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

export const uploadProjectImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please select an image file for the project.' });
    }

    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const fileExt = path.extname(req.file.originalname).toLowerCase();

    if (!allowedMimeTypes.includes(req.file.mimetype) && !allowedExtensions.includes(fileExt)) {
      return res.status(400).json({
        message: 'Only JPG, PNG and WEBP image files are supported.',
      });
    }

    if (req.file.size > 10 * 1024 * 1024) {
      return res.status(400).json({ message: 'Project image must be smaller than 10MB.' });
    }

    const url = await uploadFileToStorage(req.file, 'project');
    return res.json({
      url,
      message: 'Project image uploaded successfully!',
    });
  } catch (error) {
    console.error('Error uploading project image:', error);
    return res.status(500).json({ message: 'Upload failed. Please try again.' });
  }
};

export const uploadCertificate = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please select a certificate file (PDF, PNG, JPG, WEBP).' });
    }

    const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.webp'];
    const fileExt = path.extname(req.file.originalname).toLowerCase();

    if (!allowedMimeTypes.includes(req.file.mimetype) && !allowedExtensions.includes(fileExt)) {
      return res.status(400).json({
        message: 'Only PDF, JPG, PNG and WEBP files are supported for certificates.',
      });
    }

    if (req.file.size > 10 * 1024 * 1024) {
      return res.status(400).json({ message: 'Certificate file must be smaller than 10MB.' });
    }

    const url = await uploadFileToStorage(req.file, 'certificate');
    return res.json({
      url,
      message: 'Certificate uploaded successfully!',
    });
  } catch (error) {
    console.error('Error uploading certificate:', error);
    return res.status(500).json({ message: 'Upload failed. Please try again.' });
  }
};

export const viewCertificate = async (req: Request, res: Response) => {
  try {
    const rawUrl = req.query.url as string;
    if (!rawUrl) {
      return res.status(400).json({ message: 'Certificate URL parameter is required.' });
    }

    const decodedUrl = decodeURIComponent(rawUrl);

    let contentType = 'application/pdf';
    const lowerUrl = decodedUrl.toLowerCase();
    if (lowerUrl.endsWith('.png')) {
      contentType = 'image/png';
    } else if (lowerUrl.endsWith('.jpg') || lowerUrl.endsWith('.jpeg')) {
      contentType = 'image/jpeg';
    } else if (lowerUrl.endsWith('.webp')) {
      contentType = 'image/webp';
    } else if (lowerUrl.endsWith('.pdf')) {
      contentType = 'application/pdf';
    }

    if (decodedUrl.startsWith('http://') || decodedUrl.startsWith('https://')) {
      const client = decodedUrl.startsWith('https://') ? https : http;
      client.get(decodedUrl, (stream) => {
        if (stream.statusCode && stream.statusCode >= 300 && stream.statusCode < 400 && stream.headers.location) {
          const redirectClient = stream.headers.location.startsWith('https://') ? https : http;
          redirectClient.get(stream.headers.location, (redirectStream) => {
            const finalType = redirectStream.headers['content-type'] || contentType;
            res.setHeader('Content-Type', finalType);
            res.setHeader('Content-Disposition', 'inline');
            redirectStream.pipe(res);
          });
        } else {
          const finalType = stream.headers['content-type'] || contentType;
          res.setHeader('Content-Type', finalType);
          res.setHeader('Content-Disposition', 'inline');
          stream.pipe(res);
        }
      }).on('error', (err) => {
        console.error('Error streaming remote certificate:', err);
        if (!res.headersSent) {
          res.status(500).json({ message: 'Failed to stream certificate file.' });
        }
      });
    } else {
      const uploadsDir = path.join(process.cwd(), 'uploads');
      const filename = path.basename(decodedUrl);
      const filePath = path.join(uploadsDir, filename);

      if (fs.existsSync(filePath)) {
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', 'inline');
        return fs.createReadStream(filePath).pipe(res);
      } else {
        return res.status(404).json({ message: 'Certificate file not found.' });
      }
    }
  } catch (error) {
    console.error('Error viewing certificate:', error);
    if (!res.headersSent) {
      return res.status(500).json({ message: 'Failed to display certificate.' });
    }
  }
};
