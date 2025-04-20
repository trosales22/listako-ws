import CreateException from "App/Exceptions/CreateException";
import NotFoundException from "App/Exceptions/NotFoundException";
import DeleteException from "App/Exceptions/DeleteException";
import UpdateException from "App/Exceptions/UpdateException";
import Task from "App/Models/Task";

export default class TaskRepository {
  constructor() {}

  async add(data){
    return await Task.create(data).then(
      (created) => {
        return created.serialize()
      },
      (err) => {
        throw new CreateException('task', err.message)
      }
    )
  }

  async update(uuid: string, dataToBeAdded) {
    return await Task.query().update(dataToBeAdded).where('uuid', uuid).then(
      (response) => {
        return response
      },
      (error) => {
        throw new UpdateException('task', error.message)
      }
    )
  }

  async getAll(filters: any) {
    let {
      q,
      owner_id: ownerId,
      status,
      priority,
      sort_by: sortBy = 'id',
      sort_direction: sortDirection = 'desc',
      page,
      limit
    } = filters

    let queryModel = Task.query().preload('owner')

    if(q){
      queryModel.where('name', 'LIKE', '%' + q + '%')
    }

    if(ownerId){
      queryModel.where('owner_id', ownerId)
    }

    if(status){
      queryModel.where('status', status)
    }

    if(priority){
      queryModel.where('priority', priority)
    }

    return await queryModel
      .orderBy(sortBy, sortDirection)
      .paginate(page, limit)
  }

  async getById(uuid: string) {
    return Task.query().preload('owner')
      .where('uuid', uuid)
      .firstOrFail()
      .then((res) => {
        return res.serialize()
      }, (err) => {
        throw new NotFoundException('task', err.message)
      }
    )
  }

  async delete(uuid: string) {
    return await Task.query().delete().where('uuid', uuid).then(
      (deleted) => {
        return deleted
      },
      (err) => {
        throw new DeleteException('task', err.message)
      }
    )
  }
}
