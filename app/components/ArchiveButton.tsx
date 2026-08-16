import { toggleArchive } from "../actions/articles/toggle-archive";
import { Article } from "../generated/prisma/client";
import { FaArchive } from "react-icons/fa";

export default function ArchiveButton({
  articleData,
}: {
  articleData: Article;
}) {
  const handleToggleArchive = async () => {
    try {
      await toggleArchive(articleData.isArchived, articleData.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form action={handleToggleArchive}>
      <button type="submit" className="cursor-pointer">
        {articleData.isArchived ? (
          <FaArchive className="text-red-500" />
        ) : (
          <FaArchive />
        )}
      </button>
    </form>
  );
}
