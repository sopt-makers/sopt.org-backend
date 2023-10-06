import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1696575391219 implements MigrationInterface {
  name = 'migration1696575391219';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Notification" ("id" SERIAL NOT NULL, "generation" integer NOT NULL, "email" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_da18f6446b6fea585f01d03f56c" PRIMARY KEY ("id")); COMMENT ON COLUMN "Notification"."id" IS '기본키'`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "notification_list_pk" ON "Notification" ("id") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."notification_list_pk"`);
    await queryRunner.query(`DROP TABLE "Notification"`);
  }
}
