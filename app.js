const express = require('express')

// Routers
const { usersRouter } = require('./routes/users.routes.js')
const { tasksRouter } = require('./routes/tasks.routes')

const {globalErrorHandler} = require('./controlles/error.controller')

const {AppError} = require('./utils/appError.util')
//Init express app
const App = express()

App.use(express.json())

//definir enpoints async / away

App.use('/api/v1/users', usersRouter)

App.use('/api/v1/tasks', tasksRouter)

App.all('*', (req, res, next) => {
    next(new AppError(`${req.method} ${req.originalUrl} not found in this server`, 404 ))
})

App.use(globalErrorHandler)

module.exports = { App }