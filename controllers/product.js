const mongoose = require("mongoose")
const categoryModel = require("../models/category")
const productsModel = require("../models/product")
const productReviewsModel = require("../models/reviewsAndRatings")
const { pagination } = require("../services/pagination")
const response = require("../services/response")

const addProduct = async (req, res, next) => {
    try {
        const { category, ...rest } = req.body
        const { _id } = req.user
        let parentCategoryIds = ['null']

        for (const item in category) {
            let hasCategory = await categoryModel.findOne({ name: category[item] })

            //if not then create it 
            if (!hasCategory) {
                hasCategory = new categoryModel({
                    name: category[item],
                    parentCategory: item == 0 ? null : parentCategoryIds[0],
                    level: item
                })
                await hasCategory.save()
            }
            parentCategoryIds[0] = hasCategory._id
        }
        const newProduct = new productsModel({ ...rest, category: parentCategoryIds[0], addedBy: _id })
        await newProduct.save()
        return res.send(response(200, 'product added', newProduct))

    } catch (err) {
        console.log(err)
        next(err)
    }
}
const allProductsByCategory = async (req, res, next) => {
    try {
        let { category, size, minPrice, maxPrice, currentPage, pageSize } = req.query
        const { offset, limit } = pagination(currentPage, pageSize)
        let products = []

        //["fashion","men's top wear","jeans"]
        if (category) {
            category = category.split(",")
            category = category[category.length - 1]
            let filterCondition = {
                category: new mongoose.Types.ObjectId(category)
            }

            if (size !== "null") {
                size = size.split(",")
                filterCondition = { ...filterCondition, 'size.name': { $in: size } }
            }

            if (minPrice !== 'null') {
                if (maxPrice !== 'null') {
                    filterCondition.price = {
                        $gte: Number(minPrice),
                        $lte: Number(maxPrice)
                    }
                } else {
                    filterCondition.price = {
                        $gte: Number(minPrice),
                    }
                }
            }

            if (maxPrice !== 'null') {
                if (minPrice !== 'null') {
                    filterCondition.price = {
                        $gte: Number(minPrice),
                        $lte: Number(maxPrice)
                    }
                } else {
                    filterCondition.price = {
                        $lte: Number(maxPrice)
                    }
                }
            }

            products = await productsModel.aggregate([
                { $match: filterCondition },
                {
                    $facet: {
                        products: [
                            { $skip: offset },
                            { $limit: limit }
                        ],
                        totalCount: [{ $count: 'totalPages' }]
                    }
                }

            ]).exec()
        }

        return res.send(response(200, 'Products fetched', products))

    } catch (err) {
        console.log(err)
        next(err)
    }
}


const singleProduct = async (req, res, next) => {
    try {
        const { productId } = req.params

        let product = await productsModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(productId) } },
           {
            $facet:{
                productItems: [
                    {
                        $lookup: {
                            from: 'reviewsandratings',
                            localField: 'reviewsAndRatings',
                            foreignField: '_id',
                            pipeline: [
                                {
                                    $lookup: {
                                        from: 'users',
                                        localField: 'userId',
                                        foreignField: '_id',
                                        as: 'userId',
                                        pipeline:[
                                            {
                                                $project: {
                                                    _id: 1,
                                                    createdAt: 1,
                                                    phoneNumber: 1,
                                                    email: 1,
                                                    name: 1,
                                                    profilePic: 1
                                                }
                                            }
                                        ]
                                    },
                                }
                            ],
                            as: 'reviewsAndRatings',
                        },
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'addedBy',
                            foreignField: '_id',
                            as: 'addedBy',
                            pipeline: [
                                {
                                    $project: {
                                        _id: 1,
                                        createdAt: 1,
                                        phoneNumber: 1,
                                        email: 1,
                                        name: 1,
                                        profilePic: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $lookup: {
                            from: 'categories',
                            localField: 'category',
                            foreignField: '_id',
                            as: 'category'
                        }
                    },
                    {
                        $project:{
                            size:1,
                            price:1,
                            name:1,
                            images:1,
                            description:1,
                            details:1,
                            createdAt:1,
                            color:1,
                            category:1,
                            brand:1,
                            addedBy:1,
                            reviewsAndRatings:1
                        }
                    }
                ],
                startRatings:[
                    {
                        $lookup:{
                            from: 'reviewsandratings',
                            localField: 'reviewsAndRatings',
                            foreignField: '_id',
                            as:"reviewsAndRatings"
                        }
                    },
                    {
                        $project:{
                            groupValues: {
                                $map:{
                                    input: "$reviewsAndRatings",
                                    as:"ratings",
                                    in:{
                                        $floor: "$$ratings.rating",
                                    }
                                }
                            }
                        }
                    },
                    {
                        $unwind: "$groupValues"
                    },
                    {
                        $group:{
                            _id: "$groupValues",
                            totalCount:{ $sum : 1},
                        }
                    }
                ]
            }
           }

        ]).exec()

        product={...product[0] }

        return res.send(response(200, 'product added', { product }))

    } catch (err) {
        console.log(err)
        next(err)
    }
}



const deleteProduct = async (req, res, next) => {
    try {
        const { productId } = req.body
        await productsModel.findByIdAndDelete(productId)
        return res.send(response(200, 'product deleted'))

    } catch (err) {
        next(err)
    }
}


// const latestProduct = async (req, res, next) => {
//     try {
//         await productsModel.find({

//         })
//         return res.send(response(200, 'product deleted'))

//     } catch (err) {
//         next(err)
//     }
// }


module.exports = {
    addProduct,
    singleProduct,
    deleteProduct,
    allProductsByCategory
}
