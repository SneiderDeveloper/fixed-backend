const Joi = require('joi')

const idFront = Joi.string()
const idBack = Joi.string()
const usersId = Joi.number().integer()

const createDocumentSchema = Joi.object({
    idFront: idFront.required(),
    idBack: idBack.required(),
    usersId: usersId.required()
})

const updateDocumentSchema = Joi.object({
    idFront: idFront.optional(),
    idBack: idBack.optional()
})

module.exports = { createDocumentSchema, updateDocumentSchema }