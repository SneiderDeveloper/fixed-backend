const Joi = require('joi')

const names = Joi.string()
const lastNames = Joi.string()
const email = Joi.string()
const isActive = Joi.boolean()
const level = Joi.number().integer()
const phoneNumber = Joi.number().integer()
const password = Joi.string()
const avatar = Joi.string()
const address = Joi.string()
const citiesId = Joi.number().integer()

const createAdministratorSchema = Joi.object({
    names: names.required(),
    lastNames: lastNames.required(),
    email: email.required(),
    phoneNumber: phoneNumber.required(),
    password: password.required(),
    level: level.required(),
    citiesId: citiesId.required(),
})

const updateAdministratorSchema = Joi.object({
    names: names.optional(),
    lastNames: lastNames.optional(),
    email: email.optional(),
    isActive: isActive.optional(),
    level: level.optional(),
    phoneNumber: phoneNumber.optional(),
    password: password.optional(),
    avatar: avatar.optional(),
    address: address.optional(),
    citiesId: citiesId.required(),
})

module.exports = {
    createAdministratorSchema,
    updateAdministratorSchema,
}
