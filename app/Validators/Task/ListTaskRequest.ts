import {schema} from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ListTaskRequest {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    q: schema.string.optional({escape: true, trim: true}),
    page: schema.number.optional(),
    limit: schema.number.optional(),
    sort_by: schema.enum.optional([
      'id'
    ] as const),
    sort_direction: schema.enum.optional(['asc', 'desc'] as const),
  })

  public messages = {
    'page.number': 'Page must be a number',
    'limit.number': 'Limit must be a number',
    'sort_by.enum': 'Sort By must be in {{ options.choices }}',
    'sort_direction.enum': 'Sort Direction must be in {{ options.choices }}'
  }
}
