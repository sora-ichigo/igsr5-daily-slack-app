import { App } from "@slack/bolt";
import { MODAL_OPEN, SEND_MESSAGE } from "./trigger_id";

export const registerMessages = (app: App) => {
  app.message(SEND_MESSAGE, async ({ message, say }) => {
    if (message.subtype !== undefined && message.subtype !== "bot_message") return;

    const today = new Date();
    await say({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `${today.getMonth() + 1}月${today.getDate()}日の日報を書こう <@${message.user}>`,
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "はい",
            },
            action_id: MODAL_OPEN,
          },
        },
      ],
    });
  });
};
