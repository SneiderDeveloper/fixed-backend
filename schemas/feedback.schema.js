const Joi = require('joi')

const fixThis = Joi.string()
const date = Joi.date()

const createFeedbackSchema = Joi.object({
    fixThis: fixThis.required(),
    date: date.required()
})

module.exports = { createFeedbackSchema }