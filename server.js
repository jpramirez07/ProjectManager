const {App} = require('./app')

//Models
const {Users} = require('./models/user.model')
const {Tasks} = require('./models/task.model')

// Utils
const {db} = require('./utils/database.util')

db.authenticate()
    .then(() => console.log("Db authenticated"))
    .catch(err => console.log(err))

//Establish model's relations
// 1 user --> M Task
Users.hasMany(Tasks, {foreignKey: 'userId'})
Tasks.belongsTo(Users)

db.sync()
    .then(() => console.log("Db synced"))
    .catch(err => console.log(err))

App.listen(3000, () => {
    console.log('express app running!')
})