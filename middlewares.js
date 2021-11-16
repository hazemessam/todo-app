const logRequest = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

const notFound = (req, res) => res.status(404).json({error: "not found"});

module.exports = {
    logRequest,
    notFound
}