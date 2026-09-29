import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    const contact = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject: subject || 'Portfolio Contact Message',
        message,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. ✦',
      contact,
    });
  } catch (error) {
    console.error('Error handling contact message:', error);
    return res.status(500).json({ message: 'Failed to submit message. Please try again later.' });
  }
};

export const getContactMessages = async (_req: Request, res: Response) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json(messages);
  } catch (error) {
    console.error('Error getting contact messages:', error);
    return res.status(500).json({ message: 'Error retrieving contact messages.' });
  }
};

export const markMessageRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { read } = req.body;

    const message = await prisma.contactMessage.update({
      where: { id },
      data: { read: read !== undefined ? Boolean(read) : true },
    });

    return res.json(message);
  } catch (error) {
    console.error('Error marking message read:', error);
    return res.status(500).json({ message: 'Error updating message status.' });
  }
};

export const deleteContactMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.contactMessage.delete({ where: { id } });
    return res.json({ message: 'Message deleted successfully.' });
  } catch (error) {
    console.error('Error deleting contact message:', error);
    return res.status(500).json({ message: 'Error deleting message.' });
  }
};
