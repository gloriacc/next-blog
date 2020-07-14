import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreatePosts1594708262700 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'posts',
        columns: [
          {
            name: 'id', isGenerated: true, type: 'int', generationStrategy: 'increment', isPrimary: true
          },
          {
            name: 'title', type: 'varchar'
          },
          {
            name: 'content', type: 'text'
          },
          {
            name: 'author_id', type: 'int'
          },
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('posts');
    }

}
