import { Category, Post, PrismaClient } from "@prisma/client";

type CreatePostInput = {
  title: string;
  subtitle: string;
  content: string;
};
export const createPost = async (client: PrismaClient, input: CreatePostInput): Promise<Post> => {
  const publishedAt = new Date();

  const categoryName = calculateCategoryName(publishedAt);
  let category = await getCategoryByName(categoryName);
  if (!category) {
    category = await client.category.create({
      data: {
        name: categoryName,
      },
    });
  }

  const post = await client.post.create({
    data: {
      title: input.title,
      subtitle: input.subtitle,
      content: input.content,
      category_id: category.id,
      published_at: publishedAt,
    },
  });

  return post;
};

const calculateCategoryName = (publishedAt: Date) => {
  const year = publishedAt.getFullYear();
  const month = publishedAt.getMonth() + 1;
  return `reports of ${year}/${month}`;
};

const getCategoryByName = async (name: string): Promise<Category | null> => {
  const prisma = new PrismaClient();
  const category = await prisma.category.findUnique({
    where: {
      name,
    },
  });
  return category;
};
