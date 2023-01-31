const express = require('express')
const multer = require('multer')
const mimeTypes = require('mime-types')
const passport = require('passport')
const UserService = require('../services/user.service')
const DocumentService = require('../services/document.service')
const {
    createUserSchema,
    updateUserSchema,
    getUserSchema
} = require('../schemas/user.schema')
const validatorHandler = require('../middleware/validator.handler')
const transformImage = require('../middleware/transform.image.handler')

const router = express.Router()
const user = new UserService()
const document = new DocumentService()

const LIMIT_FILE = 1
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    const date = Date.now()
    const ramdonNumber = Math.round(Math.random() * 10)
    const extension = mimeTypes.extension(file.mimetype)
    cb(null, `${date}${ramdonNumber}.${extension}`)
  }
})
const upload = multer({
  storage: storage
})

const cpUpload = upload.fields([
  {
    name: 'cardFront',
    maxCount: LIMIT_FILE
  },
  {
    name: 'cardBack',
    maxCount: LIMIT_FILE
  },
  {
    name: 'face',
    maxCount: LIMIT_FILE
  },
])

router.get('/',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const userData = await user.read()
            res.json(userData)
        } catch (err) {
            next(err)
        }
    }
)

router.get('/:phone_number',//Delete router, warning
    passport.authenticate('jwt', { session: false }),
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
    passport.authenticate('jwt', { session: false }),
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

router.get('/byUserId/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const userData = await user.findOne(id)
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

router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const { params: { id }, body } = req
            const userUpdate = await user.update(id, body)
            res.json(userUpdate)
        } catch (err) {
            next(err)
        }
    }
)

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const deleteUser = await user.delete(id)
            res.json(deleteUser)
        } catch (err) {
            next(err)
        }
    }
)

router.post('/upload/card',
    cpUpload,
    transformImage(500),
    async (req, res, next) => {
        try {
            const files = req.files
            const filesURL = await user.uploadImage(files)
            req.filesURL = filesURL
            res.json(filesURL)
            next()
        } catch (err) {
            next(err)
        }
    },
    async (req, res, next) => {
        try {
            const id = req.body.id
            const filesURL = req.filesURL
            const body = {
                idCardFront: filesURL[0].fileURL,
                idCardBack: filesURL[1].fileURL,
                IdCardAndFace: filesURL[2].fileURL,
                usersId: id
            }
            console.log(body)
            const newDocument = await document.create(body)
            res.json(newDocument)
        } catch (err) {
            next(err)
        }
    },
    async (req, res, next) => {
        try {
            
        } catch (err) {
            next(err)
        }
    }
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
