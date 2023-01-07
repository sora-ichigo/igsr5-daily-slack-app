import { ExpressReceiver } from "@slack/bolt";
import { postPromptDailyReport } from "./job";

export const newReceiver = () => {
  const receiver = new ExpressReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET as string,
  });

  postPromptDailyReport(receiver.router);

  return receiver;
};
