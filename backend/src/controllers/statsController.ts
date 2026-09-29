import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getStats = async (_req: Request, res: Response) => {
  try {
    const [projectsCount, certsCount, internshipsCount, skillsCount, achievementsCount, hackathonsCount, totalMessages, unreadMessages] = await Promise.all([
      prisma.project.count({ where: { published: true } }),
      prisma.certification.count({ where: { published: true } }),
      prisma.internship.count({ where: { published: true } }),
      prisma.skill.count({ where: { published: true } }),
      prisma.achievement.count({ where: { published: true } }),
      prisma.hackathon.count({ where: { published: true } }),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { read: false } }),
    ]);

    return res.json({
      projects: projectsCount,
      certifications: certsCount,
      internships: internshipsCount,
      skills: skillsCount,
      achievements: achievementsCount,
      hackathons: hackathonsCount,
      messages: totalMessages,
      unreadMessages,
    });
  } catch (error) {
    console.error('Error calculating portfolio statistics:', error);
    return res.status(500).json({ message: 'Error retrieving statistics.' });
  }
};
