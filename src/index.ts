import { PrismaClient } from "@prisma/client";
import { newApp } from "./app";

const prismaClient = new PrismaClient();
const app = newApp();

(async () => {
  await app.start(Number(process.env.PORT) || 3000);
  console.log("⚡️ Bolt app is running!");
})();

export const getPrismaClient = () => {
  return prismaClient;
};
