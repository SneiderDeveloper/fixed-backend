const express = require('express')
const passport = require('passport')
const DocumentService = require('../services/document.service')
const validatorHandler = require('../middleware/validator.handler')
const { createDocumentSchema, updateDocumentSchema } = require('../schemas/document.schema')

const router = express.Router()
const document = new DocumentService()

router.get('/',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const data = await document.read()
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.post('/',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(createDocumentSchema, 'body'),
    async (req, res, next) => {
        try {
            const { body } = req
            const data = await document.create(body)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(updateDocumentSchema, 'body'),
    async (req, res, next) => {
        try {
            const { params: { id }, body } = req
            const data = await document.update(id, body)
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
            const { params: { id } } = req
            const data = await document.delete(id)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

module.exports = router