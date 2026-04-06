const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log("Testing connection...");
  
  // Create a minimal dummy record (with try/catch)
  try {
    const session = await prisma.session.create({
      data: {
        start_time: new Date(),
        emotional_state: "TESTING"
      }
    });
    console.log("Successfully created session:", session.id);
    
    // Read the session
    const sessions = await prisma.session.findMany();
    console.log(`Found ${sessions.length} total sessions in DB.`);
    
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
