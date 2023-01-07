const channnelIdForDevelopment = "C04E1FHHGD7"; // #igsr5-task-planning
const channnelIdForProduction = "C02DWUVPWNT"; // #zt-ichigo
type ChannelId = "C04E1FHHGD7" | "C02DWUVPWNT";

export const getTargetChannnelId = (): ChannelId => {
  return process.env.NODE_ENV !== "production" ? channnelIdForDevelopment : channnelIdForProduction;
};

export const getSlackWebhookUrl = (): string => {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) {
    throw new Error("SLACK_WEBHOOK_URL is not set");
  }
  return url;
};

export const isAdmin = (userId: string): boolean => {
  return userId === process.env.SLACK_ADMIN_USER_ID;
};
