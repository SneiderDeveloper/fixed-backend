const { Strategy } = require('passport-local')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt');

const UserService = require('../../../services/user.service')
const service = new UserService()

const LocalStrategy = new Strategy({
        usernameField: 'contactInformation',
        passwordField: 'password'
    },
    async (contactInformation, password, done) => {
        let user = null
        try {
            if (isNaN(contactInformation)) {
                user = await service.findOneForEmail(contactInformation)
            } else {
                user = await service.findOneForPhoneNumber(contactInformation)
            }
            if (!user) done(boom.notFound("User not found"), false)
            // if (user?.password) {
            //     const isMatch = await bcrypt.compare(password, user?.password)
            //     if (!isMatch) done(boom.unauthorized(), false)
            // }
            delete user.dataValues.password
            done(null, user)
        } catch (err) {
            done(err, false)
        }
    }
)

module.exports = LocalStrategy;