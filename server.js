const express = require("express");
const cors = require("cors");
const { dbConnect } = require("./config/db");
require("dotenv").config()

const app = express()
const PORT = process.env.SERVER_PORT


//routes 
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const cartRoute = require('./routes/cart');
const productRoute = require('./routes/product');
const categoriesRoute = require('./routes/category');
const addressRoute = require('./routes/address');
const orderRoute = require('./routes/orders');
const reviewAndRatingRoute = require('./routes/reviewAndRating');

//middlewares
const authentication = require("./middleware/authentication");
const errorMiddleware = require("./middleware/error");

app.use(express.json())
app.use(cors())

app.use('/api/auth',authRoute)
app.use('/api/user', authentication, userRoute)
app.use('/api/cart', authentication, cartRoute)
app.use('/api/product', productRoute)
app.use('/api/categories', categoriesRoute)
app.use('/api/address', authentication, addressRoute)
app.use('/api/order', authentication, orderRoute)
app.use('/api/review-and-rating', authentication, reviewAndRatingRoute)

app.use(errorMiddleware)

app.get('/', (req, res)=>{
    res.send("Hey Ecommerce Backend is running")
})

app.listen(PORT, async ()=>{
    console.log("Server Running on "+PORT)
    await dbConnect()
})
