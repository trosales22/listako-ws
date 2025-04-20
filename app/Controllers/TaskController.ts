import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import JSONSerializerHelper from 'App/Helpers/JSONSerializerHelper'
import DateFormatterHelper from 'App/Helpers/DateFormatterHelper'
import TaskRepository from 'App/Repositories/TaskRepository'
import Task from 'App/Models/Task'
import TaskTransformer from 'App/Transformers/TaskTransformer'
import CreateTaskRequest from 'App/Validators/Task/CreateTaskRequest'
import ViewTaskRequest from 'App/Validators/Task/ViewTaskRequest'
import UpdateTaskRequest from 'App/Validators/Task/UpdateTaskRequest'
import DeleteTaskRequest from 'App/Validators/Task/DeleteTaskRequest'
import ListTaskRequest from 'App/Validators/Task/ListTaskRequest'

export default class TaskController {
  private taskRepo: TaskRepository

  constructor() {
    this.taskRepo = new TaskRepository()
  }

  // @ts-ignore
  public async index({ auth, request, response, transform }: HttpContextContract) {
    await request.validate(ListTaskRequest)

    const userAuthData = auth.use('api').user!

    const list = await this.taskRepo.getAll({
      q: request.input('q', null),
      page: request.input('page', 1),
      limit: request.input('limit', 25),
      status: request.input('status', null),
      priority: request.input('priority', null),
      owner_id: userAuthData.uuid
    })

    const serializedList = list.serialize()
    const transformed = await transform.collection(serializedList.data, TaskTransformer)
    const serialized = JSONSerializerHelper.serialize(Task.table, serializedList.meta, transformed)

    return response.json(serialized)
  }

  // @ts-ignore
  public async show({ params, request, response, transform }: HttpContextContract) {
    await request.validate(ViewTaskRequest)

    const data = await this.taskRepo.getById(params.id)
    const transformed = await transform.item(data, TaskTransformer)
    const serialized = JSONSerializerHelper.serialize(Task.table, null, transformed)

    return response.json(serialized)
  }

  // @ts-ignore
  public async store({ auth, request, response, transform }: HttpContextContract) {
    await request.validate(CreateTaskRequest)

    const userAuthData = auth.use('api').user!
    let payload = request.only(['name', 'description', 'status', 'priority'])
    payload['owner_id'] = userAuthData.uuid

    const created = await this.taskRepo.add(payload)

    const data = await this.taskRepo.getById(created.uuid)
    const transformed = await transform.item(data, TaskTransformer)
    const serialized = JSONSerializerHelper.serialize(Task.table, null, transformed)

    return response.created(serialized)
  }

  // @ts-ignore
  public async update({ params, request, response, transform }: HttpContextContract) {
    await request.validate(UpdateTaskRequest)

    const taskId = params.id
    const currentTimestamp = DateFormatterHelper.getCurrentTimestamp()

    let payload = request.only(['name', 'description', 'is_favorite', 'status', 'priority'])
    payload['updated_at'] = currentTimestamp
    await this.taskRepo.update(taskId, payload)

    const data = await this.taskRepo.getById(taskId)
    const transformed = await transform.item(data, TaskTransformer)
    const serialized = JSONSerializerHelper.serialize(Task.table, null, transformed)

    return response.json(serialized)
  }

  public async destroy({ params, request, response }: HttpContextContract) {
    await request.validate(DeleteTaskRequest)

    const taskId = params.id
    await this.taskRepo.delete(taskId)

    return response.status(204).json(null)
  }
}
