"use server";
import { getCurrentUserId } from "@/lib/getCurrentUserId";
import prisma from "@/lib/prisma";

export async function checkUrlExists(url: string) {
  const userId = await getCurrentUserId();

  const isExistsArticle = await prisma.article.findFirst({
    where: {
      url: url,
      userId: userId,
    },
  });

  return !!isExistsArticle;
}
