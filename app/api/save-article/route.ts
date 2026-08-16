import { extractUrlData } from "@/app/actions/articles/extract-url-data";
import { saveArticle } from "@/app/actions/articles/save-article";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

function jsonWithCors(
  body: unknown,
  init?: { status?: number },
) {
  return NextResponse.json(body, {
    status: init?.status ?? 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return jsonWithCors(
        {
          success: false,
          error: "ユーザーが認証されていません",
        },
        { status: 401 },
      );
    }

    const body = await request.json();

    const { url } = body;

    //サイトデータの取得と保存
    const formData = new FormData();
    formData.append("url", url);
    const articleData = await extractUrlData(formData);

    if (!articleData) {
      throw new Error("サイトデータの取得に失敗しました。");
    }
    //データの保存
    const result = await saveArticle(articleData, session?.user.id);

    if (!result.success) {
      return jsonWithCors(
        {
          success: false,
          error: result.errorMessage,
        },
        { status: 400 },
      );
    }

    return jsonWithCors({
      success: true,
      message: "データを受け取りました。",
    });
  } catch (error) {
    console.error(error);
    return jsonWithCors(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "不明なエラーが発生しました。",
      },
      { status: 500 },
    );
  }
}

//CORSの設定
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
