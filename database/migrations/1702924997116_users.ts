import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import GeneralConstants from 'App/Constants/GeneralConstants'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('uuid').notNullable().unique().index()
      table.string('username').nullable().index()
      table.string('email').notNullable().index()
      table.string('firstname').nullable().index()
      table.string('lastname').nullable().index
      table.string('photo_url', 500).nullable()
      table.text('password').notNullable()
      table.string('profile_type')
      table.string('status').nullable().defaultTo(GeneralConstants.GENERAL_STATUS_TYPES['ACTIVE'])
      table.dateTime('created_at', { useTz: true }).notNullable()
      table.dateTime('updated_at', { useTz: true })
      table.index(['created_at', 'updated_at'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
