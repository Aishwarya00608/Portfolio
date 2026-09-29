import { Request, Response } from 'express';
import prisma from '../lib/prisma';

const formatProject = (project: any) => {
  let parsedFeatures = [];
  let parsedTechnologies = [];

  try {
    parsedFeatures = typeof project.features === 'string'
      ? (project.features.startsWith('[') ? JSON.parse(project.features) : project.features.split(',').map((s: string) => s.trim()))
      : (project.features || []);
  } catch (e) {
    parsedFeatures = project.features ? [project.features] : [];
  }

  try {
    parsedTechnologies = typeof project.technologies === 'string'
      ? (project.technologies.startsWith('[') ? JSON.parse(project.technologies) : project.technologies.split(',').map((s: string) => s.trim()))
      : (project.technologies || []);
  } catch (e) {
    parsedTechnologies = project.technologies ? [project.technologies] : [];
  }

  return {
    ...project,
    featuresList: parsedFeatures,
    technologiesList: parsedTechnologies,
  };
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const { category, featured, all } = req.query;

    const where: any = {};
    if (all !== 'true') {
      where.published = true;
    }
    if (category) {
      where.category = String(category);
    }
    if (featured === 'true') {
      where.featured = true;
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });

    return res.json(projects.map(formatProject));
  } catch (error) {
    console.error('Error getting projects:', error);
    return res.status(500).json({ message: 'Error retrieving projects.' });
  }
};

export const getProjectBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const project = await prisma.project.findUnique({
      where: { slug },
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    return res.json(formatProject(project));
  } catch (error) {
    console.error('Error getting project by slug:', error);
    return res.status(500).json({ message: 'Error retrieving project details.' });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body };

    if (Array.isArray(data.features)) {
      data.features = JSON.stringify(data.features);
    }
    if (Array.isArray(data.technologies)) {
      data.technologies = JSON.stringify(data.technologies);
    }

    if (!data.slug) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const project = await prisma.project.create({
      data,
    });

    return res.status(201).json(formatProject(project));
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({ message: 'Error creating project.' });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    if (Array.isArray(data.features)) {
      data.features = JSON.stringify(data.features);
    }
    if (Array.isArray(data.technologies)) {
      data.technologies = JSON.stringify(data.technologies);
    }

    delete data.id;

    const project = await prisma.project.update({
      where: { id },
      data,
    });

    return res.json(formatProject(project));
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({ message: 'Error updating project.' });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({
      where: { id },
    });
    return res.json({ message: 'Project deleted successfully.' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({ message: 'Error deleting project.' });
  }
};
