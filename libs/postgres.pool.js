const { Pool } = require('pg')

const config = require('../config/config')

const USER = encodeURIComponent(config.user)
const PASSWORD = encodeURIComponent(config.password)
const URI = `postgres://${USER}:${PASSWORD}@${config.host}:${config.port}/${config.database}`

const pool = new Pool ({ connectionString: URI })

module.exports = pool
