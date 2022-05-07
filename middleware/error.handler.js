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

module.exports = { errorHandleBoom, errorHandle }