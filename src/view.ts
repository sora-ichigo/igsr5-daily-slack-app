import { App } from "@slack/bolt";
import { getPrismaClient } from ".";
import { createPost } from "./post";
import { SUBMIT_DAILY_REPORT } from "./trigger_id";
import { getTargetChannnelId } from "./utils";

export const registerViews = (app: App) => {
  app.view(SUBMIT_DAILY_REPORT, async ({ ack, body, client, logger }) => {
    await ack();

    const values = body.view.state.values;
    const title = values.title.text.value;
    const content = values.content.text.value;

    const post = await createPost(getPrismaClient(), title!, content!);

    try {
      await client.chat.postMessage({
        channel: getTargetChannnelId(),
        text: `Nice publish 🚀
This report can be viewed at https://example.com/posts/${post.id}
\`\`\`
# ${post.title}

---
${post.content}
\`\`\``,
        mrkdwn: true,
      });
    } catch (error) {
      logger.error(error);
    }
  });
};
