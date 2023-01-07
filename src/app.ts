import { App, LogLevel } from "@slack/bolt";
import { registerActions } from "./action";
import { registerMessages } from "./message";
import { registerMiddlewares } from "./middleware";
import { registerViews } from "./view";

export const newApp = () => {
  const app: App = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    logLevel: LogLevel.DEBUG,
    socketMode: false,
  });

  registerMiddlewares(app);
  registerMessages(app);
  registerActions(app);
  registerViews(app);

  return app;
};
