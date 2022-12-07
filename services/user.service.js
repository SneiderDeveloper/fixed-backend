const initializingSDKFirebase = require('./modules/initializingSDKFirebase')
const { getStorage } = require('firebase-admin/storage')
const { encrypt } = require('./modules/crypt')
const position = require('./modules/position')
const { uploadFiles } = require('./modules/uploadFile')
const boom = require('@hapi/boom')
const fetch = require('node-fetch')
const { v4: uuidv4 } = require('uuid')
const pool = require('../libs/postgres.pool')
const { models } = require('../libs/sequelize')

class UserService {
  constructor() {
    this.users = []
    initializingSDKFirebase()
    this.pool = pool
    this.pool.on('error', (err) => console.error(err))
  }

  async uploadImage(files) {
    const bucket = getStorage().bucket()
    const dirname = '/Users/Sneii/OneDrive/Documentos/fixed-project/fixed-backend/middleware/fixed/resize'
    try {
      const filesURL = await uploadFiles(files, dirname, bucket)
      return filesURL
    } catch (err) {
      throw boom.failedDependency(err)
    }
  }

  async findOne(id) {
    try {
      const user = await models.User.findByPk(id, { include: ['address'] })
      if (!user) {
        throw boom.notFound('User not found')
      }
      return user
    } catch (err) {
      throw boom.internal(err)
    }
  }

  async findOneForPhoneNumber(phoneNumber) {
    const [ user ] = await models.User.sequelize.query(`
      SELECT 
        id, 
        names, 
        last_names AS "lastNames", 
        email, 
        is_active AS "isActive", 
        is_approved AS "isApproved", 
        is_technical AS "isTechnical", 
        is_verified AS "isVerified", 
        phone_number AS "phoneNumber", 
        start_date AS "startDate", 
        avatar, 
        password
      FROM users
      WHERE users.phone_number = ${phoneNumber}
    `)
    if (!user) {
      throw boom.notFound('User not found')
    }
    return user
  }

  async findTechnician(userId, isRemote) {
    try {

      if (isRemote === 'true') {
        return 23
      } else {
        const [ cityId ] = await models.User.sequelize.query(`
          SELECT addresses.cities_id
            FROM addresses
            INNER JOIN users ON users.id = addresses.users_id
            WHERE addresses.users_id = ${userId} AND addresses.is_active = true
        `)
  
        const [ technicalId ] = await models.User.sequelize.query(`
          SELECT users.id, COUNT(*) requests_number
            FROM users_requests
            INNER JOIN users ON users.id = users_requests.users_id
            INNER JOIN addresses ON addresses.users_id = users.id
            WHERE is_technical = true AND cities_id = ${cityId[0].cities_id} AND users.id != ${userId} 
            GROUP BY users.id
            ORDER BY requests_number ASC
        `)

        return technicalId[0].id
      }


    } catch (err) {
      throw boom.internal(err)
    }
  }

  async create(data) {
    try {
      const response = await models.User.create(data)
      return response
    } catch (err) {
      throw boom.internal(err)
    }
  }

  async read() {
    try {
      const response = await models.User.findAll()
      return response
    } catch (err) {
      throw boom.internal(err)
    }
  }

  async update(id, newData) {
    try {
      const user = await this.findOne(id)
      const response = await user.update(newData)
      return response
    } catch (err) {
      throw boom.internal(err)
    }
  }

  async delete(id) {
    try {
      const user = await this.findOne(id)
      await user.destroy()
      return { id }
    } catch (err) {
      throw boom.internal(err)
    }
  }

  async geolocation() {
      try {
        const { latitude, longitude } = await position()
        const APIKEY = process.env.API_KEY_GOOGLE_MAP
        const lat = latitude
        const lng = longitude
        if (lat && lng) {
          const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${APIKEY}`
          const data = await fetch(url)
          const dataLocation = await data.json()
          const state = dataLocation.results[4].address_components[0].long_name
          const city = dataLocation.results[1].address_components[1].long_name
          return {
            state,
            city
          }
        }
      } catch (err) {
        throw boom.failedDependency(err)
      }
  }
}

module.exports = UserService
