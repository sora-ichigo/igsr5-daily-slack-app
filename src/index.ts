import { newApp } from "./app";

const app = newApp();

(async () => {
  await app.start(Number(process.env.PORT) || 3000);
  console.log("⚡️ Bolt app is running!");
})();
