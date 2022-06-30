const {Tasks} = require('../models/task.model')

const {AppError} = require('../utils/appError.util')
const {catchAsync} = require('../utils/catchAsync.util')

const taskExist = catchAsync(async (req, res, next) => {
    const {id} = req.params

    const task = await Tasks.findOne({ where: {
        id,
        status: 'active'
    } })

	if (task === null){
		return next(new AppError('Tasks not found', 404))
	}

    req.task = task

    next()
})

module.exports = {taskExist}