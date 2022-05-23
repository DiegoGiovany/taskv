'use strict';

const userController = require('../../controllers/user.controllers');

module.exports = (Router) => {
  const router = Router();

  router.route('/user/login')
    .post(userController.postLogin);  

 router.route('/user/subscribe')
    .post(userController.postSubscribe);  

  return router;
};

