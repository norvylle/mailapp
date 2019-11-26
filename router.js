const controller = require('./controller');

module.exports = (router) => {
  router.get('/list', controller.getList)
  router.post('/list', controller.postList)
  router.delete('/list', controller.deleteList)
  
  router.get('/list-members', controller.getListMembers)
  router.post('/list-members', controller.postListMember)
  

  router.post('/campaign', controller.postCampaign)
  return router;
}