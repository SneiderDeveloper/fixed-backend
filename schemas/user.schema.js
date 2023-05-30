const Joi = require('joi')

const id = Joi.number().integer()
const names = Joi.string()
const lastNames = Joi.string()
const email = Joi.string().email()
const phoneNumber = Joi.number().integer().positive().min(10)
const isActive = Joi.boolean()
const isApproved = Joi.boolean()
const isTechnical = Joi.boolean()
const isVerified = Joi.boolean()
const password = Joi.string().max(255).allow(null, '')
const avatar = Joi.string().allow(null, '')
const isCompany = Joi.boolean()
const isShop = Joi.boolean()

const createUserSchema = Joi.object({
    names: names.required(),
    lastNames: lastNames.required(),
    email: email.optional(),
    password: password.optional(),
    isTechnical: isTechnical.required(),
    phoneNumber: phoneNumber.required(),
    isCompany: isCompany.optional(),
    isShop: isShop.required(),
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
    isCompany: isCompany.optional(),
    isShop: isShop.optional(),
})

const getUserSchema = Joi.object({
    id: id.required()
})

module.exports = {
    createUserSchema,
    updateUserSchema,
    getUserSchema
}
