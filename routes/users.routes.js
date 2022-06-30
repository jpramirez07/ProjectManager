const express = require('express');

//Controllers
const {getAllusers, createUsers, updateUser, deleteUser} = require('../controlles/users.controles')

//middlewares
const {createUserValidators} = require('../middlewares/validators.middleware')
const {userExist} = require('../middlewares/users.middleware')

const usersRouter = express.Router();

usersRouter.get('/', getAllusers);

usersRouter.post('/', createUserValidators, createUsers);

usersRouter.patch('/:id', userExist, updateUser);

usersRouter.delete('/:id', userExist, deleteUser);

module.exports = { usersRouter };