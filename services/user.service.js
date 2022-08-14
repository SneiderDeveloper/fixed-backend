const initializingSDKFirebase = require('./modules/initializingSDKFirebase')
const { getFirestore, FieldValue  } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage')
const { encrypt } = require('./modules/crypt')
const position = require('./modules/position')
const { uploadFiles } = require('./modules/uploadFile')
const boom = require('@hapi/boom')
const fetch = require('node-fetch')
const { v4: uuidv4 } = require('uuid')

class UserService {
  constructor() {
    this.users = []
    initializingSDKFirebase()
    this.db = getFirestore()
  }

  async uploadImage(files) {
    const bucket = getStorage().bucket()
    const dirname = '/Users/Sneii/OneDrive/Documentos/fixed_project/fixed_backend/middleware/fixed/resize'
    try {
      const filesURL = await uploadFiles(files, dirname, bucket)
      return filesURL
    } catch (err) {
      throw boom.failedDependency(err)
    }
  }

  async create(data) {
    if (data) {
      const phone_number = await encrypt(String(data.phone_number))
      const dataEncript = {
        phone_number
      }
      try {
        const newUser = {
            user_id: uuidv4(),
            startDate: FieldValue.serverTimestamp(),
            ...dataEncript,
            ...data,
        }
        const response = await this.db.collection('users').add(await newUser)
        return response
      } catch (err) {
        throw boom.internal(err)
      }
    }
  }

  async read(user_id) {
    let user = null
    try {
      const userRef = this.db.collection('users').doc(user_id)
      user = await userRef.get()
    } catch (err) {
      throw boom.internal(err)
    }

    if (!user.exists) {
      throw boom.notFound('User not found')
    } else {
      return user
    }
  }

  async update(id, data) {
    try {
      const userRef = this.db.collection('users').doc(id)
      const response = await userRef.update({ ...data })
      return response
    } catch (err) {
      throw boom.internal(err)
    }
  }

  async delete(id) {
    try {
      const response = await this.db.collection('users').doc(id).delete()
      return response
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
