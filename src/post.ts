import { Post, PrismaClient } from "@prisma/client";

export const createPost = async (client: PrismaClient, title: string, content: string): Promise<Post> => {
  const post = await client.post.create({
    data: {
      title,
      content,
    },
  });

  return post;
};
