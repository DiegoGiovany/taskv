'use strict';
const jwt = require('jsonwebtoken');
const Task = require('../models/task.models');

exports.addTask = async (socket, taskobj, projectID) => {
    const createdTask = (new Task({
        name: taskobj,
        status: 'Not Done',
        project_id: projectID,
        create_at: new Date().toISOString()
    }))
    createdTask.save();
    socket.emit('taskAdded', createdTask)
    return
}
exports.getAllTasks = async (socket, projectID) => {
    const findTasks = await Task.find({
        project_id: projectID
    });
    console.log('alltasks', projectID, findTasks)
    socket.emit('taskLoad', findTasks)
    return
}