const express = require('express')
const passport = require('passport')
const RequestService = require('../services/request.service')
const validatorHandler = require('../middleware/validator.handler')
const { createRequestSchema } = require('../schemas/request.schema')

const request = new RequestService()

const router = express.Router()

router.get('/',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const data = await request.read()
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.get('/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const data = await request.findOne(id)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.post('/',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(createRequestSchema, 'body'),
    async (req, res, next) => {
        try {
            const { body } = req
            const response = await request.create(body)
            res.json(response)
        } catch (err) {
            next(err)
        }
    }
)

router.patch('/:request_id',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const { params: { request_id }, body } = req
            const response = await request.update(request_id, body)
            res.json(response)
        } catch (err) {
            next(err)
        }
    }
)

router.delete('/:request_id',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const { request_id } = req.params
            const response = await request.delete(request_id)
            res.json(response)
        } catch (err) {
            next(err)
        }
    }
)

module.exports = router