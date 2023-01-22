import { Post, PrismaClient } from "@prisma/client";

type CreatePostInput = {
  title: string;
  subtitle: string;
  content: string;
};
export const createPost = async (client: PrismaClient, input: CreatePostInput): Promise<Post> => {
  const post = await client.post.create({
    data: {
      title: input.title,
      subtitle: input.subtitle,
      content: input.content,
    },
  });

  return post;
};
