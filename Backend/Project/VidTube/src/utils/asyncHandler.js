const asyncHandler = (requestHandler) => {
    return (req, res, next) => {            //next here is a middleware
            Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

export { asyncHandler }