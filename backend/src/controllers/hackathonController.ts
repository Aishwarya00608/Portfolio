import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getHackathons = async (req: Request, res: Response) => {
  try {
    const { all } = req.query;
    const where: any = {};
    if (all !== 'true') {
      where.published = true;
    }

    const list = await prisma.hackathon.findMany({
      where,
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });

    return res.json(list);
  } catch (error) {
    console.error('Error fetching hackathons:', error);
    return res.status(500).json({ message: 'Error retrieving hackathons.' });
  }
};

export const createHackathon = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const item = await prisma.hackathon.create({ data });
    return res.status(201).json(item);
  } catch (error) {
    console.error('Error creating hackathon:', error);
    return res.status(500).json({ message: 'Error creating hackathon record.' });
  }
};

export const updateHackathon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    delete data.id;

    const item = await prisma.hackathon.update({
      where: { id },
      data,
    });
    return res.json(item);
  } catch (error) {
    console.error('Error updating hackathon:', error);
    return res.status(500).json({ message: 'Error updating hackathon record.' });
  }
};

export const deleteHackathon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.hackathon.delete({ where: { id } });
    return res.json({ message: 'Hackathon record deleted successfully.' });
  } catch (error) {
    console.error('Error deleting hackathon:', error);
    return res.status(500).json({ message: 'Error deleting hackathon record.' });
  }
};
