import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import GeneralConstants from 'App/Constants/GeneralConstants'
import User from './User'

export default class Task extends BaseModel {
  public static table = 'tasks'

  @column({
    isPrimary: true,
    serializeAs: 'id',
    columnName: 'id',
    consume: (value, attribute, model) => {
      return value || model.$getAttribute(attribute)
    },
  })
  public id: number

  @column({ serializeAs: 'uuid', columnName: 'uuid' })
  public uuid: string;

  @column({ serializeAs: 'owner_id', columnName: 'owner_id' })
  public ownerId: string

  @column({ serializeAs: 'name', columnName: 'name' })
  public name: string

  @column({ serializeAs: 'description', columnName: 'description' })
  public description: string

  @column({
    serialize: (value?: Number) => {
      return Boolean(value)
    },
    serializeAs: 'is_favorite',
    columnName: 'is_favorite',
  })
  public isFavorite: boolean

  @column({ serializeAs: 'status', columnName: 'status' })
  public status: string

  @column({ serializeAs: 'priority', columnName: 'priority' })
  public priority: string

  @column.dateTime({
    serializeAs: 'completed_at',
    columnName: 'completed_at',
    serialize: (value: DateTime | null) => {
      return value ? value.setZone(GeneralConstants.PH_TIMEZONE).toISO() : value
    },
  })
  public completedAt: DateTime

  @column.dateTime({
    serializeAs: 'created_at',
    columnName: 'created_at',
    autoCreate: true,
    serialize: (value: DateTime | null) => {
      return value ? value.setZone(GeneralConstants.PH_TIMEZONE).toISO() : value
    },
  })
  public createdAt: DateTime

  @column.dateTime({
    serializeAs: 'updated_at',
    columnName: 'updated_at',
    serialize: (value: DateTime | null) => {
      return value ? value.setZone(GeneralConstants.PH_TIMEZONE).toISO() : value
    },
  })
  public updatedAt: DateTime

  @beforeCreate()
  public static setId(task: Task) {
    task.uuid = uuidv4()
  }

  @belongsTo(() => User, {
    localKey: 'uuid',
    foreignKey: 'ownerId'
  })
  public owner: BelongsTo<typeof User>
}
