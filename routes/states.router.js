const express = require('express')
const StateService = require('../services/state.service')

const router = express.Router()
const states = new StateService()

router.get('/', 
    async (req, res, next) => {
        try {
            const data = await states.read()
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

module.exports = router