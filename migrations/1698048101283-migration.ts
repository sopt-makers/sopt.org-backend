import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReviewTableModification implements MigrationInterface {
  name = 'ReviewTableModification';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const reviewTable = await queryRunner.getTable('Review');
    if (!reviewTable) {
      console.error('No Review Table Found!');
      return;
    }
    await queryRunner.renameColumn(reviewTable, 'thumbnail', 'thumbnailUrl');
    await queryRunner.renameColumn(reviewTable, 'reviewer', 'author');
    await queryRunner.renameColumn(reviewTable, 'semester', 'generation');
    await queryRunner.renameColumn(reviewTable, 'link', 'url');
    await queryRunner.query(
      `ALTER TABLE "Review" ADD "description" character varying(600) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "Review" ADD "authorProfileImageUrl" character varying(500)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const reviewTable = await queryRunner.getTable('Review');
    if (!reviewTable) {
      console.error('No Review Table Found!');
      return;
    }
    await queryRunner.renameColumn(reviewTable, 'thumbnailUrl', 'thumbnail');
    await queryRunner.renameColumn(reviewTable, 'author', 'author');
    await queryRunner.renameColumn(reviewTable, 'generation', 'semester');
    await queryRunner.renameColumn(reviewTable, 'url', 'link');
    await queryRunner.query(`ALTER TABLE "Review" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "Review" DROP COLUMN "authorProfileImageUrl"`,
    );
  }
}
