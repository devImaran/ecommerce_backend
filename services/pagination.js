const pagination = (pageNumber, pageSize) =>{

    pageNumber = Number(pageNumber) || 1
    pageSize = Number(pageSize) || 10

    const skip = ( pageNumber - 1 ) * pageSize

    return {
        offset : skip, 
        limit : pageSize,
    }
}

module.exports = {
    pagination
}