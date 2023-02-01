import { AnyMiddlewareArgs, App, Middleware } from "@slack/bolt";
import { isAdmin } from "./utils";

export const registerMiddlewares = (app: App) => {
  // NOTE: middleware is executed in the order of registration

  // must be registered first
  app.use(errorReport); // 1. error report
  app.use(authorization); // 2. authorization
};

const authorization: Middleware<AnyMiddlewareArgs> = async ({ next, body }) => {
  const userId: string = getUserId(body);
  if (!isAdmin(userId)) {
    console.info("failed authorization");
    return;
  }

  await next();
};

const errorReport: Middleware<AnyMiddlewareArgs> = async ({ next, client, body }) => {
  try {
    await next();
  } catch (e) {
    client.chat.postMessage({
      channel: process.env.SLACK_ADMIN_USER_ID!,
      text: `Error: ${e.message}`,
    });
  }
};

const getUserId = (body: any) => {
  switch (body.type) {
    case "block_actions" || "view_submission":
      return body.user.id;
    case "view_submission":
      return body.user.id;
    case "event_callback":
      return (body.event as any).user;
    default:
      throw new Error("not supported event type");
  }
};
