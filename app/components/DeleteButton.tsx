import { FaRegTrashCan } from "react-icons/fa6";
import { Article } from "../generated/prisma/client";
import { deleteArticle } from "../actions/articles/delete-article";
export default function DeleteButton({
  articleData,
}: {
  articleData: Article;
}) {
  const handleDelete = async () => {
    try {
      await deleteArticle(articleData.id);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      action={handleDelete}
      onSubmit={(e) => {
        if (!confirm("削除しますか？")) {
          e.preventDefault();
        }
      }}
    >
      <button type="submit" className="cursor-pointer">
        <FaRegTrashCan />
      </button>
    </form>
  );
}
