-- DropIndex
DROP INDEX "articles_url_key";

-- CreateIndex
CREATE UNIQUE INDEX "articles_userId_url_key" ON "articles"("userId", "url");
