const express = require('express')
const users = require('./users.router')
const states = require('./states.router')

function routerApi(app) {
    const router = express.Router()

    app.use('/api/v1', router)
    router.use('/users', users)
    router.use('/states', states)
}

module.exports = routerApi