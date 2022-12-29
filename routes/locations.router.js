const express = require('express')
const passport = require('passport')
const LocationService = require('../services/locations.service')
const { 
    createLocationSchema, 
    updateLocationSchema, 
    getLocationSchema 
} = require('../schemas/locations.schema')
const validatorHandler = require('../middleware/validator.handler')

const router = express.Router() 
const location = new LocationService()

router.get('/',
    passport.authenticate('jwt', { session: false }),
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
    passport.authenticate('jwt', { session: false }),
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
    passport.authenticate('jwt', { session: false }),
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

router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(getLocationSchema, 'params'),
    validatorHandler(updateLocationSchema, 'body'),
    async (req, res, next) => {
        try {
            const { body, params: { id } } = req
            const reponse = await location.update(id, body)
            res.json(reponse)
        } catch (err) {
            next(err)
        }
    }
)

module.exports = router