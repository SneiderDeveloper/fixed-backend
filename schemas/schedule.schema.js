const Joi = require('joi')

const workdays = Joi.string().max(15).allow(null, '')
const from = Joi.date()
const to = Joi.date()
const usersId = Joi.number().integer()

const createScheduleSchema = Joi.object({
    workdays: workdays.required(),
    from: from.required(),
    to: to.required(),
    usersId: usersId.required()
})

const updateScheduleSchema = Joi.object({
    workdays: workdays.optional(),
    from: from.optional(),
    to: to.optional(),
})

module.exports = { 
    createScheduleSchema,
    updateScheduleSchema,
}