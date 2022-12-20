require('dotenv').config()

const config = {
    // env: process.env.NODE_DEV || 'dev',
    listenPort: process.env.PORT,
    host: process.env.INSTANCE_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    jwtSecret: process.env.JWT_SECRET,
}

module.exports = config