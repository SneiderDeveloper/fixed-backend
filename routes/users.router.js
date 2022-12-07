const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const mimeTypes = require('mime-types')
const UserService = require('../services/user.service')
const {
    createUserSchema,
    updateUserSchema,
    getUserSchema
} = require('../schemas/user.schema')
const validatorHandler = require('../middleware/validator.handler')
const transformImage = require('../middleware/transform.image.handler')

const router = express.Router()
const user = new UserService()

const LIMIT_FILE = 1
const dirnameSlash = '/Users/Sneii/OneDrive/Documentos/fixed-project/fixed-backend/middleware'
const originalPath = '/fixed/original/'
const destination = dirnameSlash + originalPath
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/tmp/my-uploads')
//   },
//   filename: function(req, file, cb) {
//     const name = Date.now()
//     const extension = mimeTypes.extension(file.mimetype)
//     cb(null, `${name}.${extension}`)
//   }
// })
// const upload = multer({
//   storage: storage
// })

// const cpUpload = upload.fields([
//   {
//     name: 'cardFont',
//     maxCount: LIMIT_FILE
//   },
//   {
//     name: 'cardBack',
//     maxCount: LIMIT_FILE
//   },
//   {
//     name: 'face',
//     maxCount: LIMIT_FILE
//   },
// ])

router.get('/',
  // validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
      try {
          // const { user_id } = req.params
          const userData = await user.read()
          res.json(userData)
      } catch (err) {
          next(err)
      }
  }
)

router.get('/:phone_number',
  // validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
      try {
          const { phone_number } = req.params
          const userData = await user.findOneForPhoneNumber(phone_number)
          res.json(userData)
      } catch (err) {
          next(err)
      }
  }
)

router.get('/findTechnician/:user_id/:is_remote',
  async (req, res, next) => {
      try {
          const { user_id, is_remote } = req.params
          const technical = await user.findTechnician(user_id, is_remote)
          res.json(technical)
      } catch (err) {
          next(err)
      }
  }
)

router.get('/byUserId/:user_id',
  // validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
      try {
          const { user_id } = req.params
          const userData = await user.findOne(user_id)
          res.json(userData)
      } catch (err) {
          next(err)
      }
  }
)

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
      try {
          const { body } = req
          const newUser = await user.create(body)
          res.json(newUser)
      } catch (err) {
          next(err)
      }
  }
)

router.patch('/:user_id',
  // validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
      try {
          const { params: { user_id }, body } = req
          const userUpdate = await user.update(user_id, body)
          res.json(userUpdate)
      } catch (err) {
          next(err)
      }
  }
)

router.delete('/:user_id',
  // validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
      try {
          const { user_id } = req.params
          const deleteUser = await user.delete(user_id)
          res.json(deleteUser)
      } catch (err) {
          next(err)
      }
  }
)

router.post('/upload/card',
  upload.array('photos', 12), 
  (req, res, next) => {
    try {
      res.json(req.files)  
    } catch (err) {
      next(err)
    }
  },
  // transformImage(500),
  // async (req, res, next) => {
  //   try {
  //     const files = req.files
  //     console.log(files)
  //     res.json(req.body.id)
  //     // const filesURL = await user.uploadImage(files)
  //     // req.filesURL = filesURL
  //     next()
  //   } catch (err) {
  //     next(err)
  //   }
  // },
  //   async (req, res, next) => {
  //     try {
  //       const id = req.body.id
  //       const identity = req.filesURL
  //       // const update = await user.create(id, { users_id: id})
  //       res.json(identity)
  //     } catch (err) {
  //       next(err)
  //     }
  //   }
)

router.get('/geo',
  async (req, res, next) => {
      try {
          const geolocation = await user.geolocation()
          res.json(geolocation)
      } catch (err) {
          next(err)
      }
  }
)

module.exports = router
