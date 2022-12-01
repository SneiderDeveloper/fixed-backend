const { ValidationError } = require('sequelize')

function ormErrorHandler(err, req, res, next) {
    if (err instanceof ValidationError) {
        res.status(409).json({
            statusCode: 409,
            message: err.name,
            errors: err.errors,
        })
    }
    next(err)
}

function errorHandleBoom(err, req, res, next) {
    if (err.isBoom) {
        const { output: { statusCode, payload } } = err
        res.status(statusCode).json(payload)
    } else {
        next()
    }
}

function errorHandle(err, req, res, next) {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
}

module.exports = { errorHandleBoom, errorHandle, ormErrorHandler }