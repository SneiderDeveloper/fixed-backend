const Joi = require('joi')

const crux = Joi.string().max(255)
const technician_observation = Joi.string().max(255)
const isCanceled = Joi.boolean()
const isRejected = Joi.boolean()
const isOpen = Joi.boolean()
const atHome = Joi.boolean()
const atBusiness = Joi.boolean()
const atRemote = Joi.boolean()
const missionCompletedDate = Joi.date()
const request_date = Joi.date()
const dateOfVisit = Joi.date()
const status = Joi.number()
const service_value = Joi.number()
const locationsId = Joi.number()

const createRequestSchema = Joi.object({
    crux: crux.required(),
    atHome: atHome.optional(),
    atBusiness: atBusiness.optional(),
    atRemote: atRemote.optional(),
    dateOfVisit: dateOfVisit.required(),
    locationsId: locationsId.required()
})

const updateRequestSchema = Joi.object({
    crux: crux.optional(),
    technician_observation: technician_observation.optional(),
    isCanceled: isCanceled.optional(),
    isRejected: isRejected.optional(),
    isOpen: isOpen.optional(),
    atHome: atHome.optional(),
    atBusiness: atBusiness.optional(),
    atRemote: atRemote.optional(),
    missionCompletedDate: missionCompletedDate.optional(),
    dateOfVisit: dateOfVisit.optional(),
    locationsId: locationsId.optional()
})

module.exports = {
    createRequestSchema,
    updateRequestSchema
}