import { getWhereCondition } from "@/lib/getWhereCondition";
import { getArticles } from "../actions/articles/get-articles";
import ArticleCard from "./ArticleCard";
import { getPageTitle } from "@/lib/getPageTitle";
import { getSearchWhereCondition } from "@/lib/getSearchWhereCondition";
import { getCurrentUserId } from "@/lib/getCurrentUserId";
import Pagination from "./Pagination"; // 🆕 Paginationコンポーネント
interface ArticleListsProps {
  params: {
    listtype?: string;
    keyword?: string;
    page?: string; // 🆕 ページ番号を追加
  };
}
async function ArticleLists({ params }: ArticleListsProps) {
  const listtype = params.listtype || "default";
  const keyword = params.keyword;
  const page = parseInt(params.page || "1"); // 🆕 ページ番号取得
  const limit = 10; // 🆕 1ページあたりの件数
  const offset = (page - 1) * limit; // 🆕 オフセット計算
  let pageTitle;
  let whereCondition;
  const userId = await getCurrentUserId();
  if (keyword) {
    // 検索処理
    pageTitle = `検索結果:${keyword}`;
    whereCondition = getSearchWhereCondition(keyword, userId!);
  } else {
    // フィルター(ページタイトル)
    pageTitle = getPageTitle(listtype);
    whereCondition = getWhereCondition(listtype, userId!);
  }
  // 🆕 記事取得（ページネーション対応）
  const result = await getArticles(whereCondition, {
    offset,
    limit,
    includeTotalCount: true,
  });
  if (!result) {
    return (
      <div className="w-full lg:w-4/5 px-4">データを取得できませんでした</div>
    );
  }
  const { articles, totalCount } = result;
  const totalPages = totalCount ? Math.ceil(totalCount / limit) : 0; // 🆕 総ページ数計算
  return (
    <div className="w-full lg:w-4/5 px-4">
      {/* タイトル */}
      <div className="flex justify-between mb-4">
        <h2 className="text-4xl font-bold">{pageTitle}</h2>
      </div>
      <hr />
      <div className="p-4 flex flex-col gap-4">
        {articles.map((articleData) => (
          <ArticleCard key={articleData.id} articleData={articleData} />
        ))}
      </div>
      {/* 🆕 ページネーション（2ページ以上ある場合のみ表示） */}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          listtype={listtype}
          keyword={keyword}
        />
      )}
    </div>
  );
}
export default ArticleLists;
