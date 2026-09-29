import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getCertifications = async (req: Request, res: Response) => {
  try {
    const { category, all } = req.query;
    const where: any = {};

    if (all !== 'true') {
      where.published = true;
    }

    if (category && category !== 'All') {
      where.category = String(category);
    }

    const list = await prisma.certification.findMany({
      where,
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });

    return res.json(list);
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return res.status(500).json({ message: 'Error retrieving certifications.' });
  }
};

export const createCertification = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const item = await prisma.certification.create({ data });
    return res.status(201).json(item);
  } catch (error) {
    console.error('Error creating certification:', error);
    return res.status(500).json({ message: 'Error creating certification record.' });
  }
};

export const updateCertification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    delete data.id;

    const item = await prisma.certification.update({
      where: { id },
      data,
    });
    return res.json(item);
  } catch (error) {
    console.error('Error updating certification:', error);
    return res.status(500).json({ message: 'Error updating certification record.' });
  }
};

export const deleteCertification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.certification.delete({ where: { id } });
    return res.json({ message: 'Certification record deleted successfully.' });
  } catch (error) {
    console.error('Error deleting certification:', error);
    return res.status(500).json({ message: 'Error deleting certification record.' });
  }
};
