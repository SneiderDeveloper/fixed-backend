const { Client } = require('pg')

const getConnection = async () => {
    const client = new Client({
        host: '34.95.209.117',
        port: 5432,
        user: 'postgres',
        password: 'Deus universum 0',
        database: 'fixed'
    })
    await client.connect()
    return client
}
//(2[;^@eB[-+0rd,|

module.exports = getConnection
