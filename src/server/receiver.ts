import { ExpressReceiver } from "@slack/bolt";

export const newReceiver = () => {
  const receiver = new ExpressReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET as string,
  });
  receiver.router.get("/hoge", (req, res) => {
    // You're working with an express req and res now.
    res.json({ msg: "yay!" });
  });

  return receiver;
};
