import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm'

export class updateProduct1596750145468 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'company_id',
        type: 'integer',
      })
    )

    await queryRunner.createForeignKey(
      'products',
      new TableForeignKey({
        columnNames: ['company_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'companies',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    )
  }

  public async down(): Promise<void> {}
}
