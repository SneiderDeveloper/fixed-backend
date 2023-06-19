const { Sequelize } = require('sequelize')
const createSubscriber = require('pg-listen')

const config = require('../config/config')
const setupModels = require('./../db/models')

const USER = encodeURIComponent(config.user)
const PASSWORD = encodeURIComponent(config.password)
const URI = `postgres://${USER}:${PASSWORD}@${config.host}:${config.port}/${config.database}`

const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: false
})

const subscriber = createSubscriber({ connectionString: URI })

async function connect () {
  await subscriber.connect()
  await subscriber.listenTo("requests")
}

connect()

setupModels(sequelize)

// sequelize.sync()

module.exports = { sequelize, subscriber, connect }