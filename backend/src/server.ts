import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';
import projectRoutes from './routes/projectRoutes';
import internshipRoutes from './routes/internshipRoutes';
import certificationRoutes from './routes/certificationRoutes';
import skillRoutes from './routes/skillRoutes';
import educationRoutes from './routes/educationRoutes';
import achievementRoutes from './routes/achievementRoutes';
import hackathonRoutes from './routes/hackathonRoutes';
import socialRoutes from './routes/socialRoutes';
import contactRoutes from './routes/contactRoutes';
import statsRoutes from './routes/statsRoutes';
import uploadRoutes from './routes/uploadRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());

// Serve static uploaded files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/hackathons', hackathonRoutes);
app.use('/api/social-links', socialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/stats', statsRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), message: 'Aishwarya Portfolio API is running smoothly ✦' });
});

app.listen(PORT, () => {
  console.log(`✨ Backend server running on http://localhost:${PORT}`);
});
