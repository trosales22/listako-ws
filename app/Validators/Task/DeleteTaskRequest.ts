import {rules, schema} from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task';

export default class DeleteTaskRequest {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string({escape: true, trim: true}, [
        rules.exists({table: Task.table, column: 'uuid'})
      ])
    })
  })

  public messages = {
    'params.id.required': 'Task ID is required',
    'params.id.exists': 'Task ID does not exist'
  }
}
