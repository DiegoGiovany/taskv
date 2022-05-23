'use strict';


const projects = {
  id: String,
  user_id: String,
  name: String,
};


module.exports = global['mongoose'].model('projects', projects);