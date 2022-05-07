const express = require('express')
const routerApi = require('./routes/')
const cors = require('cors')
const { errorHandleBoom, errorHandle } = require('./middleware/error.handler')

const app = express()
const PORT = process.env.PORT || 3001

const whitelist = [
    'http://localhost:3000',
    'https://fixed.com.co/'
]

const options = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin) || !origin) callback(null, true)
            else callback(new Error('Origin not valid'))
    }
}

app.use(cors(options))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Fixed API')
})

routerApi(app)
app.use(errorHandleBoom)
app.use(errorHandle)


app.listen(PORT)