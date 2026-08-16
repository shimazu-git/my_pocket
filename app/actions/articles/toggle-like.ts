"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleLike(isLiked: boolean, articleId: string) {
  try {
    const reversedLiked = !isLiked;

    await prisma.article.update({
      where: { id: articleId },
      data: { isLiked: reversedLiked },
    });
    revalidatePath("/");
    const result = isLiked
      ? "お気に入りから削除しました"
      : "お気に入りに追加しました";
    console.log(result);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { errorMessage: "お気に入りの更新に失敗しました", success: false };
  }
}
