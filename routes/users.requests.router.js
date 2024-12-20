const express = require('express')
const passport = require('passport')
const UsersRequests = require('../services/users.requests.service')
const validatorHandler = require('../middleware/validator.handler')
const { createUsersRequestsSchema, updateUsersRequestsSchema } = require('../schemas/users.requests.schema')

const router = express.Router()
const usersRequests = new UsersRequests

router.get('/:user_id',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const { user_id } = req.params
            const data = await usersRequests.read(user_id)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.post('/',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(createUsersRequestsSchema, 'body'),
    async (req, res, next) => {
        try {
            const { body } = req
            const data = await usersRequests.create(body)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.patch('/:users_requests_id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(updateUsersRequestsSchema, 'body'),
    async (req, res, next) => {
        try {
            const { params: { users_requests_id }, body } = req
            const data = await usersRequests.update(users_requests_id, body)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

module.exports = router