import * as linkControllers from '../../controllers/v1/link-controllers.mjs'

const routes = (app, opts, done) => {
  app.get('/', linkControllers.readPublishedLinks)
  app.get('/all', { preHandler: app.auth([app.verifyJWT]) }, linkControllers.readAllLinks)
  app.post('/link', { preHandler: app.auth([app.verifyJWT]) }, linkControllers.addLink)
  done()
}

export { routes }