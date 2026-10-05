import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Running safe PostgreSQL data update...');

  // 1. Update Profile & Admin Emails
  const profile = await prisma.profile.findFirst();
  if (profile) {
    await prisma.profile.update({
      where: { id: profile.id },
      data: { email: 'aishwaryabulusu2006@gmail.com' },
    });
    console.log('✅ Profile email updated to aishwaryabulusu2006@gmail.com');
  }

  const admin = await prisma.adminUser.findFirst();
  if (admin) {
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { email: 'aishwaryabulusu2006@gmail.com' },
    });
    console.log('✅ Admin user email updated to aishwaryabulusu2006@gmail.com');
  }

  const emailSocial = await prisma.socialLink.findFirst({
    where: { platform: { equals: 'Email', mode: 'insensitive' } },
  });
  if (emailSocial) {
    await prisma.socialLink.update({
      where: { id: emailSocial.id },
      data: { url: 'mailto:aishwaryabulusu2006@gmail.com' },
    });
    console.log('✅ Email social link updated to mailto:aishwaryabulusu2006@gmail.com');
  }

  // 2. Update Mini ERP & CRM Live Demo URL
  const miniErp = await prisma.project.findFirst({
    where: { slug: 'mini-erp-crm-operations-portal' },
  });
  if (miniErp) {
    await prisma.project.update({
      where: { id: miniErp.id },
      data: { liveUrl: 'https://mini-erp-gilt.vercel.app/login' },
    });
    console.log('✅ Mini ERP & CRM liveUrl updated to https://mini-erp-gilt.vercel.app/login');
  }

  // 3. Ensure AI Climate Risk Platform liveUrl is empty
  const climateAi = await prisma.project.findFirst({
    where: { slug: 'ai-based-climate-risk-platform' },
  });
  if (climateAi) {
    await prisma.project.update({
      where: { id: climateAi.id },
      data: { liveUrl: '' },
    });
    console.log('✅ AI Climate Risk Platform liveUrl cleared (no Live Demo button)');
  }

  // 4. Upsert Expanded AI Category Skills
  const aiSkills = [
    { name: 'RAG', category: 'Artificial Intelligence', icon: 'Brain', proficiency: 90, displayOrder: 1 },
    { name: 'Prompt Engineering', category: 'Artificial Intelligence', icon: 'Sparkles', proficiency: 95, displayOrder: 2 },
    { name: 'Large Language Models (LLMs)', category: 'Artificial Intelligence', icon: 'Cpu', proficiency: 90, displayOrder: 3 },
    { name: 'Generative AI', category: 'Artificial Intelligence', icon: 'Zap', proficiency: 92, displayOrder: 4 },
    { name: 'Embeddings', category: 'Artificial Intelligence', icon: 'Layers', proficiency: 88, displayOrder: 5 },
    { name: 'AI Agents', category: 'Artificial Intelligence', icon: 'Bot', proficiency: 87, displayOrder: 6 },
    { name: 'Vector Databases', category: 'Artificial Intelligence', icon: 'Database', proficiency: 89, displayOrder: 7 },
  ];

  for (const skill of aiSkills) {
    const existing = await prisma.skill.findFirst({
      where: { name: skill.name },
    });
    if (existing) {
      await prisma.skill.update({
        where: { id: existing.id },
        data: { category: 'Artificial Intelligence', proficiency: skill.proficiency, published: true },
      });
    } else {
      await prisma.skill.create({
        data: {
          ...skill,
          published: true,
        },
      });
    }
  }
  console.log('✅ AI skills upserted (RAG, Prompt Engineering, LLMs, Generative AI, Embeddings, AI Agents, Vector Databases)');

  console.log('🎉 Safe database update script execution completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during update:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
