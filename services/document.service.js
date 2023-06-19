const { sequelize: { models } } = require('../libs/sequelize')
const boom = require('@hapi/boom')

class DocumentService {
    constructor() {

    }

    async findOne(id) {
        const document = await models.Document.findByPk(id)
        if (!document) {
            throw boom.notFound('Document not found')
        }
        return document
    }

    async read() {
        try {
            const response = await models.Document.findAll()
            return response
        } catch (err) {
            throw boom.internal(err)
        }
    }

    async create(data) {
        try {
            const response = await models.Document.create(data)
            return response
        } catch (err) {
            throw boom.internal(err)
        }
    }

    async update(id, newData) {
        try {
            const document = await this.findOne(id)
            const response = await document.update(newData)
            return response
        } catch (err) {
            throw boom.internal(err)
        }
    }

    async delete(id) {
        try {
            const document = await this.findOne(id)
            await document.destroy()
            return { id }
        } catch (err) {
            throw boom.internal(err)
        }
    }
}

module.exports = DocumentService