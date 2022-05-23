'use strict';
const jwt = require('jsonwebtoken');
const Project = require('../models/project.models');
const Task = require('../models/task.models');

exports.addProject = async (socket,project,userId) => {
    const createdProject=(new Project({name: project, user_id: userId}))
    createdProject.save();
    socket.emit('projectAdded',createdProject)
    return
}
exports.getAllProjects = async (socket,userId) => {
   const findProjects = await Project.find({ user_id: userId });
    socket.emit('projectLoad',findProjects)
    return
}

exports.deleteProject = async (socket, projectId ) => {
   await Project.deleteOne({ _id: projectId })
   await Task.deleteMany({ project_id: projectId })
   socket.emit('deleteProject', projectId)
   return
}

