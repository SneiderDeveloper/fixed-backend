const boom = require('@hapi/boom')
const fetch = require('node-fetch')

class StateService {
    constructor() {
        this.states = []
    }

    async read() {
        try {
            if (this.states.length <= 0) {
                const response = await fetch('https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json')
                const data = await response.json()
                this.states = data
                return this.states
            } else return this.states
        } catch (err) {
            throw boom.failedDependency(err)
        }
    }
}

module.exports = StateService