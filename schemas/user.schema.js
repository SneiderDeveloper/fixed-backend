const Joi = require('joi')

const user_id = Joi.string().uuid()
const first_name = Joi.string()
const last_name = Joi.string()
const email = Joi.string().email()
const phone_number = Joi.number().integer().positive().min(10)
const country = Joi.string()
const state = Joi.string()
const city = Joi.string()
const is_active = Joi.boolean()
const is_approved = Joi.boolean()
const is_technical = Joi.boolean()
const password = Joi.string().max(80)
const identity = Joi.array()
const babge = Joi.object()

const createUserSchema = Joi.object({
    first_name: first_name.required(),
    last_name: last_name.required(),
    email: email.optional(),
    phone_number: phone_number.required(),
    country: country.required(),
    state: state.required(),
    city: city.required(),
    is_active: is_active.required(),
    is_approved: is_approved.required(),
    is_technical: is_technical.required(),
    password: password.optional(),
    identity: identity.optional()
})

const updateUserSchema = Joi.object({
    first_name: first_name,
    last_name: last_name,
    email: email,
    phone_number: phone_number,
    country: country,
    state: state,
    city: city,
    is_active: is_active,
    is_approved: is_approved,
    is_technical: is_technical,
    password: password
})

const getUserSchema = Joi.object({
    user_id: user_id.required()
})

module.exports = {
    createUserSchema,
    updateUserSchema,
    getUserSchema
}
