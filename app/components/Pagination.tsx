import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  listtype?: string;
  keyword?: string;
}

function Pagination({
  currentPage,
  totalPages,
  listtype,
  keyword,
}: PaginationProps) {
  // URLパラメータを組み立てる関数
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();

    // listtypeがある場合は追加
    if (listtype && listtype !== "default") {
      params.set("listtype", listtype);
    }

    // keywordがある場合は追加
    if (keyword) {
      params.set("keyword", keyword);
    }

    // 1ページ目以外はpage番号を追加
    if (page > 1) {
      params.set("page", page.toString());
    }

    // パラメータがある場合は?を付ける、ない場合は/のみ
    return params.toString() ? `/?${params.toString()}` : "/";
  };

  // 表示するページ番号の範囲を計算
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // 最大表示ページ数

    if (totalPages <= maxVisible) {
      // 総ページ数が少ない場合は全て表示
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 現在のページを中心に表示範囲を決定
      let start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisible - 1);

      // 終端が足りない場合は開始を調整
      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 py-8">
      {/* 前のページボタン */}
      {currentPage > 1 && (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
        >
          前
        </Link>
      )}

      {/* 最初のページ（省略記号がある場合） */}
      {pageNumbers[0] > 1 && (
        <>
          <Link
            href={createPageUrl(1)}
            className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
          >
            1
          </Link>
          {pageNumbers[0] > 2 && (
            <span className="px-2 text-gray-500">...</span>
          )}
        </>
      )}

      {/* ページ番号 */}
      {pageNumbers.map((page) => (
        <Link
          key={page}
          href={createPageUrl(page)}
          className={`px-3 py-2 border rounded transition-colors ${
            page === currentPage
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          {page}
        </Link>
      ))}

      {/* 最後のページ（省略記号がある場合） */}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="px-2 text-gray-500">...</span>
          )}
          <Link
            href={createPageUrl(totalPages)}
            className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* 次のページボタン */}
      {currentPage < totalPages && (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
        >
          次
        </Link>
      )}
    </div>
  );
}

export default Pagination;
