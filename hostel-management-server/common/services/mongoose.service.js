const mongoose = require('mongoose')
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
    mongoose.connect("mongodb://localhost:27017/hostel",options).then(()=> {
        console.log("Connected")
    }).catch(err=> {
        console.log('Connection unsuccessful, retry after 5 seconds. ',++count)
        setTimeout(connectWithRetry,5000)
    })
}

connectWithRetry()
exports.mongoose = mongoose;
