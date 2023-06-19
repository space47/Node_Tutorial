const asyncWrapper = (fn) => {
    return async (req,res,next) => {
        try {
            await fn(req,res,next)
        } catch (error) {
            // res.status(500).json({msg:error})
            // error handling will be sended to the next middleware
            next(error)
        }
    }
}

module.exports = asyncWrapper