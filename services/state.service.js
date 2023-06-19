const { sequelize: { models } } = require('../libs/sequelize')
const boom = require('@hapi/boom')

class StateService {
    constructor() {
    }

    async findOne(id) {
        try {
            const states = await models.State.findByPk(id, { include: ['city'] })
            if (!states) throw boom.notFound('State not found')
            return states
        } catch (err) {
            throw boom.badRequest(err)
        }
    }

    async read() {
        try {
            const states = await models.State.findAll()
            return states
        } catch (err) {
            throw boom.badRequest(err)
        }
    }

    async readCityByState(id) {
        try {
            const query = `
                SELECT city_name as "cityName", cities.id, we_are_here as "weAreHere" 
                FROM states
                    INNER JOIN cities ON cities.states_id = states.id
                    WHERE states.id = ${id};
            `
            const [response] = await models.State.sequelize.query(query)
            return response
        } catch (err) {
            throw boom.badRequest(err)
        }
    }

    async create(data) {
        try {
            // const client = await getConnection()
            // const result = data.map(async (item) => {
            //     const response = await client.query(`
            //         INSERT INTO cities(
            //             name, we_are_here, states_id)
            //             VALUES ('${item}', FALSE, 34)
            //     `)
            //     return response.rows
            // })
            // return result
        } catch (err) {
            throw boom.badRequest(err)
        }
    }
}

module.exports = StateService