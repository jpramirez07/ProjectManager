const { Tasks } = require('../models/task.model');

const {catchAsync} = require('../utils/catchAsync.util')

const { AppError } = require('../utils/appError.util')

const getAllTasks = catchAsync(async (req, res) => {
		const tasks = await Tasks.findAll();

		res.status(200).json({
			status: 'success',
			tasks
		});
})

const createTasks = catchAsync(async (req, res) => {
		const { title, limitDate, userId } = req.body

		const newTask = await Tasks.create({
			title,
			limitDate,
			userId,
            startDate: new Date()
		})

		res.status(201).json({
			status: 'success',
			newTask
		})
})

const getTasksByStatus = catchAsync(async (req,res) => {
	const {status} = req.params

	const tasks = await Tasks.findAll({ where: {status} })

	if (tasks === null){
		res.status(404).json({
			status: 'error',
			message: 'tasks not found'
		})
	}

	res.status(200).json({
		status: 'success',
		tasks
	})
})

const updateTasks = catchAsync(async (req,res) => {
    const finishDate = new Date()

	const {task} = req

    const inTime = Number(task.limitDate) > Number(finishDate)

	await task.update({
        status: inTime ? 'completed' : 'late',
        finishDate
    })

	res.status(204).json({
		status: 'success'
	})
})

const deleteTasks = catchAsync(async (req,res) => {
	const {task} = req

	// await user.destroy()

	await task.update({status: 'cancelled'})

	res.status(204).json({
		status: 'success'
	})
})

module.exports = {getAllTasks, createTasks, getTasksByStatus, updateTasks, deleteTasks}