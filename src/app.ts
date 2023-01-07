import { App, LogLevel } from "@slack/bolt";
import { registerActions } from "./action";
import { registerMessages } from "./message";
import { registerMiddlewares } from "./middleware";
import { newReceiver } from "./server/receiver";
import { registerViews } from "./view";

export const newBoltApp = () => {
  const app: App = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    logLevel: LogLevel.DEBUG,
    socketMode: false,
    receiver: newReceiver(),
    customRoutes: [
      {
        path: "/health-check",
        method: ["GET"],
        handler: (req, res) => {
          res.writeHead(200);
          res.end("Health check information displayed here!");
        },
      },
    ],
  });

  registerMiddlewares(app);
  registerMessages(app);
  registerActions(app);
  registerViews(app);

  return app;
};
