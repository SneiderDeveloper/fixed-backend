const Joi = require('joi')

const userId = Joi.string().uuid()
const names = Joi.string()
const lastNames = Joi.string()
const email = Joi.string().email()
const phoneNumber = Joi.number().integer().positive().min(10)
const isActive = Joi.boolean()
const isApproved = Joi.boolean()
const isTechnical = Joi.boolean()
const isVerified = Joi.boolean()
const password = Joi.string().max(80)
const avatar = Joi.string().allow(null, '')

const createUserSchema = Joi.object({
    names: names.required(),
    lastNames: lastNames.required(),
    email: email.optional(),
    isTechnical: isTechnical.required(),
    phoneNumber: phoneNumber.required(),
})

const updateUserSchema = Joi.object({
    names: names.optional(),
    lastNames: lastNames.optional(),
    email: email.optional(),
    isActive: isActive.optional(),
    isApproved: isApproved.optional(),
    isTechnical: isTechnical.optional(),
    isVerified: isVerified.optional(),
    password: password.optional(),
    avatar: avatar.optional(),
})

const getUserSchema = Joi.object({
    user_id: userId.required()
})

module.exports = {
    createUserSchema,
    updateUserSchema,
    getUserSchema
}
