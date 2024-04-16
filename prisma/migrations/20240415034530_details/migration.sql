-- CreateTable
CREATE TABLE "Details" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "broadcaster_type" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "twitch_id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "offline_image_url" TEXT NOT NULL,
    "profile_image_url" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "view_count" INTEGER NOT NULL,

    CONSTRAINT "Details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Details_userId_key" ON "Details"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Details_email_key" ON "Details"("email");

-- AddForeignKey
ALTER TABLE "Details" ADD CONSTRAINT "Details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
