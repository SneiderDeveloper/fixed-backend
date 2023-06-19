const { sequelize: { models } } = require('../libs/sequelize')
const boom = require('@hapi/boom')

class UsersRequestsService {

    constructor() {

    }

    async findOne(id) {
        try {
            const userRequest = await models.UsersRequests.findByPk(id)
            if (!userRequest) {
                throw boom.notFound('Connection not found')
            }
            return userRequest
        } catch (err) {
            throw boom.internal(err)
        }
    }

    async read(id) {
        try {
            const [ request ] = await models.UsersRequests.sequelize.query(`
                SELECT users_requests.request_id
                    FROM users_requests
                    INNER JOIN requests ON requests.id = users_requests.request_id
                    WHERE users_requests.users_id = ${id}
                    ORDER BY contact_date ASC
            `)
            let data = []
            if (request.length > 0) {
                for(let i=0; i<request.length; i++) {
                    const [ response ] = await models.UsersRequests.sequelize.query(`
                        SELECT
                            requests.id,
                            crux,
                            technician_observation AS "technicianObservation",
                            is_canceled AS "isCanceled",
                            is_rejected AS "isRejected",
                            is_open AS "isOpen",
                            at_home AS "atHome",
                            at_business AS "atBusiness",
                            at_remote AS "atRemote",
                            mission_completed_date AS "missionCompletedDate",
                            repair_date AS "repairDate",
                            request_date AS "requestDate",
                            contact_date AS "contactDate",
                            status,
                            is_paid as "isPaid",
                            service_value AS "serviceValue",
                            locations_id AS "locationsId",
                            names,
                            last_names AS "lastNames",
                            users.phone_number AS "phoneNumber",
                            avatar,
                            deliver_at_home AS "deliverAtHome",
                            deliver_at_business AS "deliverAtBusiness",
                            addresses.address AS "addressTechnical",
                            locations.address,
                            locations.additional_data AS "additionalData",
                            locations.phone_number AS "phoneNumberAddress"
                        FROM users_requests
                        INNER JOIN requests ON requests.id = users_requests.request_id
                        INNER JOIN users ON users.id = users_requests.users_id
                        INNER JOIN locations ON locations.id = requests.locations_id
                        INNER JOIN addresses ON addresses.users_id = users.id
                        WHERE users_requests.request_id = ${request[i].request_id} AND users_requests.users_id != ${id}
                    `)
                    data.push(response[0])
                }
            }
            return data
        } catch (err) {
            throw boom.internal(err)
        }
    }

    async create(data) {
        try {
            const response = await models.UsersRequests.create(data)
            return response
        } catch (err) {
            throw boom.internal(err)
        }
    }

    async update(id, newData) {
        try {
            const address = await this.findOne(id)
            const response = await address.update(newData)
            return response
        } catch (err) { 
            throw boom.internal(err)
        }
    }

}

module.exports = UsersRequestsService