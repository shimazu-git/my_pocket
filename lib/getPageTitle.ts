export const getPageTitle = (listtype: string) => {
  switch (listtype) {
    case "all":
      return "すべての記事";
    case "favorite":
      return "お気に入りの記事";
    case "archived":
      return "アーカイブの記事";
    default:
      return "ホーム";
  }
};
