const { Navigator } = require('node-navigator')

function position() {
    return new Promise((resolve, reject) => {
        const navigator = new Navigator()
        navigator.geolocation.getCurrentPosition((success, err) => {
            resolve({
                latitude: success.latitude,
                longitude: success.longitude
            })
            reject(err)
        })
    })
}

module.exports = position