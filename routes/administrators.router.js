const express = require('express')
const validatorHandler = require('../middleware/validator.handler')
const { 
    createAdministratorSchema,
    updateAdministratorSchema,
} = require('../schemas/administrator.schema')
const AdminService = require('../services/administrator.service')

const router = express.Router()
const admin = new AdminService()

router.get('/',
    async (req, res, next) => {
        try {
            const data = await admin.read()
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.post('/',
    validatorHandler(createAdministratorSchema, 'body'),
    async (req, res, next) => {
        try {
            const { body } = req
            const data = await admin.create(body)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.patch('/:admin_id',
    validatorHandler(updateAdministratorSchema, 'body'),
    async (req, res, next) => {
        try {
            const { params: { admin_id }, body } = req
            const data = await admin.update(admin_id, body)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.delete('/:admin_id',
    async (req, res, next) => {
        try {
            const { admin_id } = req.params
            const response = await admin.delete(admin_id)
            res.json(response)
        } catch (err) {
            next(err)
        }
    }
)

module.exports = router
