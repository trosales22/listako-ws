import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import GeneralConstants from 'App/Constants/GeneralConstants'
import DateFormatterHelper from 'App/Helpers/DateFormatterHelper'

export default class TaskTransformer extends TransformerAbstract {
  public async transform(model: any) {
    const status = model.status
    const priority = model.priority
    const owner = model.owner
    let ownerArr: any = null

    if(owner){
      ownerArr = {
        id: owner.uuid,
        email: owner.email,
        firstname: owner.firstname,
        lastname: owner.lastname,
        photo_url: owner.photo_url
      }
    }

    return {
      id: model.uuid,
      name: model.name,
      description: model.description,
      is_favorite: model.is_favorite,
      status: {
        code: status,
        label: GeneralConstants.TASK_STATUS_LABELS[status] ?? status
      },
      priority: {
        code: priority,
        label: GeneralConstants.TASK_PRIORITY_LABELS[priority] ?? priority
      },
      owner: ownerArr,
      completed_at: DateFormatterHelper.formatDate(model.completed_at),
      created_at: DateFormatterHelper.formatDate(model.created_at),
      updated_at: DateFormatterHelper.formatDate(model.updated_at)
    }
  }
}
