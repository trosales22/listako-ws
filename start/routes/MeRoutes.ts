import Route from '@ioc:Adonis/Core/Route'
import AuthController from 'App/Controllers/AuthController'
import TaskController from 'App/Controllers/TaskController'

export const MeRoutes = () => {
  Route.group(() => {
    Route.put('change_password', async (ctx) => {return new AuthController().changePassword(ctx)})
    Route.get('my_profile', async (ctx) => { return new AuthController().myProfile(ctx)})
    Route.put('my_profile', async (ctx) => { return new AuthController().updateProfile(ctx)})

    Route.group(() => {
      Route.get('/', async (ctx) => { return new TaskController().index(ctx) })
      Route.get('/:id', async (ctx) => { return new TaskController().show(ctx) })
      Route.post('/', async (ctx) => { return new TaskController().store(ctx) })
      Route.put('/:id', async (ctx) => { return new TaskController().update(ctx) })
      Route.delete('/:id', async (ctx) => { return new TaskController().destroy(ctx) })
    }).prefix('tasks')
  }).prefix('me').middleware('auth:api')
}
