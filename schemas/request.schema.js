const Joi = require('joi')

const crux = Joi.string().max(255)
const technicianObservation = Joi.string().max(255)
const isCanceled = Joi.boolean()
const isRejected = Joi.boolean()
const isOpen = Joi.boolean()
const atHome = Joi.boolean()
const atBusiness = Joi.boolean()
const atRemote = Joi.boolean()
const missionCompletedDate = Joi.date()
const dateOfVisit = Joi.date()
const status = Joi.number()
const serviceValue = Joi.number()
const locationsId = Joi.number()
const isPaid = Joi.boolean()

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
    technicianObservation: technicianObservation.optional(),
    isCanceled: isCanceled.optional(),
    isRejected: isRejected.optional(),
    isOpen: isOpen.optional(),
    atHome: atHome.optional(),
    atBusiness: atBusiness.optional(),
    atRemote: atRemote.optional(),
    missionCompletedDate: missionCompletedDate.optional(),
    status: status.optional(),
    serviceValue: serviceValue.optional(),
    dateOfVisit: dateOfVisit.optional(),
    locationsId: locationsId.optional(),
    isPaid: isPaid.optional()
})

module.exports = {
    createRequestSchema,
    updateRequestSchema
}