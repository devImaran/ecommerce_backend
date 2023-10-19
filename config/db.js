const mongoose = require("mongoose");
require('dotenv').config()

const dbConnect = async () =>{
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("DB connected")
}

module.exports= {
    dbConnect
}