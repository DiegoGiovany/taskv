'use strict';
const jwt = require('jsonwebtoken');
const io = require('socket.io')();
const projectController = require('../../controllers/project.controllers');
const taskController = require('../../controllers/task.controllers');
const idUsers = {}
io.on('connection', (socket) => {

    const connectedClients = () => clients.length;

    socket.on('joinToken', (token) => {
        jwt.verify(token.token, process.env.JWT_SECRET_KEY || 'NotSoSecretKey', function (err, decoded) {
            idUsers[socket.id] = decoded._id
            socket.join(decoded._id)
        })
    })

    socket.on('addTask', (task) => {
        taskController.addTask(socket, task.name, task.project_id)
    })
    socket.on('deleteTask', (task) => {
        taskController.deleteTask(socket, task)
    })
        socket.on('deleteProject', (project) => {
        projectController.deleteProject(socket, project)
    })
    socket.on('setTaskStatus', (data) => {
        taskController.setTaskStatus(socket, data._id, data.status)
    })
    socket.on('addProject', (project) => {
        projectController.addProject(socket, project, idUsers[socket.id])
    })
    socket.on('getAllProjects', () => {
        projectController.getAllProjects(socket, idUsers[socket.id])
    })
    socket.on('getAllTasks', (data) => {
        taskController.getAllTasks(socket, data.project_id)
    })

    socket.on('disconnect', () => {
        idUsers[socket.id] = undefined
    });

});

module.exports = io;