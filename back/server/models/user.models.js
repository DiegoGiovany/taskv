'use strict';


const users = {
  id: String,
  name: String,
  email: String,
  password: String,
};


module.exports = global['mongoose'].model('users', users);