'use strict';


const tasks = {
  id: String,
  project_id: String,
  name: String,
  status: String,
  create_at: String,
  done_at: String
};


module.exports = global['mongoose'].model('tasks', tasks);