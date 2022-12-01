const Joi = require('joi')

const usersId = Joi.number().integer()
const requestId = Joi.number().integer()

const createUsersRequestsSchema = Joi.object({
    usersId: usersId.required(),
    requestId: requestId.required()
})

const updateUsersRequestsSchema = Joi.object({
    usersId: usersId.optional(),
    requestId: requestId.optional()
})

module.exports = { createUsersRequestsSchema, updateUsersRequestsSchema }