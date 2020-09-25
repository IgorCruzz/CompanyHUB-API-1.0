import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class updateUser1596752537001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'administrator',
        type: 'boolean',
        default: false,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
