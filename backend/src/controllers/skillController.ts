import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getSkills = async (req: Request, res: Response) => {
  try {
    const { category, all } = req.query;
    const where: any = {};

    if (all !== 'true') {
      where.published = true;
    }

    if (category) {
      where.category = String(category);
    }

    const list = await prisma.skill.findMany({
      where,
      orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
    });

    return res.json(list);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return res.status(500).json({ message: 'Error retrieving skills.' });
  }
};

export const createSkill = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (typeof data.proficiency === 'string') {
      data.proficiency = parseInt(data.proficiency, 10);
    }
    const item = await prisma.skill.create({ data });
    return res.status(201).json(item);
  } catch (error) {
    console.error('Error creating skill:', error);
    return res.status(500).json({ message: 'Error creating skill.' });
  }
};

export const updateSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    delete data.id;

    if (typeof data.proficiency === 'string') {
      data.proficiency = parseInt(data.proficiency, 10);
    }

    const item = await prisma.skill.update({
      where: { id },
      data,
    });
    return res.json(item);
  } catch (error) {
    console.error('Error updating skill:', error);
    return res.status(500).json({ message: 'Error updating skill.' });
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.skill.delete({ where: { id } });
    return res.json({ message: 'Skill deleted successfully.' });
  } catch (error) {
    console.error('Error deleting skill:', error);
    return res.status(500).json({ message: 'Error deleting skill.' });
  }
};
