const mongoose = require('mongoose')
const config = require("../config/env.config.js")

let count = 0

const options = {
    autoIndex: false,
    poolSize: 50,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectWithRetry = () => {
    console.log("MongoDB connecting..")
    mongoose.connect(config.ATLAS_URI,options).then(()=> {
        console.log("Connected")
    }).catch(err=> {
        console.log('Connection unsuccessful, retry after 5 seconds. ',++count)
        setTimeout(connectWithRetry,5000)
    })
}

connectWithRetry()
exports.mongoose = mongoose;
