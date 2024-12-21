const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Item = db.define('Item', {
    name : {
        type: DataTypes.STRING,
       
        allowNull: false
    },
    price : {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    
})

module.exports = Item