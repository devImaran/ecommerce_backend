const mongoose = require("mongoose");
require('dotenv').config()

const dbConnect = async () =>{
    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log("DB connected")
}

module.exports= {
    dbConnect
}