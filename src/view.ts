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
    const subtitle = values.subtitle.text.value;
    const content = values.content.text.value;

    const post = await createPost(getPrismaClient(), { title: title!, subtitle: subtitle!, content: content! });

    try {
      await client.chat.postMessage({
        channel: getTargetChannnelId(),
        text: `report published🚀
you can view this report at https://example.com/posts/${post.id}
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
