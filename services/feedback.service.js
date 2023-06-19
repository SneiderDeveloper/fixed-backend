const { getFirestore } = require('firebase-admin/firestore')
const boom = require('@hapi/boom')

class FeedbackService {
    
    constructor() {

    }

    async create(data) {
        try {
            const db = getFirestore()
            data.date = new Date()
            await db.collection('feedback').add(data)
            return data
        } catch (err) {
            throw boom.internal(err)
        }
    }
}

module.exports = FeedbackService