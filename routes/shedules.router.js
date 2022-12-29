const express = require('express')
const passport = require('passport')
const ScheduleService = require('../services/schedule.service')
const validatorHandler = require('../middleware/validator.handler')
const { 
    createScheduleSchema, 
    updateScheduleSchema 
} = require('../schemas/schedule.schema')

const router = express.Router()
const schedule = new ScheduleService()

router.get('/',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const data = await schedule.read()
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.get('/:id', 
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const data = await schedule.findByUserId(id)
            res.json(data)
        } catch (err) {
            next(err)
        }
    }
)

router.post('/',
    passport.authenticate('jwt', { session: false }),
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
    passport.authenticate('jwt', { session: false }),
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
    passport.authenticate('jwt', { session: false }),
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