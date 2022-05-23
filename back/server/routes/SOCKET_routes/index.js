'use strict';
const jwt = require('jsonwebtoken');
const io = require('socket.io')();
const projectController = require('../../controllers/project.controllers');
const taskController = require('../../controllers/task.controllers');
// const eventHandlers = require('./eventHandlers');
const idUsers={}
io.on('connection', (socket) => {
    // let clients = eventHandlers.addToDB(socket.id);
    const connectedClients = () => clients.length;

    socket.on('joinToken', (token) => {
      jwt.verify(token.token, process.env.JWT_SECRET_KEY || 'NotSoSecretKey', function(err, decoded) {
        idUsers[socket.id]=decoded._id
        socket.join(decoded._id)
      })
    })

    socket.on('addTask', (task) => {
      console.log(task)
      taskController.addTask(socket, task.name, task.project_id)
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
       idUsers[socket.id]=undefined
    });

});

module.exports = io;