import { Request, Response } from 'express';
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
