const express = require('express');

//Controllers
const {getAllTasks, createTasks, getTasksByStatus, updateTasks, deleteTasks} = require('../controlles/tasks.controlers')

//middlewares
const {createTaskValidator} = require('../middlewares/validators.middleware')
const {taskExist} = require('../middlewares/tasks.middleware')

const tasksRouter = express.Router();

tasksRouter.get('/', getAllTasks);

tasksRouter.post('/', createTaskValidator, createTasks);

tasksRouter.get('/:status', getTasksByStatus);

tasksRouter.patch('/:id', taskExist,updateTasks);

tasksRouter.delete('/:id', taskExist,deleteTasks);

module.exports = { tasksRouter };