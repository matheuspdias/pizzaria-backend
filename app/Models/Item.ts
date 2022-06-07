import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Item extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public order_id: number

  @column()
  public product_id: number

  @column()
  public amount: number

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime({ columnName: 'deleted_at' })
  public deleted_at: DateTime | null
}
