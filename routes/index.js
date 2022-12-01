const express = require('express')
const users = require('./users.router')
const states = require('./states.router')
const request = require('./requests.router')
const administrator = require('./administrators.router')
const document = require('./documents.router')
const addresses = require('./addresses.router')
const schedules = require('./shedules.router')
const usersRequests = require('./users.requests.router')
const locations = require('./locations.router')

function routerApi(app) {
    const router = express.Router()

    app.use('/api/v1', router)
    router.use('/users', users)
    router.use('/states', states)
    router.use('/requests', request)
    router.use('/admin', administrator)
    router.use('/document', document)
    router.use('/addresses', addresses)
    router.use('/schedule', schedules)
    router.use('/users-requests', usersRequests)
    router.use('/locations', locations)
}

module.exports = routerApi