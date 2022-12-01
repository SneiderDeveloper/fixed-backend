const Joi = require('joi')

const address = Joi.string()
const isActive = Joi.boolean()
const name = Joi.string()
const phoneNumber = Joi.number().integer()
const additionalData = Joi.string().allow(null, '')
const usersId = Joi.number().integer()
const citiesId = Joi.number().integer()

const createAddressSchema = Joi.object({
    address: address.required(),
    name: name.required(),
    phoneNumber: phoneNumber.required(),
    additionalData: additionalData.optional(),
    usersId: usersId.required(),
    citiesId: citiesId.required(),
})

const updateAddressSchema = Joi.object({
    address: address.optional(),
    isActive: isActive.optional(),
    name: name.optional(),
    phoneNumber: phoneNumber.optional(),
    additionalData: additionalData.optional(),
    citiesId: citiesId.optional(),
})

module.exports = { createAddressSchema, updateAddressSchema }