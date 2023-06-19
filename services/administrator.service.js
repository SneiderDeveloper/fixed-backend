const boom = require('@hapi/boom')
const { sequelize: { models } } = require('../libs/sequelize')

class AdminService {
    
    constructor() {

    }

    async findOne(id) {
        const administrator = models.Administrator.findByPk(id)
        if (!administrator) {
            throw boom.notFound('Administrator not found')
        }
        return administrator
    }

    async read() {
        try {
            const response = await models.Administrator.findAll()
            return response
        } catch (err) {
            throw boom.internal(err)
        }
    }

    async create(data) {
        try {
            const response = await models.Administrator.create(data)
            return response
        } catch (err) {
            throw boom.internal(err)
        }
    }

    async update(id, newData) {
        try {
            const administrator = await this.findOne(id)
            const response = await administrator.update(newData)
            return response
        } catch (err) {
            throw boom.internal(err)
        }
    }

    async delete(id) {
        try {
            const administrator = await this.findOne(id)
            await administrator.destroy()
            return { id }
        } catch (err) {
            throw boom.internal(err)
        }
    }
}

module.exports = AdminService