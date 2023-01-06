import { PrismaClient } from "@prisma/client";

export const getPrismaClient = () => {
  const prismaClient = new PrismaClient();
  return prismaClient;
};
