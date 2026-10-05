import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Seed Admin User
  const existingAdmin = await prisma.adminUser.findFirst();
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('Sylus*123', 10);
    await prisma.adminUser.create({
      data: {
        email: 'aishwaryabulusu2006@gmail.com',
        passwordHash,
        name: 'Bulusu Vyaghri Aiswarya',
      },
    });
    console.log('✅ Admin user seeded (aishwaryabulusu2006@gmail.com)');
  } else {
    const passwordHash = await bcrypt.hash('Sylus*123', 10);
    await prisma.adminUser.update({
      where: { id: existingAdmin.id },
      data: {
        email: 'aishwaryabulusu2006@gmail.com',
        passwordHash,
        name: 'Bulusu Vyaghri Aiswarya',
      },
    });
    console.log('✅ Admin user updated (aishwaryabulusu2006@gmail.com)');
  }

  // 2. Seed Profile
  await prisma.profile.deleteMany();
  await prisma.profile.create({
    data: {
      fullName: 'Bulusu Vyaghri Aiswarya',
      headline: 'Computer Science Engineer | Data Science & AI/ML Enthusiast',
      shortBio: '4th-year B.Tech Computer Science and Engineering student passionate about Data Science, AI/ML, Computer Vision, Data Analytics, Full-Stack Engineering, and Cyber Security.',
      longBio: 'I am a dedicated 4th-year Computer Science Engineering student specializing in intelligent systems, machine learning pipelines, and modern web application development. My analytical mindset drives me to build computer vision fatigue monitors, role-based enterprise portals, and AI climate risk prediction systems. I thrive at the intersection of data-driven insights and elegant full-stack solutions.',
      email: 'aishwaryabulusu2006@gmail.com',
      phone: '+91 98765 43210',
      location: 'Hyderabad, Telangana, India',
      profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
      resumeUrl: 'https://aishwarya00608.github.io/resume.pdf',
      githubUrl: 'https://github.com/Aishwarya00608',
      linkedinUrl: 'https://linkedin.com/in/aishwarya-bulusu',
      portfolioUrl: 'https://aishwarya-portfolio.vercel.app',
    },
  });
  console.log('✅ Profile seeded');

  // 3. Seed Projects
  await prisma.project.deleteMany();

  await prisma.project.create({
    data: {
      title: 'Driver Drowsiness Monitoring System',
      slug: 'driver-drowsiness-monitoring-system',
      category: 'Computer Vision / Machine Learning',
      shortDescription: 'A real-time hybrid driver drowsiness monitoring system combining computer vision, deep learning, and facial landmark analysis to detect driver fatigue.',
      description: 'A multi-indicator safety platform engineered to reduce fatigue-related vehicular accidents. The application streams real-time video, performs face detection via OpenCV and Dlib, tracks 68 facial landmarks, computes PERCLOS metrics, measures Mouth Aspect Ratio (MAR) for yawn frequency, and estimates 3D head pitch/roll via cv2.solvePnP. When fatigue exceeds safety thresholds, pyttsx3 audio alarms and visual alerts are instantly triggered.',
      problem: 'Driver fatigue causes thousands of preventable accidents annually. Monolithic detection systems (such as eye-blink count alone) yield high false alarm rates due to erratic lighting, eye glass reflections, or head rotation.',
      solution: 'A multi-sensory algorithm combining CNN eye state classification, PERCLOS metric analysis, Dlib 68-point facial landmark mouth ratio tracking, and head pose orientation via cv2.solvePnP to generate a reliable weighted fatigue index.',
      features: JSON.stringify([
        'Real-time drowsiness detection pipeline',
        'Ocular analysis with CNN eye classification',
        'PERCLOS-based (Percentage of Eye Closure) fatigue metric',
        'Yawn detection via Mouth Aspect Ratio (MAR)',
        'Facial landmark tracking (Dlib 68-point model)',
        '3D Head pose estimation using cv2.solvePnP (pitch & roll)',
        'Multi-signal weighted fatigue scoring engine',
        'Instant audio notifications using pyttsx3',
        'Low-latency video processing frame loop'
      ]),
      architecture: 'Camera Input Stream → OpenCV Frame Preprocessing → Dlib 68-Point Landmark Model → EAR & MAR Spatial Math → CNN Ocular Classifier → PERCLOS Aggregator + solvePnP Head Pose Analyzer → Weighted Fatigue Risk Engine → pyttsx3 Audio Alert & UI Overlay',
      imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop',
      githubUrl: 'https://github.com/Aishwarya00608/Driver-Drowsiness-Monitoring-System.git',
      liveUrl: '',
      startDate: 'Jan 2024',
      endDate: 'Apr 2024',
      featured: true,
      published: true,
      displayOrder: 1,
      technologies: JSON.stringify(['Python', 'OpenCV', 'TensorFlow', 'Dlib', 'NumPy', 'pyttsx3']),
    },
  });

  await prisma.project.create({
    data: {
      title: 'Mini ERP & CRM Operations Portal',
      slug: 'mini-erp-crm-operations-portal',
      category: 'Full-Stack Web Application',
      shortDescription: 'A role-based ERP and CRM operations portal designed to centralize business operations through a high-performance web application.',
      description: 'An enterprise-grade web application created to unify internal business resource planning (ERP) and customer relationship management (CRM). Built with React, TypeScript, Express, and PostgreSQL with Prisma ORM, it features secure JWT authentication, granular role-based permissions (Admin, Manager, Staff), interactive sales pipelines, inventory management, and containerized Docker deployments.',
      problem: 'Growing enterprises face fragmented operational data across disconnected tools, lack of role-restricted data visibility, and manual bottlenecks in lead tracking and inventory management.',
      solution: 'A integrated full-stack portal offering role-tailored dashboards, automated CRM lead stages, real-time inventory ledger updates, RESTful APIs, and secure PostgreSQL persistence.',
      features: JSON.stringify([
        'JWT Authentication & bcrypt password encryption',
        'Role-Based Access Control (RBAC) with tailored UI views',
        'Centralized ERP operations & inventory ledger tracking',
        'CRM lead management pipeline & customer interaction log',
        'Real-time analytical dashboard charts & summary metrics',
        'RESTful API architecture built with Express.js & TypeScript',
        'Type-safe database ORM operations with Prisma & PostgreSQL',
        'Docker container deployment ready for Vercel and Render'
      ]),
      architecture: 'React + Vite + TypeScript Frontend → Axios API Client Layer → Node.js + Express.js Web Server → Prisma ORM Database Client → PostgreSQL Relational Database (Containerized with Docker & Deployed on Render/Vercel)',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
      githubUrl: 'https://github.com/Aishwarya00608/Mini-ERP-CRM-Operations-Portal',
      liveUrl: 'https://mini-erp-gilt.vercel.app/login',
      startDate: 'May 2024',
      endDate: 'Jul 2024',
      featured: true,
      published: true,
      displayOrder: 2,
      technologies: JSON.stringify(['React', 'Vite', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'Docker', 'Render', 'Vercel']),
    },
  });

  await prisma.project.create({
    data: {
      title: 'AI-Based Climate Risk Platform',
      slug: 'ai-based-climate-risk-platform',
      category: 'Artificial Intelligence / Machine Learning / Climate Technology',
      shortDescription: 'An AI-powered climate intelligence platform that analyzes weather patterns, forecasts climate-related risks, and provides location-specific insights.',
      description: 'A dual-interface machine learning system delivering location-aware climate advisories. The platform processes OpenWeather and NASA POWER data, applying Time-Series LSTM neural networks for multi-day temperature forecasting and Random Forest classifiers for precipitation and severe weather risk categorization. Designed with specialized "Farmer Mode" for agricultural advisories and "City Mode" for urban flash flood/heatwave alerts.',
      problem: 'Climate instability and rapid weather extremes threaten crop yields and urban infrastructure, yet generic weather apps fail to provide context-specific safety and agricultural guidance.',
      solution: 'An AI-driven climate platform combining LSTM time-series deep learning with Random Forest risk models to output actionable recommendations catered to agricultural needs and municipal safety.',
      features: JSON.stringify([
        'Time-Series LSTM deep learning for temperature trend prediction',
        'Random Forest classifiers for rainfall & extreme weather risk',
        'Farmer Mode: Crop advisory engine, sowing tips & irrigation alerts',
        'City Mode: Urban flood alerts, heatwave warnings & safety guidance',
        'OpenWeather API & NASA POWER satellite dataset pipelines',
        'Interactive geospatial climate risk visualization map',
        'Historical climate pattern analysis & trend charting'
      ]),
      architecture: 'OpenWeather API & NASA POWER Datasets → Data Cleaning & Normalization Pipeline → LSTM Deep Learning Forecaster + Random Forest Classifier → Django / MySQL Backend → Farmer & City Dual Dashboard',
      imageUrl: 'https://images.unsplash.com/photo-1590055531615-f16d36ffe8ec?q=80&w=800&auto=format&fit=crop',
      githubUrl: 'https://github.com/Aishwarya00608/AI-Climate-Risk-Platform',
      liveUrl: 'https://climate-ai-risk.vercel.app',
      startDate: 'Aug 2024',
      endDate: 'Nov 2024',
      featured: true,
      published: true,
      displayOrder: 3,
      technologies: JSON.stringify(['Django', 'MySQL', 'LSTM', 'Random Forest', 'OpenWeather API', 'NASA POWER API', 'IMD Datasets', 'Python']),
    },
  });
  console.log('✅ Projects seeded');

  // 4. Seed Internships
  await prisma.internship.deleteMany();

  await prisma.internship.create({
    data: {
      company: 'FlyRank AI',
      role: 'AI / Machine Learning Intern',
      startDate: 'July 2026',
      endDate: 'September 2026', // STRICT: Completed July 2026 - September 2026
      status: 'Completed',
      location: 'Remote',
      description: 'An applied machine learning internship focused on real-world search engine data, natural language processing, and analytics pipelines.',
      technologies: JSON.stringify(['Python', 'Embeddings', 'Clustering', 'Intent Classification', 'Opportunity Scoring', 'Pandas', 'Scikit-learn']),
      responsibilities: 'Analyzed high-volume search dataset patterns, developed clustering models for search intent classification, created opportunity scoring algorithms, built data analytics reports and actionable client insights.',
      achievements: 'Engineered a reproducible machine learning / data analytics capstone involving analysis, insights, recommendations, and presentation-ready findings.',
      companyUrl: 'https://aishwarya00608.github.io/FlyRank_Assignment/',
      certificateUrl: 'https://aishwarya00608.github.io/FlyRank_Assignment/',
      featured: true,
      published: true,
      displayOrder: 1,
    },
  });

  await prisma.internship.create({
    data: {
      company: 'IBM SkillsBuild',
      role: 'AI / Generative AI Intern',
      startDate: '2024',
      endDate: '2024',
      status: 'Completed',
      location: 'Remote',
      description: 'Applied AI and Generative AI internship focused on developing enterprise AI conversational assistants using IBM watsonx.ai platforms.',
      technologies: JSON.stringify(['IBM watsonx.ai', 'IBM Bob', 'Generative AI', 'Prompt Engineering', 'Python', 'Chatbots']),
      responsibilities: 'Designed conversational intents, constructed prompt templates, trained domain-specific knowledge models, and evaluated chatbot accuracy.',
      achievements: 'Developed and launched NutriBot — AI Health Assistant Chatbot providing personalized nutrition analysis and health advice.',
      companyUrl: '',
      certificateUrl: '',
      featured: true,
      published: true,
      displayOrder: 2,
    },
  });
  console.log('✅ Internships seeded');

  // 5. Seed Certifications
  await prisma.certification.deleteMany();

  const certs = [
    {
      name: 'Google Fundamentals of Digital Marketing',
      organization: 'Google / Coursera',
      category: 'Business',
      description: 'Mastered digital branding, SEO analytics, search advertising, and web audience growth strategies.',
      displayOrder: 1,
    },
    {
      name: 'Power BI Data Modeling',
      organization: 'Simplilearn',
      category: 'Data',
      description: 'Advanced data modeling, DAX expressions, ETL pipelines, and interactive dashboard analytics.',
      displayOrder: 2,
    },
    {
      name: 'LinkedIn Content and Creative Design',
      organization: 'LinkedIn Learning',
      category: 'Development',
      description: 'Visual communication, brand storytelling, and strategic content design principles.',
      displayOrder: 3,
    },
    {
      name: 'TCS iON Career Edge – Young Professional',
      organization: 'TCS iON',
      category: 'Development',
      description: 'Comprehensive professional training covering business communication, agile fundamentals, and corporate readiness.',
      displayOrder: 4,
    },
    {
      name: 'AI Fundamentals Workshop',
      organization: 'Magic Bus Foundation',
      category: 'AI / ML',
      description: 'Practical introduction to machine learning concepts, neural network basics, and ethical AI deployment.',
      displayOrder: 5,
    },
    {
      name: 'Cisco Python Certification',
      organization: 'Cisco Networking Academy',
      category: 'Programming',
      description: 'Core and advanced Python programming, data structures, object-oriented design, and algorithms.',
      displayOrder: 6,
    },
    {
      name: 'ThinkQbator — Developing IoT Applications',
      organization: 'ThinkQbator',
      category: 'Development',
      description: 'Hands-on IoT hardware integration, sensor microcontrollers, MQTT protocols, and cloud monitoring.',
      displayOrder: 7,
    },
    {
      name: 'ThinkQbator — PCB Architecture and Design',
      organization: 'ThinkQbator',
      category: 'Development',
      description: 'Printed circuit board layout design, schematic capture, component routing, and hardware prototyping.',
      displayOrder: 8,
    },
    {
      name: 'IBM SkillsBuild AI & Generative AI',
      organization: 'IBM',
      category: 'AI / ML',
      description: 'Enterprise Generative AI, IBM watsonx.ai prompt engineering, LLM fine-tuning, and chatbot development.',
      displayOrder: 9,
    },
    {
      name: 'Anthropic Prompt Engineering & AI Fundamentals',
      organization: 'Anthropic',
      category: 'AI / ML',
      description: 'System prompt optimization, Claude AI API integration, multi-turn reasoning, and safety guardrails.',
      displayOrder: 10,
    },
    {
      name: 'Pursuit Future Technologies Internship Certificate',
      organization: 'Pursuit Future Technologies',
      category: 'AI / ML',
      description: 'Verified internship certificate in applied technology development and engineering solutions.',
      displayOrder: 11,
    },
  ];

  for (const cert of certs) {
    await prisma.certification.create({
      data: {
        ...cert,
        featured: true,
        published: true,
      },
    });
  }
  console.log('✅ Certifications seeded');

  // 6. Seed Skills
  await prisma.skill.deleteMany();

  const skillsData = [
    // AI
    { name: 'RAG', category: 'AI', icon: 'Brain', proficiency: 90, displayOrder: 1 },
    { name: 'Prompt Engineering', category: 'AI', icon: 'Sparkles', proficiency: 95, displayOrder: 2 },
    { name: 'LLM', category: 'AI', icon: 'Cpu', proficiency: 90, displayOrder: 3 },
    { name: 'Generative AI', category: 'AI', icon: 'Zap', proficiency: 92, displayOrder: 4 },

    // Programming
    { name: 'Python', category: 'Programming', icon: 'Code', proficiency: 95, displayOrder: 1 },
    { name: 'C++', category: 'Programming', icon: 'Code2', proficiency: 85, displayOrder: 2 },
    { name: 'Java', category: 'Programming', icon: 'FileCode', proficiency: 80, displayOrder: 3 },
    { name: 'SQL', category: 'Programming', icon: 'Database', proficiency: 90, displayOrder: 4 },

    // Data Science
    { name: 'NumPy', category: 'Data Science', icon: 'Binary', proficiency: 90, displayOrder: 5 },
    { name: 'Pandas', category: 'Data Science', icon: 'Table', proficiency: 92, displayOrder: 6 },
    { name: 'Scikit-learn', category: 'Data Science', icon: 'Cpu', proficiency: 88, displayOrder: 7 },
    { name: 'Power BI', category: 'Data Science', icon: 'BarChart2', proficiency: 85, displayOrder: 8 },
    { name: 'Excel', category: 'Data Science', icon: 'Sheet', proficiency: 88, displayOrder: 9 },

    // Machine Learning
    { name: 'TensorFlow', category: 'Machine Learning', icon: 'Brain', proficiency: 88, displayOrder: 10 },
    { name: 'LSTM Networks', category: 'Machine Learning', icon: 'GitBranch', proficiency: 85, displayOrder: 11 },
    { name: 'Random Forest', category: 'Machine Learning', icon: 'Trees', proficiency: 90, displayOrder: 12 },
    { name: 'SMOTE', category: 'Machine Learning', icon: 'Sliders', proficiency: 85, displayOrder: 13 },

    // Computer Vision
    { name: 'OpenCV', category: 'Computer Vision', icon: 'Camera', proficiency: 90, displayOrder: 14 },
    { name: 'Dlib', category: 'Computer Vision', icon: 'ScanFace', proficiency: 88, displayOrder: 15 },
    { name: 'OCR', category: 'Computer Vision', icon: 'Eye', proficiency: 82, displayOrder: 16 },
    { name: 'Tesseract', category: 'Computer Vision', icon: 'FileText', proficiency: 80, displayOrder: 17 },

    // Web Development
    { name: 'React', category: 'Web Development', icon: 'Atom', proficiency: 90, displayOrder: 18 },
    { name: 'Node.js', category: 'Web Development', icon: 'Server', proficiency: 88, displayOrder: 19 },
    { name: 'Express.js', category: 'Web Development', icon: 'Zap', proficiency: 88, displayOrder: 20 },
    { name: 'Flask', category: 'Web Development', icon: 'Flame', proficiency: 85, displayOrder: 21 },
    { name: 'FastAPI', category: 'Web Development', icon: 'Rocket', proficiency: 82, displayOrder: 22 },
    { name: 'JavaScript / TS', category: 'Web Development', icon: 'FileCode2', proficiency: 90, displayOrder: 23 },
    { name: 'HTML & CSS', category: 'Web Development', icon: 'Layout', proficiency: 95, displayOrder: 24 },

    // Databases
    { name: 'MySQL', category: 'Databases', icon: 'Database', proficiency: 88, displayOrder: 25 },
    { name: 'PostgreSQL', category: 'Databases', icon: 'Database', proficiency: 88, displayOrder: 26 },

    // DevOps / Tools
    { name: 'Git & GitHub', category: 'DevOps / Tools', icon: 'GitFork', proficiency: 92, displayOrder: 27 },
    { name: 'Docker', category: 'DevOps / Tools', icon: 'Box', proficiency: 80, displayOrder: 28 },
    { name: 'YAML', category: 'DevOps / Tools', icon: 'FileCheck', proficiency: 85, displayOrder: 29 },
  ];

  for (const skill of skillsData) {
    await prisma.skill.create({
      data: {
        ...skill,
        published: true,
      },
    });
  }
  console.log('✅ Skills seeded');

  // 7. Seed Education
  await prisma.education.deleteMany();

  await prisma.education.create({
    data: {
      institution: 'JNTUH Affiliated College',
      degree: 'B.Tech in Computer Science and Engineering',
      field: 'Computer Science and Engineering',
      startDate: '2023',
      endDate: '2027',
      grade: '8.7 CGPA',
      description: 'Specializing in Machine Learning, Computer Vision, Data Science, and Software Engineering. Active member of technical clubs and innovation mela committees.',
      displayOrder: 1,
      published: true,
    },
  });

  await prisma.education.create({
    data: {
      institution: 'Delhi Public School',
      degree: 'Class XII (Senior Secondary)',
      field: 'Science (MPC)',
      startDate: '2022',
      endDate: '2023',
      grade: '85%',
      description: 'Completed senior secondary education with focus on Mathematics, Physics, and Chemistry.',
      displayOrder: 2,
      published: true,
    },
  });
  console.log('✅ Education seeded');

  // 8. Seed Achievements
  await prisma.achievement.deleteMany();

  const achievementsData = [
    {
      title: 'GirlScript Summer of Code (GSSoC) Contributor',
      organization: 'GirlScript Foundation',
      date: '2024',
      category: 'Open Source',
      description: 'Selected as an active open-source contributor for GSSoC, contributing code, bug fixes, and feature enhancements to AI and Web repositories.',
      displayOrder: 1,
    },
    {
      title: 'ThinkQbator Innovation Mela Organizing Committee',
      organization: 'ThinkQbator',
      date: '2024',
      category: 'Leadership',
      description: 'Served on the core organizing committee for the university-wide ThinkQbator Innovation Mela tech event.',
      displayOrder: 2,
    },
    {
      title: 'Official Emcee — ThinkQbator Innovation Mela',
      organization: 'ThinkQbator',
      date: '2024',
      category: 'Leadership',
      description: 'Hosted and anchored the flagship ThinkQbator Innovation Mela event, addressing 500+ participants and guests.',
      displayOrder: 3,
    },
    {
      title: 'Hackverse 1.0 Finalist',
      organization: 'Hackverse Community',
      date: '2026',
      category: 'Hackathon',
      description: 'Ranked in the top 10 teams out of 100+ submissions for building an innovative computer vision solution.',
      displayOrder: 4,
    },
    {
      title: 'CodeSprint Competitive Programming Distinction',
      organization: 'CodeSprint',
      date: '2026',
      category: 'Coding',
      description: 'Achieved top ranking in university-wide algorithmic coding and data structures competition.',
      displayOrder: 5,
    },
    {
      title: 'Smart India Hackathon (SIH) 2025 Participant',
      organization: 'Ministry of Education, Govt of India',
      date: '2025',
      category: 'Hackathon',
      description: 'Lead participant in the Smart India Hackathon internal round developing AI climate risk technology.',
      displayOrder: 6,
    },
  ];

  for (const ach of achievementsData) {
    await prisma.achievement.create({
      data: {
        ...ach,
        featured: true,
        published: true,
      },
    });
  }
  console.log('✅ Achievements seeded');

  // 9. Seed Hackathons
  await prisma.hackathon.deleteMany();

  const hackathonsData = [
    {
      name: 'Smart India Hackathon 2025',
      organizer: 'Ministry of Education, Govt of India',
      date: '2025',
      role: 'Team Lead & ML Developer',
      projectName: 'AI Climate Risk Platform',
      description: 'Engineered an AI-driven climate forecasting tool using time-series LSTM and random forest classifiers for agricultural safety.',
      result: 'Institutional Selection & Round 1 Winner',
      displayOrder: 1,
      published: true,
    },
    {
      name: 'Hackverse 1.0',
      organizer: 'Hackverse Org',
      date: '2026',
      role: 'Computer Vision Engineer',
      projectName: 'Driver Drowsiness Monitoring System',
      description: 'Built a 24-hour hackathon prototype combining Dlib 68-landmark tracking and PERCLOS scoring for real-time fatigue detection.',
      result: 'Top 10 Finalist',
      displayOrder: 2,
      published: true,
    },
    {
      name: 'CodeSprint 2026',
      organizer: 'CSE Department',
      date: '2026',
      role: 'Competitive Coder',
      projectName: 'Algorithmic Problem Solving',
      description: 'Solved complex dynamic programming, graph, and data structure challenges within time constraints.',
      result: 'High Distinction',
      displayOrder: 3,
      published: true,
    },
  ];

  for (const hack of hackathonsData) {
    await prisma.hackathon.create({
      data: hack,
    });
  }
  console.log('✅ Hackathons seeded');

  // 10. Seed Social Links
  await prisma.socialLink.deleteMany();

  const socialLinks = [
    { platform: 'GitHub', url: 'https://github.com/Aishwarya00608', icon: 'Github', displayOrder: 1, published: true },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/aishwarya-bulusu', icon: 'Linkedin', displayOrder: 2, published: true },
    { platform: 'Email', url: 'mailto:aishwaryabulusu2006@gmail.com', icon: 'Mail', displayOrder: 3, published: true },
  ];

  for (const social of socialLinks) {
    await prisma.socialLink.create({ data: social });
  }
  console.log('✅ Social links seeded');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
