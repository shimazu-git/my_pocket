"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleArchive(isArchived: boolean, articleId: string) {
  try {
    const reversedArchived = !isArchived;

    await prisma.article.update({
      where: { id: articleId },
      data: { isArchived: reversedArchived },
    });
    revalidatePath("/");
    const result = isArchived
      ? "アーカイブから削除しました"
      : "アーカイブに追加しました";
    console.log(result);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { errorMessage: "アーカイブの更新に失敗しました", success: false };
  }
}
