const express = require('express')
const DocumentService = require('../services/document.service')
const validatorHandler = require('../middleware/validator.handler')
const { createDocumentSchema, updateDocumentSchema } = require('../schemas/document.schema')

const router = express.Router()
const document = new DocumentService()

router.get('/',
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

router.patch('/:document_id',
    validatorHandler(updateDocumentSchema, 'body'),
    async (req, res, next) => {
        try {
            const { params: { document_id }, body } = req
            const data = await document.update(document_id, body)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.delete('/:document_id',
    async (req, res, next) => {
        try {
            const { params: { document_id } } = req
            const data = await document.delete(document_id)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

module.exports = router