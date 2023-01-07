import { PrismaClient } from "@prisma/client";
import { newApp } from "./app";

const prismaClient = new PrismaClient();
const app = newApp();

console.log("port: ", process.env.PORT);
console.log("tz: ", process.env.TZ);
console.log("node_env: ", process.env.NODE_ENV);
console.log("slack_bot_token: ", process.env.SLACK_BOT_TOKEN);
console.log("slack_signing_secret: ", process.env.SLACK_SIGNING_SECRET);
console.log("slack_admin_user_id: ", process.env.SLACK_ADMIN_USER_ID);
console.log("database_url: ", process.env.DATABASE_URL);

(async () => {
  await app.start(Number(process.env.PORT) || 3000);
  console.log("⚡️ Bolt app is running!");
})();

export const getPrismaClient = () => {
  return prismaClient;
};
