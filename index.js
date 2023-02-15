const express = require('express')
const routerApi = require('./routes/')
const config = require('./config/config')
const fs = require('fs')
const admin = require('firebase-admin');
const serviceAccount = require('./services/modules/fixed-72bee-firebase-adminsdk-gqmb6-094ff5da79.json')
const { keyPrivate } = require('./services/modules/private-key')
const cors = require('cors')
const { 
    errorHandleBoom, 
    errorHandle,
    ormErrorHandler
} = require('./middleware/error.handler');

const app = express()
const PORT = process.env.PORT || 3001

const whitelist = [
    'http://localhost:3000',
    'https://fixed.com.co',
    'http://192.168.101.13:3000'
]

const options = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin) || !origin) callback(null, true)
            else callback(new Error('Origin not valid'))
    }
}

// console.log(JSON.stringify(keyPrivate))

const write = (route, content) => {
    fs.writeFile(route, content, err => {
        if (err) console.error(err)
    })
}

// write('./services/modules/fixed-72bee-firebase-adminsdk-gqmb6-094ff5da7.json', JSON.stringify(keyPrivate))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: config.storageBucket,
})

app.use(cors(options))
require('./utils/auth/index')
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Fixed API')
})

routerApi(app)
app.use(ormErrorHandler)
app.use(errorHandleBoom)
app.use(errorHandle)


app.listen(PORT)