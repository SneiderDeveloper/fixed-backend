const { Sequelize } = require('sequelize')

const config = require('../config/config')
const setupModels = require('./../db/models')

const USER = encodeURIComponent(config.user)
const PASSWORD = encodeURIComponent(config.password)
const URI = `postgres://${USER}:${PASSWORD}@${config.host}:${config.port}/${config.database}`

const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: true
})

setupModels(sequelize)

// sequelize.sync()

module.exports = sequelize