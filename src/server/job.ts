import axios from "axios";
import { IRouter } from "express";
import { MODAL_OPEN } from "../trigger_id";
import { getSlackWebhookUrl } from "../utils";

/*
 * この関数は、毎日18時に日報を促すメッセージを送信する
 * 定期実行の仕組み自体は CloudScheduler で行っている
 */
export const postPromptDailyReport = async (router: IRouter) => {
  router.post("/prompt_daily_report", (req, res) => {
    const today = new Date();
    axios.post(
      getSlackWebhookUrl(),
      {
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `${today.getMonth() + 1}月${today.getDate()}日の日報を書こう <@${process.env.SLACK_ADMIN_USER_ID}>`,
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
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200);
  });
};
