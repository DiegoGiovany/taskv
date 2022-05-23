'use strict';


const tasks = {
  id: String,
  project_id: String,
  name: String,
  status: String,
};


module.exports = global['mongoose'].model('tasks', tasks);