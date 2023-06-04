const Joi = require('joi')

const fixThis = Joi.string()

const createFeedbackSchema = Joi.object({
    fixThis: fixThis.required(),
})

module.exports = { createFeedbackSchema }