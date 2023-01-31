const Joi = require('joi')

const idCardFront = Joi.string()
const idCardBack = Joi.string()
const IdCardAndFace = Joi.string()
const usersId = Joi.number().integer()

const createDocumentSchema = Joi.object({
    idCardFront: idCardFront.required(),
    idCardBack: idCardBack.required(),
    IdCardAndFace: IdCardAndFace.required(),
    usersId: usersId.required()
})

const updateDocumentSchema = Joi.object({
    idCardFront: idCardFront.optional(),
    idCardBack: idCardBack.optional(),
    IdCardAndFace: IdCardAndFace.optional()
})

module.exports = { createDocumentSchema, updateDocumentSchema }