const { models } = require('../libs/sequelize')
const { getFirestore } = require('firebase-admin/firestore')
const boom = require('@hapi/boom')

class FeedbackService {
    
    constructor() {

    }

    async create(data) {
        try {
            const db = getFirestore()
            const response = await db.collection('feedback').add(data)
            return response
        } catch (err) {
            throw boom.internal(err)
        }
    }
}

module.exports = FeedbackService