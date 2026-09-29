import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAchievements = async (req: Request, res: Response) => {
  try {
    const { all } = req.query;
    const where: any = {};
    if (all !== 'true') {
      where.published = true;
    }

    const list = await prisma.achievement.findMany({
      where,
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });

    return res.json(list);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return res.status(500).json({ message: 'Error retrieving achievements.' });
  }
};

export const createAchievement = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const item = await prisma.achievement.create({ data });
    return res.status(201).json(item);
  } catch (error) {
    console.error('Error creating achievement:', error);
    return res.status(500).json({ message: 'Error creating achievement.' });
  }
};

export const updateAchievement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    delete data.id;

    const item = await prisma.achievement.update({
      where: { id },
      data,
    });
    return res.json(item);
  } catch (error) {
    console.error('Error updating achievement:', error);
    return res.status(500).json({ message: 'Error updating achievement.' });
  }
};

export const deleteAchievement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.achievement.delete({ where: { id } });
    return res.json({ message: 'Achievement deleted successfully.' });
  } catch (error) {
    console.error('Error deleting achievement:', error);
    return res.status(500).json({ message: 'Error deleting achievement.' });
  }
};
