-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "blog_api_user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "blog_api_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_api_post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "blog_api_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_api_comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "blog_api_comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blog_api_user_email_key" ON "blog_api_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "blog_api_user_username_key" ON "blog_api_user"("username");

-- AddForeignKey
ALTER TABLE "blog_api_post" ADD CONSTRAINT "blog_api_post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "blog_api_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_api_comment" ADD CONSTRAINT "blog_api_comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "blog_api_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_api_comment" ADD CONSTRAINT "blog_api_comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "blog_api_post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
