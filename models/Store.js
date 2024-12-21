const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Store = db.define('Store', {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cnpj: {
        type: DataTypes.STRING,
       
    },
    email : {
        type: DataTypes.STRING,
        
    },
    password : {
        type: DataTypes.STRING,
        
    },
})

module.exports = Store