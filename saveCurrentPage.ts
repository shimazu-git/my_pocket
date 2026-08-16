async function saveCurrentPage(tab) {
  try {
    showStatus("記事を保存中...", "loading");
    // Webアプリのドメインからクッキーを取得
    const cookies = await chrome.cookies.getAll({
      url: API_BASE_URL,
    });
    // セッションクッキーを文字列に変換
    const cookieString = cookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");
    // 既存のAPIエンドポイントに送信（セッション認証）
    const response = await fetch(`${API_BASE_URL}/api/save-article`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieString,
      },
      credentials: "include",
      body: JSON.stringify({
        url: tab.url,
        title: tab.title,
      }),
    });
    const result = await response.json();
    if (response.ok && result.success) {
      showStatus("保存しました！", "success");
      // 3秒後にポップアップを閉じる
      setTimeout(() => {
        window.close();
      }, 3000);
    } else {
      // 認証エラーの場合
      if (response.status === 401) {
        showLoginRequired();
      } else {
        throw new Error(result.error || "保存に失敗しました");
      }
    }
  } catch (error) {
    console.error("保存エラー:", error);
    showStatus(error.message || "保存に失敗しました", "error");
  }
}
