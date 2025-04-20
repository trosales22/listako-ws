import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TasksSchema extends BaseSchema {
  protected tableName = 'tasks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('uuid').notNullable().unique().index()
      table.uuid('owner_id').notNullable().index()
      table.string('name').notNullable().index()
      table.text('description', 'longtext').nullable()
      table.boolean('is_favorite').defaultTo(false).index()
      table.string('status').defaultTo('pending').index()
      table.string('priority').defaultTo('medium').index()
      table.dateTime('completed_at').nullable().index()
      table.dateTime('created_at', { useTz: true }).notNullable()
      table.dateTime('updated_at', { useTz: true })
      table.index(['created_at', 'updated_at'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
