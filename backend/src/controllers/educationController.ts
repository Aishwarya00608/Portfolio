import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getEducation = async (req: Request, res: Response) => {
  try {
    const { all } = req.query;
    const where: any = {};
    if (all !== 'true') {
      where.published = true;
    }

    const list = await prisma.education.findMany({
      where,
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });

    return res.json(list);
  } catch (error) {
    console.error('Error fetching education:', error);
    return res.status(500).json({ message: 'Error retrieving education details.' });
  }
};

export const createEducation = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const item = await prisma.education.create({ data });
    return res.status(201).json(item);
  } catch (error) {
    console.error('Error creating education:', error);
    return res.status(500).json({ message: 'Error creating education record.' });
  }
};

export const updateEducation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    delete data.id;

    const item = await prisma.education.update({
      where: { id },
      data,
    });
    return res.json(item);
  } catch (error) {
    console.error('Error updating education:', error);
    return res.status(500).json({ message: 'Error updating education record.' });
  }
};

export const deleteEducation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.education.delete({ where: { id } });
    return res.json({ message: 'Education record deleted successfully.' });
  } catch (error) {
    console.error('Error deleting education:', error);
    return res.status(500).json({ message: 'Error deleting education record.' });
  }
};
