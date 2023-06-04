const express = require('express')
const passport = require('passport')
const AddressService = require('../services/address.service')
const validatorHandler = require('../middleware/validator.handler')
const { createAddressSchema, updateAddressSchema } = require('../schemas/address.schema')

const router = express.Router()
const address = new AddressService

router.get('/',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const data = await address.read()
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
            const data = await address.findOne(id)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.get('/findByUserId/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const data = await address.findByUserId(id)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.get('/activateAddress/:user_id/:address_id',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const { user_id, address_id } = req.params
            const data = await address.activateAddress(user_id, address_id)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.get('/findByActiveAddress/:user_id',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const { user_id } = req.params
            const data = await address.findByActiveAddress(user_id)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.post('/',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(createAddressSchema, 'body'),
    async (req, res, next) => {
        try {
            const { body } = req
            const data = await address.create(body)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(updateAddressSchema, 'body'),
    async (req, res, next) => {
        try {
            const { params: { id }, body } = req
            const data = await address.update(id, body)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const data = await address.delete(id)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

module.exports = router