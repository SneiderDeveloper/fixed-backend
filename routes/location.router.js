const express = require('express')
const fetch = require('node-fetch')
const position = require('../services/modules/position')
const passport = require('passport')

const router = express.Router()

router.get('/',
    // passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const { latitude, longitude } = await position()
            const APIKEY = process.env.API_KEY_GOOGLE_MAP
            const lat = latitude
            const lng = longitude
            if (lat && lng) {
                const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${APIKEY}`
                const data = await fetch(url)
                const dataLocation = await data.json()
                const state = dataLocation.results[4].address_components[0].long_name
                const city = dataLocation.results[1].address_components[1].long_name
                const location = {
                    state,
                    city
                }
                res.json(location)
            }
        } catch (err) {
            next(err)
        }
    }
)

module.exports = router