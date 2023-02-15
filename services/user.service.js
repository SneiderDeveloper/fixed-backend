const admin = require('firebase-admin');
const { encrypt } = require('./modules/crypt')
const bcrypt = require('bcrypt')
const { uploadFiles } = require('./modules/uploadFile')
const boom = require('@hapi/boom')
const { v4: uuidv4 } = require('uuid')
const pool = require('../libs/postgres.pool')
const { models } = require('../libs/sequelize')

class UserService {
  constructor() {
    
  }

  async uploadImage(files) {
    try {
      const bucket = admin.storage().bucket()
      const patch = './resize'
      const filesURL = await uploadFiles(files, patch, bucket)
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
    const user = await models.User.findOne({
      where: { phoneNumber }
    })
    if (!user) {
      throw boom.notFound('User not found')
    }
    return user
  }

  async findTechnician(userId, isRemote) {
    try {
      if (isRemote === 'true') {
        return 186
      } else {
        const [ cityId ] = await models.User.sequelize.query(`
          SELECT addresses.cities_id
            FROM addresses
            INNER JOIN users ON users.id = addresses.users_id
            WHERE addresses.users_id = ${userId} AND addresses.is_active = true
        `)

        const [ weAreHere ] = await models.User.sequelize.query(`
          SELECT cities.we_are_here
          FROM cities
          WHERE cities.we_are_here = true AND cities.id = ${cityId[0].cities_id}
        `)

        if (weAreHere[0]) {
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
        } else return 186
  

      }
    } catch (err) {
      throw boom.internal(err)
    }
  }

  async create(data) {
    try {
      let hash = null
      if (data.password) {
        hash = await bcrypt.hash(data.password, 10)
      }
      const response = await models.User.create({
        ...data,
        password: hash
      })
      delete response.dataValues.password
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
}

module.exports = UserService
