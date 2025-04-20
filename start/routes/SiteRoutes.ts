import Route from '@ioc:Adonis/Core/Route'
import AuthController from 'App/Controllers/AuthController'
import { MeRoutes } from './MeRoutes'

export const SiteRoutes = () => [
  Route.group(() => {
    Route.post('login', async (ctx) => {return new AuthController().login(ctx)})
    Route.post('logout', async (ctx) => {return new AuthController().logout(ctx)}).middleware('auth:api')
    Route.post('register_user', async (ctx) => { return new AuthController().store(ctx) })

    MeRoutes()
  }).prefix('site')
]
