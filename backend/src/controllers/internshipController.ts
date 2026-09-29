import { Request, Response } from 'express';
import prisma from '../lib/prisma';

const formatInternship = (item: any) => {
  let parsedTech = [];
  try {
    parsedTech = typeof item.technologies === 'string'
      ? (item.technologies.startsWith('[') ? JSON.parse(item.technologies) : item.technologies.split(',').map((s: string) => s.trim()))
      : (item.technologies || []);
  } catch (e) {
    parsedTech = item.technologies ? [item.technologies] : [];
  }

  return {
    ...item,
    technologiesList: parsedTech,
  };
};

export const getInternships = async (req: Request, res: Response) => {
  try {
    const { all } = req.query;
    const where: any = {};
    if (all !== 'true') {
      where.published = true;
    }

    const list = await prisma.internship.findMany({
      where,
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });

    return res.json(list.map(formatInternship));
  } catch (error) {
    console.error('Error fetching internships:', error);
    return res.status(500).json({ message: 'Error retrieving internships.' });
  }
};

export const createInternship = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body };
    if (Array.isArray(data.technologies)) {
      data.technologies = JSON.stringify(data.technologies);
    }
    const item = await prisma.internship.create({ data });
    return res.status(201).json(formatInternship(item));
  } catch (error) {
    console.error('Error creating internship:', error);
    return res.status(500).json({ message: 'Error creating internship record.' });
  }
};

export const updateInternship = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    if (Array.isArray(data.technologies)) {
      data.technologies = JSON.stringify(data.technologies);
    }
    delete data.id;

    const item = await prisma.internship.update({
      where: { id },
      data,
    });
    return res.json(formatInternship(item));
  } catch (error) {
    console.error('Error updating internship:', error);
    return res.status(500).json({ message: 'Error updating internship record.' });
  }
};

export const deleteInternship = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.internship.delete({ where: { id } });
    return res.json({ message: 'Internship record deleted successfully.' });
  } catch (error) {
    console.error('Error deleting internship:', error);
    return res.status(500).json({ message: 'Error deleting internship record.' });
  }
};
