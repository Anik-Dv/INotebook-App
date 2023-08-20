const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/inotebook"

const ConnectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected mongo successfully");
    })
}

module.exports = ConnectToMongo;