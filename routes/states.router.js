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

router.get('/:states_id', 
    async (req, res, next) => {
        try {
            const { states_id } = req.params
            const data = await states.findOne(states_id)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.post('/',
    async (req, res, next) => {
        try {
            const data = req.body
            const response = await states.create(data)
            res.json(response)
        } catch (err) {
            next(err)
        }
    }
)

module.exports = router