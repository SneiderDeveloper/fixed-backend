const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class LocationService {
    constructor() {

    }

    async findOne(id) {
        const location = await models.Location.findByPk(id, {
            include: ['request', 'city']
        })
        if (!location) throw boom.notFound('Location not found')
        return location
    }

    async read() {
        try {
            const locations = await models.Location.findAll()
            return locations
        } catch (err) {
            throw boom.internal(err)
        }
    }

    async create(data) {
        try {
            const location = await models.Location.create(data)
            return location
        } catch (err) {
            throw boom.internal(err)
        }
    }

    async update(id, newData) {
        try {
            const location = await this.findOne(id)
            const response = await location.update(newData)
            return response
        } catch (err) {
            throw boom.internal(err)
        }
    }
}

module.exports = LocationService