const { Client } = require('pg')

const getConnection = async () => {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'Deus universum',
        database: 'fixed'
    })
    await client.connect()
    return client
}

module.exports = getConnection
