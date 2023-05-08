import * as newsControllers from '../../controllers/v1/news-controllers.mjs'

const routes = (app, opts, done) => {
  app.delete('/story/:id', { preHandler: app.auth([app.verifyJWT]) }, newsControllers.purgeStory)
  app.get('/', newsControllers.readPublishedStories)
  // app.get('/all', { preHandler: app.auth([app.verifyJWT]) }, linkControllers.readAllLinks)
  // app.get('/all/:id', { preHandler: app.auth([app.verifyJWT]) }, linkControllers.readLinkByIdAll)
  app.patch('/story/:id', { preHandler: app.auth([app.verifyJWT]) }, newsControllers.reviseStory)
  app.post('/story', { preHandler: app.auth([app.verifyJWT]) }, newsControllers.addStory)
  done()
}

export { routes }