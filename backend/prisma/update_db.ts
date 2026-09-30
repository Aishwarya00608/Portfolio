import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Running safe PostgreSQL data update...');

  // 1. Update Mini ERP & CRM Live Demo URL
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

  // 2. Ensure AI Climate Risk Platform liveUrl is empty
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

  // 3. Upsert AI Category Skills
  const aiSkills = [
    { name: 'RAG', category: 'AI', icon: 'Brain', proficiency: 90, displayOrder: 1 },
    { name: 'Prompt Engineering', category: 'AI', icon: 'Sparkles', proficiency: 95, displayOrder: 2 },
    { name: 'LLM', category: 'AI', icon: 'Cpu', proficiency: 90, displayOrder: 3 },
    { name: 'Generative AI', category: 'AI', icon: 'Zap', proficiency: 92, displayOrder: 4 },
  ];

  for (const skill of aiSkills) {
    const existing = await prisma.skill.findFirst({
      where: { name: skill.name, category: 'AI' },
    });
    if (existing) {
      await prisma.skill.update({
        where: { id: existing.id },
        data: { proficiency: skill.proficiency, published: true },
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
  console.log('✅ AI skills upserted (RAG, Prompt Engineering, LLM, Generative AI)');

  console.log('🎉 Database update completed safely!');
}

main()
  .catch((e) => {
    console.error('❌ Error during update:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
