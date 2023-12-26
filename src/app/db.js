const { PrismaClient } = require('@prisma/client');

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const globalForPrisma = globalThis; // No need for the type assertion in JavaScript

const prisma = globalForPrisma.prisma || prismaClientSingleton(); // Use the logical OR operator for the nullish coalescing

module.exports = prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;