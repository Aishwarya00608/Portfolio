import { Request, Response } from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import prisma from '../lib/prisma';

export const getProfile = async (_req: Request, res: Response) => {
  try {
    let profile = await prisma.profile.findFirst();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found.' });
    }
    return res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ message: 'Error retrieving profile data.' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    let profile = await prisma.profile.findFirst();
    const data = req.body;

    if (profile) {
      const updated = await prisma.profile.update({
        where: { id: profile.id },
        data,
      });
      return res.json(updated);
    } else {
      const created = await prisma.profile.create({
        data,
      });
      return res.status(201).json(created);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: 'Failed to update profile.' });
  }
};

export const downloadResume = async (_req: Request, res: Response) => {
  try {
    const profile = await prisma.profile.findFirst();
    let resumeUrl = profile?.resumeUrl || 'https://aishwarya00608.github.io/resume.pdf';

    // Format Cloudinary raw URLs if present
    if (resumeUrl.includes('cloudinary.com') && resumeUrl.includes('/raw/upload/')) {
      resumeUrl = resumeUrl.replace('/raw/upload/', '/raw/upload/fl_attachment/');
      if (!resumeUrl.toLowerCase().endsWith('.pdf')) {
        resumeUrl += '.pdf';
      }
    }

    if (resumeUrl.startsWith('http://') || resumeUrl.startsWith('https://')) {
      const client = resumeUrl.startsWith('https://') ? https : http;
      client.get(resumeUrl, (stream) => {
        if (stream.statusCode && stream.statusCode >= 300 && stream.statusCode < 400 && stream.headers.location) {
          const redirectClient = stream.headers.location.startsWith('https://') ? https : http;
          redirectClient.get(stream.headers.location, (redirectStream) => {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="Aiswarya_Bulusu_Resume.pdf"');
            redirectStream.pipe(res);
          });
        } else {
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename="Aiswarya_Bulusu_Resume.pdf"');
          stream.pipe(res);
        }
      }).on('error', (err) => {
        console.error('Error streaming remote resume:', err);
        if (!res.headersSent) {
          res.status(500).json({ message: 'Failed to stream resume file.' });
        }
      });
    } else {
      const uploadsDir = path.join(process.cwd(), 'uploads');
      const filename = path.basename(resumeUrl);
      const filePath = path.join(uploadsDir, filename);

      if (fs.existsSync(filePath)) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="Aiswarya_Bulusu_Resume.pdf"');
        return fs.createReadStream(filePath).pipe(res);
      } else {
        return res.status(404).json({ message: 'Resume file not found.' });
      }
    }
  } catch (error) {
    console.error('Error downloading resume:', error);
    if (!res.headersSent) {
      return res.status(500).json({ message: 'Failed to download resume file.' });
    }
  }
};
