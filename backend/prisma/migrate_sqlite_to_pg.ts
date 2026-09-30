import Database from 'better-sqlite3';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function parseBool(val: any): boolean {
  if (typeof val === 'boolean') return val;
  if (typeof val === 'number') return val === 1;
  if (typeof val === 'string') return val === '1' || val.toLowerCase() === 'true';
  return false;
}

function parseDate(val: any): Date {
  if (!val) return new Date();
  if (typeof val === 'number') return new Date(val);
  return new Date(val);
}

async function migrate() {
  console.log('🚀 Starting SQLite -> PostgreSQL Data Migration...\n');

  const dbPath = path.join(__dirname, 'dev.db');
  const sqlite = new Database(dbPath);

  // 1. Migrate AdminUser
  const adminUsers = sqlite.prepare('SELECT * FROM "AdminUser"').all() as any[];
  console.log(`📦 Found ${adminUsers.length} AdminUser record(s) in SQLite.`);
  for (const user of adminUsers) {
    await prisma.adminUser.upsert({
      where: { id: user.id },
      update: {
        email: user.email,
        passwordHash: user.passwordHash,
        name: user.name,
        updatedAt: parseDate(user.updatedAt),
      },
      create: {
        id: user.id,
        email: user.email,
        passwordHash: user.passwordHash,
        name: user.name,
        createdAt: parseDate(user.createdAt),
        updatedAt: parseDate(user.updatedAt),
      },
    });
  }
  console.log(`✅ AdminUser migrated successfully.`);

  // 2. Migrate Profile
  const profiles = sqlite.prepare('SELECT * FROM "Profile"').all() as any[];
  console.log(`📦 Found ${profiles.length} Profile record(s) in SQLite.`);
  for (const prof of profiles) {
    await prisma.profile.upsert({
      where: { id: prof.id },
      update: {
        fullName: prof.fullName,
        headline: prof.headline,
        shortBio: prof.shortBio,
        longBio: prof.longBio,
        email: prof.email,
        phone: prof.phone,
        location: prof.location,
        profileImage: prof.profileImage,
        resumeUrl: prof.resumeUrl,
        githubUrl: prof.githubUrl,
        linkedinUrl: prof.linkedinUrl,
        portfolioUrl: prof.portfolioUrl,
        updatedAt: parseDate(prof.updatedAt),
      },
      create: {
        id: prof.id,
        fullName: prof.fullName,
        headline: prof.headline,
        shortBio: prof.shortBio,
        longBio: prof.longBio,
        email: prof.email,
        phone: prof.phone,
        location: prof.location,
        profileImage: prof.profileImage,
        resumeUrl: prof.resumeUrl,
        githubUrl: prof.githubUrl,
        linkedinUrl: prof.linkedinUrl,
        portfolioUrl: prof.portfolioUrl,
        createdAt: parseDate(prof.createdAt),
        updatedAt: parseDate(prof.updatedAt),
      },
    });
  }
  console.log(`✅ Profile migrated successfully.`);

  // 3. Migrate Project
  const projects = sqlite.prepare('SELECT * FROM "Project"').all() as any[];
  console.log(`📦 Found ${projects.length} Project record(s) in SQLite.`);
  for (const p of projects) {
    await prisma.project.upsert({
      where: { id: p.id },
      update: {
        title: p.title,
        slug: p.slug,
        category: p.category,
        shortDescription: p.shortDescription,
        description: p.description,
        problem: p.problem,
        solution: p.solution,
        features: p.features,
        architecture: p.architecture,
        imageUrl: p.imageUrl,
        githubUrl: p.githubUrl,
        liveUrl: p.liveUrl,
        startDate: p.startDate,
        endDate: p.endDate,
        featured: parseBool(p.featured),
        published: parseBool(p.published),
        displayOrder: Number(p.displayOrder || 0),
        technologies: p.technologies,
        updatedAt: parseDate(p.updatedAt),
      },
      create: {
        id: p.id,
        title: p.title,
        slug: p.slug,
        category: p.category,
        shortDescription: p.shortDescription,
        description: p.description,
        problem: p.problem,
        solution: p.solution,
        features: p.features,
        architecture: p.architecture,
        imageUrl: p.imageUrl,
        githubUrl: p.githubUrl,
        liveUrl: p.liveUrl,
        startDate: p.startDate,
        endDate: p.endDate,
        featured: parseBool(p.featured),
        published: parseBool(p.published),
        displayOrder: Number(p.displayOrder || 0),
        technologies: p.technologies,
        createdAt: parseDate(p.createdAt),
        updatedAt: parseDate(p.updatedAt),
      },
    });
  }
  console.log(`✅ Projects migrated successfully.`);

  // 4. Migrate Skill
  const skills = sqlite.prepare('SELECT * FROM "Skill"').all() as any[];
  console.log(`📦 Found ${skills.length} Skill record(s) in SQLite.`);
  for (const s of skills) {
    await prisma.skill.upsert({
      where: { id: s.id },
      update: {
        name: s.name,
        category: s.category,
        icon: s.icon,
        proficiency: Number(s.proficiency || 85),
        displayOrder: Number(s.displayOrder || 0),
        published: parseBool(s.published),
        updatedAt: parseDate(s.updatedAt),
      },
      create: {
        id: s.id,
        name: s.name,
        category: s.category,
        icon: s.icon,
        proficiency: Number(s.proficiency || 85),
        displayOrder: Number(s.displayOrder || 0),
        published: parseBool(s.published),
        createdAt: parseDate(s.createdAt),
        updatedAt: parseDate(s.updatedAt),
      },
    });
  }
  console.log(`✅ Skills migrated successfully.`);

  // 5. Migrate Internship
  const internships = sqlite.prepare('SELECT * FROM "Internship"').all() as any[];
  console.log(`📦 Found ${internships.length} Internship record(s) in SQLite.`);
  for (const i of internships) {
    await prisma.internship.upsert({
      where: { id: i.id },
      update: {
        company: i.company,
        role: i.role,
        description: i.description,
        startDate: i.startDate,
        endDate: i.endDate,
        status: i.status || 'Completed',
        location: i.location,
        technologies: i.technologies,
        responsibilities: i.responsibilities,
        achievements: i.achievements,
        certificateUrl: i.certificateUrl,
        companyUrl: i.companyUrl,
        featured: parseBool(i.featured),
        published: parseBool(i.published),
        displayOrder: Number(i.displayOrder || 0),
        updatedAt: parseDate(i.updatedAt),
      },
      create: {
        id: i.id,
        company: i.company,
        role: i.role,
        description: i.description,
        startDate: i.startDate,
        endDate: i.endDate,
        status: i.status || 'Completed',
        location: i.location,
        technologies: i.technologies,
        responsibilities: i.responsibilities,
        achievements: i.achievements,
        certificateUrl: i.certificateUrl,
        companyUrl: i.companyUrl,
        featured: parseBool(i.featured),
        published: parseBool(i.published),
        displayOrder: Number(i.displayOrder || 0),
        createdAt: parseDate(i.createdAt),
        updatedAt: parseDate(i.updatedAt),
      },
    });
  }
  console.log(`✅ Internships migrated successfully.`);

  // 6. Migrate Certification
  const certs = sqlite.prepare('SELECT * FROM "Certification"').all() as any[];
  console.log(`📦 Found ${certs.length} Certification record(s) in SQLite.`);
  for (const c of certs) {
    await prisma.certification.upsert({
      where: { id: c.id },
      update: {
        name: c.name,
        organization: c.organization,
        issueDate: c.issueDate,
        credentialId: c.credentialId,
        credentialUrl: c.credentialUrl,
        certificateUrl: c.certificateUrl,
        description: c.description,
        category: c.category || 'AI / ML',
        featured: parseBool(c.featured),
        published: parseBool(c.published),
        displayOrder: Number(c.displayOrder || 0),
        updatedAt: parseDate(c.updatedAt),
      },
      create: {
        id: c.id,
        name: c.name,
        organization: c.organization,
        issueDate: c.issueDate,
        credentialId: c.credentialId,
        credentialUrl: c.credentialUrl,
        certificateUrl: c.certificateUrl,
        description: c.description,
        category: c.category || 'AI / ML',
        featured: parseBool(c.featured),
        published: parseBool(c.published),
        displayOrder: Number(c.displayOrder || 0),
        createdAt: parseDate(c.createdAt),
        updatedAt: parseDate(c.updatedAt),
      },
    });
  }
  console.log(`✅ Certifications migrated successfully.`);

  // 7. Migrate Education
  const eduList = sqlite.prepare('SELECT * FROM "Education"').all() as any[];
  console.log(`📦 Found ${eduList.length} Education record(s) in SQLite.`);
  for (const e of eduList) {
    await prisma.education.upsert({
      where: { id: e.id },
      update: {
        institution: e.institution,
        degree: e.degree,
        field: e.field,
        startDate: e.startDate,
        endDate: e.endDate,
        grade: e.grade,
        description: e.description,
        displayOrder: Number(e.displayOrder || 0),
        published: parseBool(e.published),
        updatedAt: parseDate(e.updatedAt),
      },
      create: {
        id: e.id,
        institution: e.institution,
        degree: e.degree,
        field: e.field,
        startDate: e.startDate,
        endDate: e.endDate,
        grade: e.grade,
        description: e.description,
        displayOrder: Number(e.displayOrder || 0),
        published: parseBool(e.published),
        createdAt: parseDate(e.createdAt),
        updatedAt: parseDate(e.updatedAt),
      },
    });
  }
  console.log(`✅ Education migrated successfully.`);

  // 8. Migrate Achievement
  const achievements = sqlite.prepare('SELECT * FROM "Achievement"').all() as any[];
  console.log(`📦 Found ${achievements.length} Achievement record(s) in SQLite.`);
  for (const a of achievements) {
    await prisma.achievement.upsert({
      where: { id: a.id },
      update: {
        title: a.title,
        organization: a.organization,
        date: a.date,
        description: a.description,
        certificateUrl: a.certificateUrl,
        category: a.category,
        featured: parseBool(a.featured),
        published: parseBool(a.published),
        displayOrder: Number(a.displayOrder || 0),
        updatedAt: parseDate(a.updatedAt),
      },
      create: {
        id: a.id,
        title: a.title,
        organization: a.organization,
        date: a.date,
        description: a.description,
        certificateUrl: a.certificateUrl,
        category: a.category,
        featured: parseBool(a.featured),
        published: parseBool(a.published),
        displayOrder: Number(a.displayOrder || 0),
        createdAt: parseDate(a.createdAt),
        updatedAt: parseDate(a.updatedAt),
      },
    });
  }
  console.log(`✅ Achievements migrated successfully.`);

  // 9. Migrate Hackathon
  const hackathons = sqlite.prepare('SELECT * FROM "Hackathon"').all() as any[];
  console.log(`📦 Found ${hackathons.length} Hackathon record(s) in SQLite.`);
  for (const h of hackathons) {
    await prisma.hackathon.upsert({
      where: { id: h.id },
      update: {
        name: h.name,
        organizer: h.organizer,
        date: h.date,
        role: h.role,
        projectName: h.projectName,
        description: h.description,
        result: h.result,
        projectUrl: h.projectUrl,
        displayOrder: Number(h.displayOrder || 0),
        published: parseBool(h.published),
        updatedAt: parseDate(h.updatedAt),
      },
      create: {
        id: h.id,
        name: h.name,
        organizer: h.organizer,
        date: h.date,
        role: h.role,
        projectName: h.projectName,
        description: h.description,
        result: h.result,
        projectUrl: h.projectUrl,
        displayOrder: Number(h.displayOrder || 0),
        published: parseBool(h.published),
        createdAt: parseDate(h.createdAt),
        updatedAt: parseDate(h.updatedAt),
      },
    });
  }
  console.log(`✅ Hackathons migrated successfully.`);

  // 10. Migrate SocialLink
  const socialLinks = sqlite.prepare('SELECT * FROM "SocialLink"').all() as any[];
  console.log(`📦 Found ${socialLinks.length} SocialLink record(s) in SQLite.`);
  for (const s of socialLinks) {
    await prisma.socialLink.upsert({
      where: { id: s.id },
      update: {
        platform: s.platform,
        url: s.url,
        icon: s.icon,
        displayOrder: Number(s.displayOrder || 0),
        published: parseBool(s.published),
        updatedAt: parseDate(s.updatedAt),
      },
      create: {
        id: s.id,
        platform: s.platform,
        url: s.url,
        icon: s.icon,
        displayOrder: Number(s.displayOrder || 0),
        published: parseBool(s.published),
        createdAt: parseDate(s.createdAt),
        updatedAt: parseDate(s.updatedAt),
      },
    });
  }
  console.log(`✅ SocialLinks migrated successfully.`);

  // 11. Migrate ContactMessage (if any exist)
  const messages = sqlite.prepare('SELECT * FROM "ContactMessage"').all() as any[];
  console.log(`📦 Found ${messages.length} ContactMessage record(s) in SQLite.`);
  for (const m of messages) {
    await prisma.contactMessage.upsert({
      where: { id: m.id },
      update: {
        name: m.name,
        email: m.email,
        subject: m.subject,
        message: m.message,
        read: parseBool(m.read),
      },
      create: {
        id: m.id,
        name: m.name,
        email: m.email,
        subject: m.subject,
        message: m.message,
        read: parseBool(m.read),
        createdAt: parseDate(m.createdAt),
      },
    });
  }
  console.log(`✅ ContactMessages migrated successfully.`);

  sqlite.close();
  console.log('\n🎉 ALL LOCAL PORTFOLIO RECORDS MIGRATED SUCCESSFULLY TO POSTGRESQL!');
}

migrate()
  .catch((e) => {
    console.error('❌ Error during data migration:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
