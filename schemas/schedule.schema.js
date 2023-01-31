const Joi = require('joi')

const workdays = Joi.string().max(15).allow(null, '')
const everyday = Joi.boolean()
const weekday = Joi.boolean()
const weekends = Joi.boolean()
const from = Joi.date()
const to = Joi.date()
const usersId = Joi.number().integer()

const createScheduleSchema = Joi.object({
    everyday: everyday.optional(),
    weekday: weekday.optional(),
    weekends: weekends.optional(),
    from: from.required(),
    to: to.required(),
    usersId: usersId.required()
})

const updateScheduleSchema = Joi.object({
    everyday: everyday.optional(),
    weekday: weekday.optional(),
    weekends: weekends.optional(),
    from: from.optional(),
    to: to.optional(),
})

module.exports = { 
    createScheduleSchema,
    updateScheduleSchema,
}