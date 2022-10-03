const mongoose = require('mongoose')
require('dotenv').config()

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: false, // Don't build indexes
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
}

mongoose.connect(process.env.NODE_API_URI_LOCAL, options)

mongoose.Promise = global.Promise
const db = mongoose.connection

module.exports = db