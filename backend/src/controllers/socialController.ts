import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getSocialLinks = async (req: Request, res: Response) => {
  try {
    const { all } = req.query;
    const where: any = {};
    if (all !== 'true') {
      where.published = true;
    }

    const list = await prisma.socialLink.findMany({
      where,
      orderBy: [{ displayOrder: 'asc' }, { platform: 'asc' }],
    });

    return res.json(list);
  } catch (error) {
    console.error('Error fetching social links:', error);
    return res.status(500).json({ message: 'Error retrieving social links.' });
  }
};

export const createSocialLink = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const item = await prisma.socialLink.create({ data });
    return res.status(201).json(item);
  } catch (error) {
    console.error('Error creating social link:', error);
    return res.status(500).json({ message: 'Error creating social link.' });
  }
};

export const updateSocialLink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    delete data.id;

    const item = await prisma.socialLink.update({
      where: { id },
      data,
    });
    return res.json(item);
  } catch (error) {
    console.error('Error updating social link:', error);
    return res.status(500).json({ message: 'Error updating social link.' });
  }
};

export const deleteSocialLink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.socialLink.delete({ where: { id } });
    return res.json({ message: 'Social link deleted successfully.' });
  } catch (error) {
    console.error('Error deleting social link:', error);
    return res.status(500).json({ message: 'Error deleting social link.' });
  }
};
