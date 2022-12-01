const express = require('express')
const AddressService = require('../services/address.service')
const validatorHandler = require('../middleware/validator.handler')
const { createAddressSchema, updateAddressSchema } = require('../schemas/address.schema')

const router = express.Router()
const address = new AddressService

router.get('/',
    async (req, res, next) => {
        try {
            const data = await address.read()
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.get('/:address_id',
    async (req, res, next) => {
        try {
            const { address_id } = req.params
            const data = await address.findOne(address_id)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.get('/findByUserId/:user_id',
    async (req, res, next) => {
        try {
            const { user_id } = req.params
            const data = await address.findByUserId(user_id)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.get('/activateAddress/:user_id/:address_id',
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

router.post('/',
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

router.patch('/:address_id',
    validatorHandler(updateAddressSchema, 'body'),
    async (req, res, next) => {
        try {
            const { params: { address_id }, body } = req
            const data = await address.update(address_id, body)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.delete('/:address_id',
    async (req, res, next) => {
        try {
            const { address_id } = req.params
            const data = await address.delete(address_id)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

module.exports = router