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
const contactDate = Joi.date()
const status = Joi.number()
const serviceValue = Joi.number()
const locationsId = Joi.number()
const isPaid = Joi.boolean()
const repairDate = Joi.date()
const deviceDeliveryDate =  Joi.date()
const deliverAtHome = Joi.boolean()
const deliverAtBusiness = Joi.boolean()

const createRequestSchema = Joi.object({
    crux: crux.required(),
    atHome: atHome.optional(),
    atBusiness: atBusiness.optional(),
    atRemote: atRemote.optional(),
    contactDate: contactDate.required(),
    locationsId: locationsId.required(),
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
    status: status.optional(),
    serviceValue: serviceValue.optional(),
    contactDate: contactDate.optional(),
    repairDate: repairDate.optional(),
    deviceDeliveryDate: deviceDeliveryDate.optional(),
    missionCompletedDate: missionCompletedDate.optional(),
    locationsId: locationsId.optional(),
    isPaid: isPaid.optional(),
    deliverAtHome: deliverAtHome.optional(),
    deliverAtBusiness: deliverAtBusiness.optional(),
})

module.exports = {
    createRequestSchema,
    updateRequestSchema
}