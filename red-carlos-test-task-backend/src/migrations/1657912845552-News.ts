import { MigrationInterface, QueryRunner } from 'typeorm';

export class News1657912845552 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "news" ("category" text NOT NULL, "title" text NOT NULL, "date" text NOT NULL, "description" text NOT NULL, "shortDescription" text NOT NULL, "likesNumber" text NOT NULL, "image" text NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "news"`);
  }
}
