const { subscriber, connect } = require("../libs/sequelize")

function realTimeHandler(io) {
    // io.on('connection', socket=> {
    //     console.log(socket.id)
    // })
    subscriber.notifications.on("requests", (payload) => {
        console.log("Received notification in 'my-channel':", payload)
        io.on('connection', socket => {
            console.log(socket.id)
            socket.emit('requestUpdate', payload)
        })
    })
    
    subscriber.events.on("connected", () => {
        console.log('connected')
    })
    
    subscriber.events.on("error", (error) => {
        console.error("Fatal database connection error:", error)
    })
    
    process.on("exit", () => {
        subscriber.close()
    })
}

module.exports = { realTimeHandler }