const response = (status, message, data) =>{
    let success = false
    if (status !== 200 || status !== 201 ) success = true

    const responseData = {
        success, 
        status,
        message,
        data: {...data} || 'No data'
    }

    return responseData
};


module.exports = response