const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('Ilook', 'root' ,'Joao2##4', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('conectou ao banco')
} catch (error) {
    console.log('Erro ao conectar ao banco' + error)
}
module.exports = sequelize