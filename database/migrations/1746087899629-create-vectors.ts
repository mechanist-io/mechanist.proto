import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVectors1746087899629 implements MigrationInterface {
  name = 'CreateVectors1746087899629';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // start
    // create hashtag vector and trigger to update it by name
    await queryRunner.query(
      `CREATE INDEX idx_hashtag_name_vector ON "hashtag" USING gin("nameVector")`,
    );
    await queryRunner.query(
      `CREATE FUNCTION update_name_vector() RETURNS TRIGGER AS $$ BEGIN NEW."nameVector" := to_tsvector('simple', NEW."name"); RETURN NEW; END; $$ LANGUAGE plpgsql;`,
    );
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS trigger_update_name_vector ON "hashtag";`,
    );
    await queryRunner.query(
      `CREATE TRIGGER trigger_update_name_vector BEFORE INSERT OR UPDATE ON "hashtag" FOR EACH ROW EXECUTE FUNCTION update_name_vector();`,
    );
    // end

    // start
    // full text search on post content
    await queryRunner.query(
      `CREATE INDEX "idx_post_content_vector" ON "post" USING GIN ("contentVector")`,
    );
    await queryRunner.query(`
              CREATE FUNCTION update_post_content_vector()
              RETURNS TRIGGER AS $$
              BEGIN
                  NEW."contentVector" := to_tsvector('simple', COALESCE(NEW."content", ''));
                  RETURN NEW;
              END;
              $$ LANGUAGE plpgsql;
          `);
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS post_content_vector_update ON "post";`,
    );
    await queryRunner.query(`
              CREATE TRIGGER post_content_vector_update
              BEFORE INSERT OR UPDATE ON "post"
              FOR EACH ROW
              EXECUTE FUNCTION update_post_content_vector();
          `);
    // end

    // start
    // create username vector and trigger to update it by username
    await queryRunner.query(
      `CREATE INDEX idx_users_username_vector ON "users" USING gin("usernameVector")`,
    );
    await queryRunner.query(
      `CREATE FUNCTION update_users_username_vector() RETURNS TRIGGER AS $$
                 BEGIN
                   NEW."usernameVector" := to_tsvector('simple', NEW."username");
                   RETURN NEW;
                 END;
                 $$ LANGUAGE plpgsql;`,
    );
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS trigger_update_users_username_vector ON "users";`,
    );
    await queryRunner.query(
      `CREATE TRIGGER trigger_update_users_username_vector
                 BEFORE INSERT OR UPDATE ON "users"
                 FOR EACH ROW
                 EXECUTE FUNCTION update_users_username_vector();`,
    );
    // end

    // start
    // create fullName vector and trigger to update it by fullName
    await queryRunner.query(
      `CREATE INDEX idx_users_fullname_vector ON "users" USING gin("fullNameVector")`,
    );
    await queryRunner.query(
      `CREATE FUNCTION update_users_fullName_vector() RETURNS TRIGGER AS $$
                   BEGIN
                     NEW."fullNameVector" := to_tsvector('simple', NEW."fullName");
                     RETURN NEW;
                   END;
                   $$ LANGUAGE plpgsql;`,
    );
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS trigger_update_users_fullName_vector ON "users";`,
    );
    await queryRunner.query(
      `CREATE TRIGGER trigger_update_users_fullName_vector
                   BEFORE INSERT OR UPDATE ON "users"
                   FOR EACH ROW
                   EXECUTE FUNCTION update_users_fullName_vector();`,
    );
    // end

    // start
    // create name vector and trigger to update it by name
    await queryRunner.query(
      `CREATE INDEX idx_wallet_token_name_vector ON "wallet_token" USING gin("nameVector")`,
    );
    await queryRunner.query(
      `CREATE FUNCTION update_wallet_token_nameVector_vector() RETURNS TRIGGER AS $$
                       BEGIN
                         NEW."nameVector" := to_tsvector('simple', NEW."name");
                         RETURN NEW;
                       END;
                       $$ LANGUAGE plpgsql;`,
    );
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS trigger_update_wallet_token_name_vector ON "wallet_token";`,
    );
    await queryRunner.query(
      `CREATE TRIGGER trigger_update_wallet_token_name_vector
                       BEFORE INSERT OR UPDATE ON "wallet_token"
                       FOR EACH ROW
                       EXECUTE FUNCTION update_wallet_token_nameVector_vector();`,
    );
    // end
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // hashtag name vector
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS trigger_update_name_vector ON "hashtag";`,
    );
    await queryRunner.query(`DROP FUNCTION IF EXISTS update_name_vector;`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_hashtag_name_vector;`);

    // post content vector
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS post_content_vector_update ON "post";`,
    );
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS update_post_content_vector;`,
    );
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_post_content_vector";`);

    // users username vector
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS trigger_update_users_username_vector ON "users";`,
    );
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS update_users_username_vector;`,
    );
    await queryRunner.query(`DROP INDEX IF EXISTS idx_users_username_vector;`);

    // users fullName vector
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS trigger_update_users_fullName_vector ON "users";`,
    );
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS update_users_fullName_vector;`,
    );
    await queryRunner.query(`DROP INDEX IF EXISTS idx_users_fullname_vector;`);

    // wallet_token name vector
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS trigger_update_wallet_token_name_vector ON "wallet_token";`,
    );
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS update_wallet_token_nameVector_vector;`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS idx_wallet_token_name_vector;`,
    );
  }
}
