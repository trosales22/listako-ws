import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import RouteNotFoundException from 'App/Exceptions/RouteNotFoundException'
import { SiteRoutes } from './routes/SiteRoutes'
import { MeRoutes } from './routes/MeRoutes'

//base url handling
Route.get('/', ({ response }) =>
  response.json({
    name: 'ListaKo API',
    environment: Env.get('NODE_ENV'),
    timezone: Env.get('TZ')
  })
)

Route.group(() => {
  SiteRoutes()
  MeRoutes()
}).prefix('api/v1')

//handle unknown routes
Route.any('*', (_) => {
  throw new RouteNotFoundException('Route not found.', 404)
})
