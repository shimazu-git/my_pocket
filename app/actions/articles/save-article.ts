"use server";
import prisma from "@/lib/prisma";
import { checkUrlExists } from "./checkUrlExists";
import { revalidatePath } from "next/cache";

type ArticleDataProps = {
  title: string;
  siteName: string;
  description: string;
  siteUpdatedAt: string;
  thumbnail: string;
  url: string;
  content: string;
};
export async function saveArticle(
  articleData: ArticleDataProps,
  userId: string,
) {
  try {
    const isDuplicate = await checkUrlExists(articleData.url);
    if (isDuplicate) {
      return {
        errorMessage: "このURLの記事はすでに保存されています。",
        success: false,
      };
    }

    await prisma.article.create({
      data: {
        userId: userId,
        title: articleData.title,
        siteName: articleData.siteName,
        description: articleData.description,
        siteUpdatedAt: articleData.siteUpdatedAt,
        thumbnail: articleData.thumbnail,
        url: articleData.url,
        content: articleData.content,
      },
    });

    revalidatePath("/");

    return {
      errorMessage: undefined,
      success: true,
    };
  } catch (error) {
    console.error(error);

    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return {
        errorMessage: "このURLの記事はすでに保存されています。",
        success: false,
      };
    }

    return {
      errorMessage: "記事の保存に失敗しました。",
      success: false,
    };
  }
}
