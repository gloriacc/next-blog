import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddIsPrivate1594970009911 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumns('posts', [
        new TableColumn({name: 'isPrivate', type: 'boolean', isNullable: false, default: false})
      ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('posts', 'isPrivate');
    }

}
