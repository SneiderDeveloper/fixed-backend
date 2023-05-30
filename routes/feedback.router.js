const express = require('express')
const Feedback = require('../services/feedback.service')
const validatorHandler = require('../middleware/validator.handler')
const { createFeedbackSchema } = require('../schemas/feedback.schema')

const router = express.Router()
const feedback = new Feedback()

router.post('/',
    validatorHandler(createFeedbackSchema, 'body'),
    async (req, res, next) => {
        try {
            const { body } = req
            const response = await feedback.create(body)
            res.json(response)
        } catch (err) {
            next(err)
        }
    }
)

module.exports = router