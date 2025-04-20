import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import GeneralConstants from 'App/Constants/GeneralConstants'

export default class CreateTaskRequest {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true, escape: true }, [
      rules.unique({
        table: Task.table,
        column: 'name',
        whereNot: {
          uuid: this.ctx.auth.user!.uuid
        }
      })
    ]),
    description: schema.string.optional({ trim: true, escape: true }, [
      rules.maxLength(500)
    ]),
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
    'name.required': 'Task Name is required',
    'name.unique': 'Task Name already exist',
    'description.maxLength': 'Description max length is 500',
    'status.enum': 'Status must be in {{ options.choices }}',
    'priority.enum': 'Priority must be in {{ options.choices }}',
  }
}
