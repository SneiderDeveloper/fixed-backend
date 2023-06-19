const boom = require('@hapi/boom')
const { sequelize: { models } } = require('../libs/sequelize')

class RequestService {

    constructor() {
        
    }

    async findOne(id) {
        const request = await models.Request.findByPk(id)
        if (!request) {
            throw boom.notFound('Request not found')
        }
        return request
    }

    async read() {
        try {
            const response = await models.Request.findAll()
            return response
        } catch (err) {
            throw boom.internal(err)
        }
    }

    async create(data) {
        try {
            const response = await models.Request.create(data)
            return response
        } catch (err) {
            throw boom.badRequest(err)
        }
    }

    async update(id, newData) {
        try {
            const request = await this.findOne(id)
            const response = await request.update(newData)
            return response
        } catch (err) {
            throw boom.badRequest(err)
        }
    }

    async delete(id) {
        const resquest = await this.findOne(id)
        await resquest.destroy()
        return { id }
    }
}

module.exports = RequestService