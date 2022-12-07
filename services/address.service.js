const { models } = require('../libs/sequelize')
const boom = require('@hapi/boom')

class AddressService {

    constructor() {

    }

    async findOne(id) {
        try {
            const address = await models.Address.findByPk(id)
            if (!address) {
                throw boom.notFound('Address not found')
            }
            return address
        } catch (err) {
            throw boom.internal(err)
        }
    }

    async findByUserId(id) {
        try {
            const [ addresses ] = await models.Address.sequelize.query(`
                SELECT 
                    addresses.id,
                    address, 
                    is_active as "isActive", 
                    "name", 
                    addresses.phone_number as "phoneNumber", 
                    additional_data as "additionalData",
                    city_name as "cityName",
                    state_name as "stateName",
                    we_are_here as "weAreHere",
                    addresses.cities_id as "citiesId",
                    cities.states_id as "statesId"
                    FROM addresses
                    INNER JOIN cities ON cities.id = addresses.cities_id
                    INNER JOIN states ON states.id = cities.states_id
                    WHERE addresses.users_id = ${id}
                    ORDER BY is_active = true DESC
            `)
            if (!addresses) {
                throw boom.notFound('Address not found')
            }
            return addresses
        } catch (err) {
            throw boom.internal(err)
        }
    }

    async activateAddress(userId, addressId) {
        try {
            const [ id ] = await models.Address.sequelize.query(`
                SELECT addresses.id
                    FROM addresses
                    INNER JOIN users ON users.id = addresses.users_id
                    WHERE addresses.is_active = true AND users_id = ${userId}
            `)
            await this.update(id[0].id, {
                isActive: false
            })
            const response = await this.update(addressId, {
                isActive: true
            })
            return response
        } catch (err) {
            throw boom.internal(err)
        }
    }

    async read() {
        try {
            const response = await models.Address.findAll()
            return response
        } catch (err) {
            throw boom.internal(err)
        }
    }

    async create(data) {
        try {
            const [ id ] = await models.Address.sequelize.query(`
                SELECT addresses.id
                    FROM addresses
                    INNER JOIN users ON users.id = addresses.users_id
                    WHERE addresses.is_active = true AND users_id = ${data?.usersId}
            `)
            if (id.length > 0) {
                await this.update(id[0].id, {
                    isActive: false
                })
            }
            const response = await models.Address.create(data)
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

    async delete(id) {
        try {
            const address = await this.findOne(id)
            await address.destroy()
            return { id }
        } catch (err) {
            throw boom.internal(err)
        }
    }

}

module.exports = AddressService