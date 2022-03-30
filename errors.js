class CustomError extends Error {
    constructor (message, code) {
        super(message);
        this.code = code;
    }
}


const asyncWrapper = controller => async (req, res, next) => {
    try {
        await controller(req, res, next);
    } catch (err) {
        console.log(err);
        next(err);
    }
}


const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError)
        return res.status(err.code).json({error: err.message});
    return res.status(500).json({error: 'Internal server error'});
}


const notFoundHandler = (req, res) => res.status(404).json({error: "Not found"});


module.exports = {
    CustomError,
    asyncWrapper,
    errorHandler,
    notFoundHandler
}
