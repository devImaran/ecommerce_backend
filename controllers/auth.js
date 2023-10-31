const bcrypt = require('bcrypt')
const userModel = require('../models/user')
const response = require('../services/response')
require('dotenv').config()
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    try {
        const { password } = req.body
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = new userModel({ ...req.body, password: hashedPassword })
        await newUser.save()
        return res.json(response(200, "User Added successfully!"))

    } catch (error) {
        if (error?.code) {
            if (Object.keys(error.keyPattern)[0] == "email") {
                return next(new Error('Email already in use!'))
            } else {
                return next(new Error('Phone Number already in use!'))
            }
        }
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        console.log('i am iside login')
        const { email, password } = req.body

        //check email exists or not 
        const isValidUser = await userModel.findOne({ email });
        if (!isValidUser) return next({ status: 400, message: 'Invalid Email!', errorOn: 'email' });

        console.log('user found')
        //compare the password
        const hasCorrectPassword = bcrypt.compareSync(password, isValidUser.password);
        if (!hasCorrectPassword) return next({ status: 400, message: 'Wrong password!', errorOn: 'password' });


        console.log('generating token')
        //generate token
        const { _id, name, email: userEmail, phoneNumber, profilePic, role } = isValidUser

        const token = jwt.sign({ _id, name, email, phoneNumber, profilePic, role }, process.env.TOKEN_SECRET_KEY, { expiresIn: '48h' })
        return res.json(response(200, "LoggedIn successfully!", { token }))
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

module.exports = {
    register,
    login
}
