const express = require('express')
const ScheduleService = require('../services/schedule.service')
const validatorHandler = require('../middleware/validator.handler')
const { 
    createScheduleSchema, 
    updateScheduleSchema 
} = require('../schemas/schedule.schema')

const router = express.Router()
const schedule = new ScheduleService()

router.get('/', 
    async (req, res, next) => {
        try {
            const data = await schedule.read()
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.post('/',
    validatorHandler(createScheduleSchema, 'body'),
    async (req, res, next) => {
        try {
            const { body } = req
            const data = await schedule.create(body)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.patch('/:schedule_id',
    validatorHandler(updateScheduleSchema, 'body'),
    async (req, res, next) => {
        try {
            const { params: { schedule_id }, body } = req
            const data = await schedule.update(schedule_id, body)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.delete('/:schedule_id', 
    async (req, res, next) => {
        try {
            const { schedule_id } = req.params
            const data = await schedule.delete(schedule_id)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

module.exports = router