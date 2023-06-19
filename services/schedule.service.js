const boom = require('@hapi/boom')
const { sequelize: { models } } = require('../libs/sequelize')

class ScheduleService {
    constructor() {

    }

    async findOne(id) {
        try {
            const schedule = await models.Schedule.findByPk(id)
            if (!schedule) {
                throw boom.notFound('Schedule not found')
            }
            return schedule
        } catch (err) {
            throw boom.internal()
        }
    }

    async findByUserId(id) {
        try {
            const [schedule] = await models.Schedule.sequelize.query(`
                SELECT 
                    schedules.id AS "id",
                    everyday,
                    weekday,
                    weekends,
                    "from",
                    "to"
                FROM schedules
                INNER JOIN users ON users.id = schedules.users_id
                WHERE users_id = ${id}
            `)
            if (!schedule) {
                throw boom.notFound('Schedule not found')
            }
            return schedule[0]
        } catch (err) {
            throw boom.internal()
        }
    }
    
    async read() {
        try {
            const response = await models.Schedule.findAll()
            return response
        } catch (err) {
            throw boom.internal()
        }
    }

    async create(data) {
        try {
            const response = await models.Schedule.create(data)
            return response
        } catch (err) {
            throw boom.internal(err)
        }
    }

    async update(id, newData) {
        try {
            const schedule = await this.findOne(id)
            const response = await schedule.update(newData)
            return response
        } catch (err) {
            throw boom.internal()
        }
    }

    async delete(id) {
        try {
            const schedule = await this.findOne(id)
            const response = await schedule.destroy()
            return { id, response }
        } catch (err) {
            throw boom.internal()
        }
    }
}

module.exports = ScheduleService