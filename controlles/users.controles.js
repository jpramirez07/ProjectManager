const { Users } = require('../models/user.model');
const { Tasks } = require('../models/task.model');

const {catchAsync} = require('../utils/catchAsync.util')

const { AppError } = require('../utils/appError.util')

const getAllusers = catchAsync(async (req, res, next) => {
		const users = await Users.findAll({
            include: Tasks,
			where: {status : 'active'}
        });

		res.status(200).json({
			status: 'success',
			users,
		});
}) 

const createUsers = catchAsync(async (req, res, next) => {
		const { name, email, password  } = req.body

		const newUser = await Users.create({
			name,
			email,
			password
		})

		res.status(201).json({
			status: 'success',
			newUser
		})
}) 

const updateUser = catchAsync(async (req, res, next) => {
	const {name, email} = req.body
	const {user} = req

	await user.update({name, email})

	res.status(204).json({
		status: 'success'
	})
}) 

const deleteUser = catchAsync(async (req, res, next) => {
	const {user} = req

	// await user.destroy()

	await user.update({status: 'disabled'})

	res.status(204).json({
		status: 'success'
	})
}) 

module.exports = {
	getAllusers, 
	createUsers, 
	updateUser, 
	deleteUser
}