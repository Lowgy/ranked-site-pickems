/*
  Warnings:

  - You are about to drop the column `broadcaster_type` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `display_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `login` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `offline_image_url` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `profile_image_url` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `twitch_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `view_count` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "broadcaster_type",
DROP COLUMN "created_at",
DROP COLUMN "description",
DROP COLUMN "display_name",
DROP COLUMN "login",
DROP COLUMN "offline_image_url",
DROP COLUMN "profile_image_url",
DROP COLUMN "twitch_id",
DROP COLUMN "type",
DROP COLUMN "view_count";
