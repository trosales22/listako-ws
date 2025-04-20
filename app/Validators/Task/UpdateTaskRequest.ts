import {rules, schema} from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task';
import GeneralConstants from 'App/Constants/GeneralConstants';

export default class UpdateTaskRequest {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string({escape: true, trim: true}, [
        rules.exists({table: Task.table, column: 'uuid'})
      ])
    }),
    name: schema.string({ trim: true, escape: true }, [
      rules.unique({
        table: Task.table,
        column: 'name',
        whereNot: {
          uuid: this.ctx.params.id,
          owner_id: this.ctx.auth.user!.uuid
        }
      })
    ]),
    description: schema.string.optional({ trim: true, escape: true }, [
      rules.maxLength(500)
    ]),
    is_favorite: schema.boolean.optional(),
    status: schema.enum.optional([
      GeneralConstants.TASK_STATUS_CODES.PENDING,
      GeneralConstants.TASK_STATUS_CODES.IN_PROGRESS,
      GeneralConstants.TASK_STATUS_CODES.COMPLETED
    ] as const),
    priority: schema.enum.optional([
      GeneralConstants.TASK_PRIORITY_CODES.LOW,
      GeneralConstants.TASK_PRIORITY_CODES.MEDIUM,
      GeneralConstants.TASK_PRIORITY_CODES.HIGH
    ] as const)
  })

  public messages = {
    'params.id.required': 'Task ID is required',
    'params.id.exists': 'Task ID does not exist',
    'name.required': 'Task Name is required',
    'name.unique': 'Task Name already exist',
    'description.maxLength': 'Description max length is 500',
    'is_favorite.boolean': 'Favorite Flag must be a boolean',
    'status.enum': 'Status must be in {{ options.choices }}',
    'priority.enum': 'Priority must be in {{ options.choices }}',
  }
}
