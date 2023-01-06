import { App } from "@slack/bolt";
import { getTargetChannnelId } from "./utils";

export const registerViews = (app: App) => {
  app.view("daily_report", async ({ ack, body, client, logger }) => {
    await ack();

    const values = body.view.state.values;
    const title = values.title.text.value;
    const content = values.content.text.value;

    try {
      await client.chat.postMessage({
        channel: getTargetChannnelId(),
        text: `Nice publish 🚀
This report can be viewed at https://example.com
\`\`\`
# ${title}

---
${content}
\`\`\``,
        mrkdwn: true,
      });
    } catch (error) {
      logger.error(error);
    }
  });
};
