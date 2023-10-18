//    eg - {
//         "topLevel":"Men",
//         "secondLevel":"clothing",
//         "thirdLevel":"shirt",
//         "products":[
//             {
//                 .....
//             },
//             {
//                 .....
//             }
//         ]
//     }

const categoryModel = require("../models/category")
const productsModel = require("../models/product")
const response = require("../services/response")

const categoryWiseProduct = async(req, res, next) =>{
    try{
    
       const categoryTree = await fetchCategories(null)
        return res.send(response(200, 'categories wise products fetched', { result : categoryTree }))
    }catch(err){
        next(err) 
    }
}

const fetchCategories= async(category)=>{
  try{
    let categories = await categoryModel.find({parentCategory:category})
    if (!categories || categories.length == 0){
      return []
    }
    const result = []

    for (const item of categories){
      const subCategories =  await fetchCategories(item._id)
      item['_doc'].subCategories = subCategories
      result.push(item)
    }

    return result
  }catch(err){
    console.log(err)
  }
}

module.exports = {
    categoryWiseProduct
}

