import { MigrationInterface, QueryRunner } from 'typeorm';

export class EngagementParentidRepostid1746537516202
  implements MigrationInterface
{
  name = 'EngagementParentidRepostid1746537516202';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_engagement_postId_duration_in_sec"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_engagement_postId_type"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_engagement_postId_userI_id_type"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_engagement_postId_userI_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_engagement_created_at_postId"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_engagement_userI_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_engagement" ADD "parentId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_engagement" ADD "repostId" uuid`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_engagement_post_id_duration_in_sec" ON "user_engagement" ("postId", "durationInSec") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_engagement_post_id_type" ON "user_engagement" ("postId", "type") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_engagement_post_id_user_id_type" ON "user_engagement" ("postId", "userId", "type") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_engagement_post_id_user_id" ON "user_engagement" ("postId", "userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_engagement_created_at_parent_id" ON "user_engagement" ("createdAt", "parentId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_engagement_created_at_post_id" ON "user_engagement" ("createdAt", "postId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_engagement_user_id" ON "user_engagement" ("userId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_engagement_user_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_engagement_created_at_post_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_engagement_created_at_parent_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_engagement_post_id_user_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_engagement_post_id_user_id_type"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_engagement_post_id_type"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_engagement_post_id_duration_in_sec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_engagement" DROP COLUMN "repostId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_engagement" DROP COLUMN "parentId"`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_engagement_userI_id" ON "user_engagement" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_engagement_created_at_postId" ON "user_engagement" ("createdAt", "postId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_engagement_postId_userI_id" ON "user_engagement" ("postId", "userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_engagement_postId_userI_id_type" ON "user_engagement" ("postId", "type", "userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_engagement_postId_type" ON "user_engagement" ("postId", "type") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_engagement_postId_duration_in_sec" ON "user_engagement" ("durationInSec", "postId") `,
    );
  }
}
