import { Post, PrismaClient } from "@prisma/client";
import { getPrismaClient } from "./prismaClient";

export const createPost = async (client: PrismaClient, title: string, content: string): Promise<Post> => {
  const post = await client.post.create({
    data: {
      title,
      content,
    },
  });

  return post;
};

createPost(getPrismaClient(), "Hello World", "This is my first post!");
