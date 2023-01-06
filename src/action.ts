import { App } from "@slack/bolt";

export const registerActions = (app: App) => {
  app.action("modal_open", async ({ body, ack, logger, client }) => {
    await ack();

    const today = new Date();
    try {
      const result = await client.views.open({
        trigger_id: (body as any).trigger_id,
        view: {
          type: "modal",
          callback_id: "daily_report",
          title: {
            type: "plain_text",
            text: "igsr5's daily report",
          },
          blocks: [
            {
              type: "input",
              block_id: "title",
              label: {
                type: "plain_text",
                text: "タイトル",
              },
              element: {
                type: "plain_text_input",
                action_id: "text",
                initial_value: `${today.getMonth() + 1}月${today.getDate()}日の日報`,
              },
            },
            {
              type: "input",
              block_id: "content",
              label: {
                type: "plain_text",
                text: "今日1日の振り返りを書きましょう",
              },
              element: {
                type: "plain_text_input",
                action_id: "text",
                multiline: true,
              },
            },
          ],
          submit: {
            type: "plain_text",
            text: "Submit",
          },
        },
      });
      logger.info(result);
    } catch (error) {
      logger.error(error);
    }
  });
};
