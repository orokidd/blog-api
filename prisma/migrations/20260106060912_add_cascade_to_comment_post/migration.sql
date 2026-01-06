-- DropForeignKey
ALTER TABLE "blog_api_comment" DROP CONSTRAINT "blog_api_comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "blog_api_comment" DROP CONSTRAINT "blog_api_comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "blog_api_post" DROP CONSTRAINT "blog_api_post_authorId_fkey";

-- AddForeignKey
ALTER TABLE "blog_api_post" ADD CONSTRAINT "blog_api_post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "blog_api_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_api_comment" ADD CONSTRAINT "blog_api_comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "blog_api_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_api_comment" ADD CONSTRAINT "blog_api_comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "blog_api_post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
