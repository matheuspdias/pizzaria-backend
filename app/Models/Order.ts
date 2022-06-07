import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Item from './Item'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public table: number

  @column()
  public status: boolean

  @column()
  public draft: boolean

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime({ columnName: 'deleted_at' })
  public deleted_at: DateTime | null

  @hasMany(() => Item)
  public items: HasMany<typeof Item>  
}
