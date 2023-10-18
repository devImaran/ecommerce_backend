const errorMiddleware = (err, req, res, next) =>{
    const errStatus = err.statusCode || err.status || 500;
    const errMsg = err.message || 'Something went wrong';
    const errOn = err.errorOn && err.errorOn;

    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        errorOn :errOn
    })
}

module.exports = errorMiddleware
