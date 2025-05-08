import { MigrationInterface, QueryRunner } from 'typeorm';

export class FeedUuidv61746178656911 implements MigrationInterface {
  name = 'FeedUuidv61746178656911';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Add nullable column first
    await queryRunner.query(`ALTER TABLE "user_feed" ADD "feedId" uuid`);

    // Step 2: Backfill with generated UUIDs
    await queryRunner.query(
      `UPDATE "user_feed" SET "feedId" = gen_random_uuid()`,
    );

    // Step 3: Enforce NOT NULL
    await queryRunner.query(
      `ALTER TABLE "user_feed" ALTER COLUMN "feedId" SET NOT NULL`,
    );

    // Step 4: Create indexes
    await queryRunner.query(
      `CREATE UNIQUE INDEX "idx_user_feed_feedId_userId" ON "user_feed" ("feedId", "userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_feed_feedId" ON "user_feed" ("feedId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_feed_createdAt" ON "user_feed" ("createdAt") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."idx_user_feed_createdAt"`);
    await queryRunner.query(`DROP INDEX "public"."idx_user_feed_feedId"`);
    await queryRunner.query(
      `DROP INDEX "public"."idx_user_feed_feedId_userId"`,
    );
    await queryRunner.query(`ALTER TABLE "user_feed" DROP COLUMN "feedId"`);
  }
}
