import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany, } from '@ioc:Adonis/Lucid/Orm'
import Comment from './Comment'

export default class Post extends BaseModel {
  @hasMany(()=> Comment)
  public comment: HasMany<typeof Comment>

  @column({ isPrimary: true })
  public id: number

  //@column()
  //public username: string

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
