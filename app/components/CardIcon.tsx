"use client";

import { Article } from "../generated/prisma/client";

import LikeButton from "./LikeButton";
import ArchiveButton from "./ArchiveButton";
import DeleteButton from "./DeleteButton";

type CardIconsProps = {
  articleData: Article;
};
export default function CardIcon({ articleData }: CardIconsProps) {
  return (
    <div className="flex justify-start md:justify-between gap-5 items-center text-xl">
      {/* お気に入りボタン */}
      <LikeButton articleData={articleData} />

      {/* アーカイブボタン */}
      <ArchiveButton articleData={articleData} />

      {/* デリートボタン */}
      <DeleteButton articleData={articleData} />
    </div>
  );
}
