const bcrypt = require('bcrypt')
const boom = require('@hapi/boom')

const ROUNDS = 7

function encrypt(dataToEncrypt) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(dataToEncrypt, ROUNDS, (err, hash) => {
            if (err) reject(boom.failedDependency(err))
                else resolve(hash)
        })
    })
}

function decrypt(dataToDecrypt, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(dataToDecrypt, hash, (err, res) => {
            if (err) reject(boom.failedDependency(err))
                else resolve(res)
        })
    })
}

module.exports = { encrypt, decrypt }