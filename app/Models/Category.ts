import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime({ columnName: 'deleted_at' })
  public deleted_at: DateTime | null

  @hasMany(() => Product, {
    foreignKey: 'category_id',
  })
  public products: HasMany<typeof Product>
}
