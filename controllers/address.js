const addressModel = require("../models/address")
const userModel = require("../models/user")
const response = require("../services/response")

const addAddress = async (req, res, next) => {
    try {
        const { postalCode, firstName, lastName, address, phoneNumber, email } = req.body
        const { _id: userId } = req.user

        const hasAddress = await addressModel.findOne({ userId, postalCode })
        if (hasAddress) return next({ status: 400, message: 'address already exists' })

        const newAddress = new addressModel({
            postalCode, 
            name: firstName + lastName,
            address, 
            phoneNumber, 
            email,
            userId,
        })

        const adddedAddress = await newAddress.save()
        await userModel.findByIdAndUpdate(
            userId , 
            { $push: { address: adddedAddress._id } },
        );

        return res.send(response(200, 'address added successfully'))
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const editAddress = async (req, res, next) => {
    try {
        const { postalCode, landmark } = req.body
        const { _id: userId } = req.user

        const hasAddress = await addressModel.findOne({ userId, postalCode })
        if (hasAddress) return next({ status: 400, message: 'address already exists' })

        const newAddress = new addressModel({
            ...req, body
        })

        await newAddress.save()
        return res.send(response(200, 'address added successfully' ))
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const deleteAddress = async (req, res, next) => {
    try {
        const { addressId } = req.params
        const hasAddress = await addressModel.findByIdAndDelete(addressId)
        if (!hasAddress) return next({ status: 400, message: 'address not exists' })

        return res.send(response(200, 'address deleted successfully' ))
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const fetchAddress = async (req, res, next) => {
    try {
        const { _id: userId } = req.user
        const hasAddress = await addressModel.find({ userId })

        return res.send(response(200, 'address fetched successfully', { addresses: hasAddress }))
    } catch (err) {
        console.log(err)
        next(err)
    }
}


module.exports = {
    addAddress,
    editAddress,
    fetchAddress,
    deleteAddress
}