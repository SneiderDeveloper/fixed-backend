const express = require('express')
const LocationService = require('../services/locations.service')
const { createLocationSchema, updateLocationSchema } = require('../schemas/locations.schema')
const validatorHandler = require('../middleware/validator.handler')

const router = express.Router() 
const location = new LocationService()

router.get('/', 
    async (req, res, next) => {
        try {
            const reponse = await location.read()
            res.json(reponse)
        } catch (err) {
            next(err)
        }
    }
)

router.get('/:location_id', 
    async (req, res, next) => {
        try {
            const { location_id } = req.params
            const reponse = await location.findOne(location_id)
            res.json(reponse)
        } catch (err) {
            next(err)
        }
    }
)

router.post('/',
    validatorHandler(createLocationSchema, 'body'),
    async (req, res, next) => {
        try {
            const { body } = req
            const reponse = await location.create(body)
            res.json(reponse)
        } catch (err) {
            next(err)
        }
    }
)

module.exports = router