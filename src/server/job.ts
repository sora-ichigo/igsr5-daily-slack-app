import axios from "axios";
import { IRouter } from "express";
import { getSlackWebhookUrl } from "../utils";

/*
 * この関数は、毎日18時に日報を促すメッセージを送信する
 * 定期実行の仕組み自体は CloudScheduler で行っている
 */
export const postPromptDailyReport = async (router: IRouter) => {
  router.post("/prompt_daily_report", (req, res) => {
    const today = new Date();
    axios.post<{ text: string }>(
      getSlackWebhookUrl(),
      {
        text: `${today.getMonth() + 1}月${today.getDate()}日の日報を書こう <@ichigo>`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.json({ msg: "yay!" });
  });
};
