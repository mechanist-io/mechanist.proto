import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1746776054270 implements MigrationInterface {
  name = 'Init1746776054270';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."media_mimetype_enum" AS ENUM('image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/x-matroska', 'video/quicktime', 'video/x-msvideo', 'audio/mpeg', 'audio/wav', 'audio/m4a')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."media_sourcetype_enum" AS ENUM('amazon_s3')`,
    );
    await queryRunner.query(
      `CREATE TABLE "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "url" text NOT NULL, "fileName" text NOT NULL, "mimeType" "public"."media_mimetype_enum" NOT NULL, "sourceType" "public"."media_sourcetype_enum" NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_media_user_id" ON "media" ("userId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."idx_media_user_id"`);
    await queryRunner.query(`DROP TABLE "media"`);
    await queryRunner.query(`DROP TYPE "public"."media_sourcetype_enum"`);
    await queryRunner.query(`DROP TYPE "public"."media_mimetype_enum"`);
  }
}
