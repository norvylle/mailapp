const controller = require('./controller');

module.exports = (router) => {
  router.get('/list', controller.getList)
  router.post('/list', controller.postList)
  router.delete('/list', controller.deleteList)
  router.get('/list-members', controller.getListMembers)
  return router;
}