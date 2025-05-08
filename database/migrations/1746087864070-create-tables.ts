import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1746087864070 implements MigrationInterface {
  name = 'CreateTables1746087864070';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "wallet_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "nameVector" tsvector NOT NULL, "symbol" character varying NOT NULL, "logo" character varying NOT NULL, "ethereumAddress" character varying NOT NULL, "decimals" integer NOT NULL, "isNative" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_950a52a36b112b9c93d0fac2744" UNIQUE ("ethereumAddress"), CONSTRAINT "PK_16874556fca7c6d5e88fd1c4c3f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_wallet_token_is_native" ON "wallet_token" ("isNative") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_wallet_token_symbol" ON "wallet_token" ("symbol") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_wallet_token_logo" ON "wallet_token" ("logo") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_wallet_token_ethereum_address" ON "wallet_token" ("ethereumAddress") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_defaultdisplaynametype_enum" AS ENUM('NAME', 'USERNAME', 'WALLET_ADDRESS')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_postpolicy_enum" AS ENUM('ALL', 'FOLLOWER', 'FOLLOWING')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_mentionpolicy_enum" AS ENUM('ALL', 'FOLLOWER', 'FOLLOWING')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_replypolicy_enum" AS ENUM('ALL', 'FOLLOWER', 'FOLLOWING')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "phone" character varying NOT NULL, "email" character varying, "walletAddress" text NOT NULL, "countryCode" character varying NOT NULL, "fullName" character varying, "fullNameVector" tsvector, "username" text, "usernameVector" tsvector, "bio" character varying, "avatarSnapShot" jsonb, "telegram" character varying, "instagram" character varying, "twitter" character varying, "facebook" character varying, "tiktok" character varying, "website" character varying, "isBot" boolean NOT NULL DEFAULT false, "defaultDisplayNameType" "public"."users_defaultdisplaynametype_enum" NOT NULL DEFAULT 'WALLET_ADDRESS', "postPolicy" "public"."users_postpolicy_enum" NOT NULL DEFAULT 'ALL', "mentionPolicy" "public"."users_mentionpolicy_enum" NOT NULL DEFAULT 'ALL', "replyPolicy" "public"."users_replypolicy_enum" NOT NULL DEFAULT 'ALL', CONSTRAINT "UQ_fc71cd6fb73f95244b23e2ef113" UNIQUE ("walletAddress"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_mention_policy" ON "users" ("mentionPolicy") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_reply_policy" ON "users" ("replyPolicy") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_post_policy" ON "users" ("postPolicy") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_email" ON "users" ("email") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_country_code" ON "users" ("countryCode") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_phone" ON "users" ("phone") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_username" ON "users" ("username") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_wallet_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, "tokenId" uuid NOT NULL, CONSTRAINT "PK_fd2c849b1ce05467d56cd1b5a53" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "idx_user_wallet_token_user_id_token_id" ON "user_wallet_token" ("userId", "tokenId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "hashtag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" text NOT NULL, "nameVector" tsvector, CONSTRAINT "UQ_347fec870eafea7b26c8a73bac1" UNIQUE ("name"), CONSTRAINT "PK_cb36eb8af8412bfa978f1165d78" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_hashtag_name" ON "hashtag" ("name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "post_hashtag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" text NOT NULL, "userId" uuid NOT NULL, "postId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_05cb9053bd41f174f91053e0b0b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "idx_post_hashtag_tag_id_user_id_post_id" ON "post_hashtag" ("postId", "userId", "tagId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_post_hashtag_tag_id" ON "post_hashtag" ("tagId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "post_like" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "postId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_0e95caa8a8b56d7797569cf5dc6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_post_like_user_id_post_id" ON "post_like" ("userId", "postId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_post_like_post_id" ON "post_like" ("postId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_post_like_user_id" ON "post_like" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."post_media_mimetype_enum" AS ENUM('image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/x-matroska', 'video/quicktime', 'video/x-msvideo', 'audio/mpeg', 'audio/wav', 'audio/m4a')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."post_media_sourcetype_enum" AS ENUM('amazon_s3')`,
    );
    await queryRunner.query(
      `CREATE TABLE "post_media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "url" text NOT NULL, "fileName" text NOT NULL, "mimeType" "public"."post_media_mimetype_enum" NOT NULL, "sourceType" "public"."post_media_sourcetype_enum" NOT NULL, "postId" uuid, "userId" uuid NOT NULL, CONSTRAINT "PK_049edb1ce7ab3d2a98009b171d0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_post_media_post_id" ON "post_media" ("postId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_post_media_user_id" ON "post_media" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "post_mention" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "postId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_5431ef4da628c8e1c8c1b20749a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_post_mention_postId" ON "post_mention" ("postId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_post_mention_userId" ON "post_mention" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "content" text, "contentVector" tsvector, "likesCount" integer NOT NULL DEFAULT '0', "repostsCount" integer NOT NULL DEFAULT '0', "viewsCount" integer NOT NULL DEFAULT '0', "childrenCount" integer NOT NULL DEFAULT '0', "userId" uuid NOT NULL, "repostId" uuid, "parentId" uuid, "mediaItemsSnapshot" jsonb, "hashtagsSnapshot" jsonb, "tokensSnapshot" jsonb, "version" integer NOT NULL DEFAULT '0', "threadIndex" integer, CONSTRAINT "chk_thread_index_positive" CHECK ("threadIndex" >= 0), CONSTRAINT "chk_children_count_positive" CHECK ("childrenCount" >= 0), CONSTRAINT "chk_views_count_positive" CHECK ("viewsCount" >= 0), CONSTRAINT "chk_reposts_count_positive" CHECK ("repostsCount" >= 0), CONSTRAINT "chk_likes_count_positive" CHECK ("likesCount" >= 0), CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_post_created_at" ON "post" ("createdAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_post_parent_id_thread_index_createdAt" ON "post" ("parentId", "threadIndex", "createdAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_post_parent_id_thread_index" ON "post" ("parentId", "threadIndex") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_post_parent_id" ON "post" ("parentId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_post_repost_id" ON "post" ("repostId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_post_user_id" ON "post" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "post_wallet_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, "postId" uuid NOT NULL, "tokenId" uuid NOT NULL, CONSTRAINT "PK_f206293a12a975fec54c6e6da4c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "idx_post_wallet_token_token_id_user_id_post_id" ON "post_wallet_token" ("postId", "userId", "tokenId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_post_wallet_token_token_id" ON "post_wallet_token" ("tokenId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "follow" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, "targetUserId" uuid NOT NULL, CONSTRAINT "PK_fda88bc28a84d2d6d06e19df6e5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "idx_follow_userId_target_user_id" ON "follow" ("userId", "targetUserId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_follow_target_user_id" ON "follow" ("targetUserId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_follow_user_id" ON "follow" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."notification_type_enum" AS ENUM('comment', 'follow', 'invite', 'like', 'mention', 'repost')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."notification_status_enum" AS ENUM('failed', 'notified', 'waiting')`,
    );
    await queryRunner.query(
      `CREATE TABLE "notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "type" "public"."notification_type_enum" NOT NULL, "recipientId" uuid NOT NULL, "actorId" uuid NOT NULL, "postId" uuid, "commentId" uuid, "followId" uuid, "likeId" uuid, "mentionId" uuid, "repostId" uuid, "status" "public"."notification_status_enum" NOT NULL DEFAULT 'waiting', "errorMessage" character varying, "retryCount" integer NOT NULL DEFAULT '0', "retryAt" TIMESTAMP, "seenAt" TIMESTAMP, "expireAt" TIMESTAMP, CONSTRAINT "chk_notification_retry_count_positive" CHECK ("retryCount" >= 0), CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_notification_status_retry_count_retry_at" ON "notification" ("status", "retryCount", "retryAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_notification_recipient_id_seen_at" ON "notification" ("recipientId", "seenAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_notification_recipient_id_created_at" ON "notification" ("recipientId", "createdAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_notification_retry_count" ON "notification" ("retryCount") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_notification_status" ON "notification" ("status") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_notification_repost_id" ON "notification" ("repostId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_notification_mention_id" ON "notification" ("mentionId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_notification_like_id" ON "notification" ("likeId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_notification_post_id" ON "notification" ("postId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_notification_follow_id" ON "notification" ("followId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_notification_comment_id" ON "notification" ("commentId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_notification_recipient_id" ON "notification" ("recipientId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_notification_actor_id" ON "notification" ("actorId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_notification_type" ON "notification" ("type") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_notification_channel" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, "channelId" uuid NOT NULL, "isEnabled" boolean NOT NULL, CONSTRAINT "PK_be9e05f336ebb07993b2fd17d4d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_notification_channel_is_enabled" ON "user_notification_channel" ("isEnabled") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_notification_channel_user_id" ON "user_notification_channel" ("channelId", "userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_notification_channel_channel_id" ON "user_notification_channel" ("channelId") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."notification_channel_notifymethod_enum" AS ENUM('email', 'sms', 'push')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."notification_channel_notificationtype_enum" AS ENUM('comment', 'follow', 'invite', 'like', 'mention', 'repost')`,
    );
    await queryRunner.query(
      `CREATE TABLE "notification_channel" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isOptional" boolean NOT NULL, "isEnabled" boolean NOT NULL, "notifyMethod" "public"."notification_channel_notifymethod_enum" NOT NULL, "notificationType" "public"."notification_channel_notificationtype_enum" NOT NULL, CONSTRAINT "PK_50b36f3daa5dd86f7e707740b23" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_notification_channel_is_enabled" ON "notification_channel" ("isEnabled") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_notification_channel_notify_method" ON "notification_channel" ("notifyMethod") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_notification_channel_notification_type" ON "notification_channel" ("notificationType") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_notification_channel_is_optional" ON "notification_channel" ("isOptional") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."avatar_media_mimetype_enum" AS ENUM('image/jpeg', 'image/png', 'image/gif', 'image/webp')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."avatar_media_sourcetype_enum" AS ENUM('amazon_s3')`,
    );
    await queryRunner.query(
      `CREATE TABLE "avatar_media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "url" text NOT NULL, "fileName" text NOT NULL, "mimeType" "public"."avatar_media_mimetype_enum" NOT NULL, "sourceType" "public"."avatar_media_sourcetype_enum" NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_62a73806560e0d4923145126fff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_avatar_media_user_id" ON "avatar_media" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_feed" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, "postId" uuid NOT NULL, "authorUserId" uuid NOT NULL, "hash" uuid NOT NULL, CONSTRAINT "UQ_13aa6966c3f4e6e0b08d6489b1f" UNIQUE ("hash"), CONSTRAINT "PK_75099a104c0806d680c2f07c5e1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_feed_hash" ON "user_feed" ("hash") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_feed_userId" ON "user_feed" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_hashtag_affinity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, "tagId" uuid NOT NULL, "engagedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "affinityScore" bigint NOT NULL, "uniqueHash" character varying NOT NULL, CONSTRAINT "UQ_9623cc144d0a32b31deec339fb7" UNIQUE ("uniqueHash"), CONSTRAINT "chk_user_engagement_affinity_score_positive" CHECK ("affinityScore" >= 0), CONSTRAINT "PK_51b9014ecc43403c0b791fc434c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_hashtag_affinity_user_id_engaged_at_affinity_score" ON "user_hashtag_affinity" ("userId", "engagedAt", "affinityScore") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_hashtag_affinity_user_id_engaged_at" ON "user_hashtag_affinity" ("userId", "engagedAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_hashtag_affinity_tag_id_affinity_score" ON "user_hashtag_affinity" ("tagId", "affinityScore") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_hashtag_affinity_user_id_affinity_score" ON "user_hashtag_affinity" ("userId", "affinityScore") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "idx_user_hashtag_affinity_tag_id_user_id" ON "user_hashtag_affinity" ("tagId", "userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_hashtag_affinity_tag_id" ON "user_hashtag_affinity" ("tagId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_hashtag_affinity_user_id" ON "user_hashtag_affinity" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_affinity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, "targetUserId" uuid NOT NULL, "engagedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "affinityScore" bigint NOT NULL DEFAULT '0', "uniqueHash" character varying NOT NULL, "isFollowed" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_54213c428a65a61e861d95dde10" UNIQUE ("uniqueHash"), CONSTRAINT "chk_user_engagement_affinity_score_positive" CHECK ("affinityScore" >= 0), CONSTRAINT "PK_0ba167744c7cab44e4fcab25167" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_affinity_target_user_id_affinity_score_is_followed" ON "user_affinity" ("targetUserId", "affinityScore", "isFollowed") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_affinity_target_user_id_affinity_score" ON "user_affinity" ("targetUserId", "affinityScore") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_affinity_userId_engaged_at_affinity_score" ON "user_affinity" ("userId", "engagedAt", "affinityScore") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_affinity_userId_engaged_at" ON "user_affinity" ("userId", "engagedAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_affinity_userId_affinity_score" ON "user_affinity" ("userId", "affinityScore") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "idx_user_affinity_target_user_id_userId" ON "user_affinity" ("targetUserId", "userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_affinity_target_user_id" ON "user_affinity" ("targetUserId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_affinity_userId" ON "user_affinity" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_engagement_type_enum" AS ENUM('like', 'view', 'share', 'reply', 'post', 'repost')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_engagement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, "targetUserId" uuid NOT NULL, "postId" uuid NOT NULL, "type" "public"."user_engagement_type_enum" NOT NULL, "durationInSec" integer, CONSTRAINT "chk_user_engagement_duration_in_sec_positive" CHECK ("durationInSec" >= 0), CONSTRAINT "PK_9e467f686bf9fed30233cbd7bc5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_engagement_postId_duration_in_sec" ON "user_engagement" ("postId", "durationInSec") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_engagement_postId_type" ON "user_engagement" ("postId", "type") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_engagement_postId_userI_id_type" ON "user_engagement" ("postId", "userId", "type") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_engagement_postId_userI_id" ON "user_engagement" ("postId", "userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_engagement_created_at_postId" ON "user_engagement" ("createdAt", "postId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_engagement_postId" ON "user_engagement" ("postId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_engagement_userI_id" ON "user_engagement" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "auth_session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "fcmToken" character varying, "device" character varying NOT NULL, "loginHash" character varying NOT NULL, "expiresAt" bigint NOT NULL, "refreshCounter" integer NOT NULL DEFAULT '0', "refreshedAt" bigint, "userId" uuid NOT NULL, CONSTRAINT "chk_auth_session_refresh_counter_positive" CHECK ("refreshCounter" >= 0), CONSTRAINT "PK_19354ed146424a728c1112a8cbf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_session_id_expires_at_refresh_counter" ON "auth_session" ("userId", "expiresAt", "refreshCounter") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_session_user_id_login_hash_expires_at" ON "auth_session" ("userId", "loginHash", "expiresAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_session_user_id" ON "auth_session" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_wallet_token" ADD CONSTRAINT "FK_3dc37c08f5713bfa3f62bdb64a0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_wallet_token" ADD CONSTRAINT "FK_1945c4b36e765cdce09ada9fc25" FOREIGN KEY ("tokenId") REFERENCES "wallet_token"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_hashtag" ADD CONSTRAINT "FK_fce04ee5f622e64a5124a2dd3d2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_hashtag" ADD CONSTRAINT "FK_6b41c908e59dd1c45518efa4291" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_hashtag" ADD CONSTRAINT "FK_e7055e58552d3e3073522036ffb" FOREIGN KEY ("tagId") REFERENCES "hashtag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_like" ADD CONSTRAINT "FK_789b3f929eb3d8760419f87c8a9" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_like" ADD CONSTRAINT "FK_909fc474ef645901d01f0cc0662" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_media" ADD CONSTRAINT "FK_4adcc5190e3b5c7e9001adef3b8" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_media" ADD CONSTRAINT "FK_17adc991be0bfc5ede2e931f9bd" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_mention" ADD CONSTRAINT "FK_2a31e87a2a08355c43fc87de547" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_mention" ADD CONSTRAINT "FK_e984112a386c93051af9a5462cd" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_0ea242deccafd24a547729edec2" FOREIGN KEY ("repostId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_985731f28966e0d45a7bd9078a6" FOREIGN KEY ("parentId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_wallet_token" ADD CONSTRAINT "FK_cc7e9afcf37dc2d8b6ba4f3b60e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_wallet_token" ADD CONSTRAINT "FK_4e95a2fef04af2509db6a6b01f1" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_wallet_token" ADD CONSTRAINT "FK_8353f5e3a5b984cbbf6fa57f384" FOREIGN KEY ("tokenId") REFERENCES "wallet_token"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow" ADD CONSTRAINT "FK_af9f90ce5e8f66f845ebbcc6f15" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow" ADD CONSTRAINT "FK_5ed78f6c3c3c2b51e98f6121691" FOREIGN KEY ("targetUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_ab7cbe7a013ecac5da0a8f88884" FOREIGN KEY ("recipientId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_c5133a026bd1b3d9feccac1a234" FOREIGN KEY ("actorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_c7dc378ca2844fdfe647e00e993" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_8dcb425fddadd878d80bf5fa195" FOREIGN KEY ("commentId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_cf7eb9ffc9c99e74b7af8af1533" FOREIGN KEY ("followId") REFERENCES "follow"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_e8fc34e5036ba2e4f1220ed0a62" FOREIGN KEY ("likeId") REFERENCES "post_like"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_feb258336cebae01888c2260cfb" FOREIGN KEY ("mentionId") REFERENCES "post_mention"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_3fac1a01876d2d5c7b52759e898" FOREIGN KEY ("repostId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_channel" ADD CONSTRAINT "FK_686719fb79b00c3bc1ccec8df58" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_channel" ADD CONSTRAINT "FK_335d002e144144cba703a0aa4fb" FOREIGN KEY ("channelId") REFERENCES "notification_channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "avatar_media" ADD CONSTRAINT "FK_8e80cf9c1829816bd3ac52b4ab9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth_session" ADD CONSTRAINT "FK_c072b729d71697f959bde66ade0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "auth_session" DROP CONSTRAINT "FK_c072b729d71697f959bde66ade0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "avatar_media" DROP CONSTRAINT "FK_8e80cf9c1829816bd3ac52b4ab9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_channel" DROP CONSTRAINT "FK_335d002e144144cba703a0aa4fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_channel" DROP CONSTRAINT "FK_686719fb79b00c3bc1ccec8df58"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_3fac1a01876d2d5c7b52759e898"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_feb258336cebae01888c2260cfb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_e8fc34e5036ba2e4f1220ed0a62"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_cf7eb9ffc9c99e74b7af8af1533"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_8dcb425fddadd878d80bf5fa195"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_c7dc378ca2844fdfe647e00e993"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_c5133a026bd1b3d9feccac1a234"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_ab7cbe7a013ecac5da0a8f88884"`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow" DROP CONSTRAINT "FK_5ed78f6c3c3c2b51e98f6121691"`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow" DROP CONSTRAINT "FK_af9f90ce5e8f66f845ebbcc6f15"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_wallet_token" DROP CONSTRAINT "FK_8353f5e3a5b984cbbf6fa57f384"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_wallet_token" DROP CONSTRAINT "FK_4e95a2fef04af2509db6a6b01f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_wallet_token" DROP CONSTRAINT "FK_cc7e9afcf37dc2d8b6ba4f3b60e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_985731f28966e0d45a7bd9078a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_0ea242deccafd24a547729edec2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_mention" DROP CONSTRAINT "FK_e984112a386c93051af9a5462cd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_mention" DROP CONSTRAINT "FK_2a31e87a2a08355c43fc87de547"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_media" DROP CONSTRAINT "FK_17adc991be0bfc5ede2e931f9bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_media" DROP CONSTRAINT "FK_4adcc5190e3b5c7e9001adef3b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_like" DROP CONSTRAINT "FK_909fc474ef645901d01f0cc0662"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_like" DROP CONSTRAINT "FK_789b3f929eb3d8760419f87c8a9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_hashtag" DROP CONSTRAINT "FK_e7055e58552d3e3073522036ffb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_hashtag" DROP CONSTRAINT "FK_6b41c908e59dd1c45518efa4291"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_hashtag" DROP CONSTRAINT "FK_fce04ee5f622e64a5124a2dd3d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_wallet_token" DROP CONSTRAINT "FK_1945c4b36e765cdce09ada9fc25"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_wallet_token" DROP CONSTRAINT "FK_3dc37c08f5713bfa3f62bdb64a0"`,
    );
    await queryRunner.query(`DROP INDEX "public"."idx_session_user_id"`);
    await queryRunner.query(
      `DROP INDEX "public"."idx_session_user_id_login_hash_expires_at"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_session_id_expires_at_refresh_counter"`,
    );
    await queryRunner.query(`DROP TABLE "auth_session"`);
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_engagement_userI_id"`,
    );
    await queryRunner.query(`DROP INDEX "public"."idx_user_engagement_postId"`);
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_engagement_created_at_postId"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_engagement_postId_userI_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_engagement_postId_userI_id_type"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_engagement_postId_type"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_engagement_postId_duration_in_sec"`,
    );
    await queryRunner.query(`DROP TABLE "user_engagement"`);
    await queryRunner.query(`DROP TYPE "public"."user_engagement_type_enum"`);
    await queryRunner.query(`DROP INDEX "public"."idx_user_affinity_userId"`);
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_affinity_target_user_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_affinity_target_user_id_userId"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_affinity_userId_affinity_score"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_affinity_userId_engaged_at"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_affinity_userId_engaged_at_affinity_score"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_affinity_target_user_id_affinity_score"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_affinity_target_user_id_affinity_score_is_followed"`,
    );
    await queryRunner.query(`DROP TABLE "user_affinity"`);
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_hashtag_affinity_user_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_hashtag_affinity_tag_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_hashtag_affinity_tag_id_user_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_hashtag_affinity_user_id_affinity_score"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_hashtag_affinity_tag_id_affinity_score"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_hashtag_affinity_user_id_engaged_at"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_hashtag_affinity_user_id_engaged_at_affinity_score"`,
    );
    await queryRunner.query(`DROP TABLE "user_hashtag_affinity"`);
    await queryRunner.query(`DROP INDEX "public"."idx_user_feed_userId"`);
    await queryRunner.query(`DROP INDEX "public"."idx_user_feed_hash"`);
    await queryRunner.query(`DROP TABLE "user_feed"`);
    await queryRunner.query(`DROP INDEX "public"."idx_avatar_media_user_id"`);
    await queryRunner.query(`DROP TABLE "avatar_media"`);
    await queryRunner.query(
      `DROP TYPE "public"."avatar_media_sourcetype_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."avatar_media_mimetype_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."idx_notification_channel_is_optional"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_notification_channel_notification_type"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_notification_channel_notify_method"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_notification_channel_is_enabled"`,
    );
    await queryRunner.query(`DROP TABLE "notification_channel"`);
    await queryRunner.query(
      `DROP TYPE "public"."notification_channel_notificationtype_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."notification_channel_notifymethod_enum"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_notification_channel_channel_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_notification_channel_user_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_notification_channel_is_enabled"`,
    );
    await queryRunner.query(`DROP TABLE "user_notification_channel"`);
    await queryRunner.query(`DROP INDEX "public"."idx_notification_type"`);
    await queryRunner.query(`DROP INDEX "public"."idx_notification_actor_id"`);
    await queryRunner.query(
      `DROP INDEX "public"."idx_notification_recipient_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_notification_comment_id"`,
    );
    await queryRunner.query(`DROP INDEX "public"."idx_notification_follow_id"`);
    await queryRunner.query(`DROP INDEX "public"."idx_notification_post_id"`);
    await queryRunner.query(`DROP INDEX "public"."idx_notification_like_id"`);
    await queryRunner.query(
      `DROP INDEX "public"."idx_notification_mention_id"`,
    );
    await queryRunner.query(`DROP INDEX "public"."idx_notification_repost_id"`);
    await queryRunner.query(`DROP INDEX "public"."idx_notification_status"`);
    await queryRunner.query(
      `DROP INDEX "public"."idx_notification_retry_count"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_notification_recipient_id_created_at"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_notification_recipient_id_seen_at"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_notification_status_retry_count_retry_at"`,
    );
    await queryRunner.query(`DROP TABLE "notification"`);
    await queryRunner.query(`DROP TYPE "public"."notification_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."notification_type_enum"`);
    await queryRunner.query(`DROP INDEX "public"."idx_follow_user_id"`);
    await queryRunner.query(`DROP INDEX "public"."idx_follow_target_user_id"`);
    await queryRunner.query(
      `DROP INDEX "public"."idx_follow_userId_target_user_id"`,
    );
    await queryRunner.query(`DROP TABLE "follow"`);
    await queryRunner.query(
      `DROP INDEX "public"."idx_post_wallet_token_token_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_post_wallet_token_token_id_user_id_post_id"`,
    );
    await queryRunner.query(`DROP TABLE "post_wallet_token"`);
    await queryRunner.query(`DROP INDEX "public"."idx_post_user_id"`);
    await queryRunner.query(`DROP INDEX "public"."idx_post_repost_id"`);
    await queryRunner.query(`DROP INDEX "public"."idx_post_parent_id"`);
    await queryRunner.query(
      `DROP INDEX "public"."idx_post_parent_id_thread_index"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_post_parent_id_thread_index_createdAt"`,
    );
    await queryRunner.query(`DROP INDEX "public"."idx_post_created_at"`);
    await queryRunner.query(`DROP TABLE "post"`);
    await queryRunner.query(`DROP INDEX "public"."idx_post_mention_userId"`);
    await queryRunner.query(`DROP INDEX "public"."idx_post_mention_postId"`);
    await queryRunner.query(`DROP TABLE "post_mention"`);
    await queryRunner.query(`DROP INDEX "public"."idx_post_media_user_id"`);
    await queryRunner.query(`DROP INDEX "public"."idx_post_media_post_id"`);
    await queryRunner.query(`DROP TABLE "post_media"`);
    await queryRunner.query(`DROP TYPE "public"."post_media_sourcetype_enum"`);
    await queryRunner.query(`DROP TYPE "public"."post_media_mimetype_enum"`);
    await queryRunner.query(`DROP INDEX "public"."idx_post_like_user_id"`);
    await queryRunner.query(`DROP INDEX "public"."idx_post_like_post_id"`);
    await queryRunner.query(
      `DROP INDEX "public"."idx_post_like_user_id_post_id"`,
    );
    await queryRunner.query(`DROP TABLE "post_like"`);
    await queryRunner.query(`DROP INDEX "public"."idx_post_hashtag_tag_id"`);
    await queryRunner.query(
      `DROP INDEX "public"."idx_post_hashtag_tag_id_user_id_post_id"`,
    );
    await queryRunner.query(`DROP TABLE "post_hashtag"`);
    await queryRunner.query(`DROP INDEX "public"."idx_hashtag_name"`);
    await queryRunner.query(`DROP TABLE "hashtag"`);
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_wallet_token_user_id_token_id"`,
    );
    await queryRunner.query(`DROP TABLE "user_wallet_token"`);
    await queryRunner.query(`DROP INDEX "public"."idx_user_username"`);
    await queryRunner.query(`DROP INDEX "public"."idx_user_phone"`);
    await queryRunner.query(`DROP INDEX "public"."idx_user_country_code"`);
    await queryRunner.query(`DROP INDEX "public"."idx_user_email"`);
    await queryRunner.query(`DROP INDEX "public"."idx_user_post_policy"`);
    await queryRunner.query(`DROP INDEX "public"."idx_user_reply_policy"`);
    await queryRunner.query(`DROP INDEX "public"."idx_user_mention_policy"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_replypolicy_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_mentionpolicy_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_postpolicy_enum"`);
    await queryRunner.query(
      `DROP TYPE "public"."users_defaultdisplaynametype_enum"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_wallet_token_ethereum_address"`,
    );
    await queryRunner.query(`DROP INDEX "public"."idx_wallet_token_logo"`);
    await queryRunner.query(`DROP INDEX "public"."idx_wallet_token_symbol"`);
    await queryRunner.query(`DROP INDEX "public"."idx_wallet_token_is_native"`);
    await queryRunner.query(`DROP TABLE "wallet_token"`);
  }
}
