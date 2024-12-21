const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const User = db.define('User', {
    email : {
        type: DataTypes.STRING,
        
    },
    password : {
        type: DataTypes.STRING,
        
    },
})

module.exports = User