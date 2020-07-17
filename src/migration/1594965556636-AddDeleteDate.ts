import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddDeleteDate1594965556636 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumns('posts', [
        new TableColumn({name: 'deletedAt', type: 'timestamp', isNullable: true})
      ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('posts', 'deletedAt');
    }

}
