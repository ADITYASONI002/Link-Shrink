const config = require("../../config/config");

exports.basicAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error("Unauthorized Access", 401);
        }

        const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString();
        const [user, pass] = credentials.split(':');

        if (user === config.clientId && pass === config.clientSecret) {
            return next();
        }

        throw new Error("Unauthorized Access", 401);
    } catch (error) {
        console.error("middleware:basicAuth:catch", { error: error.message, stack: error.stack })
        return res.json({ status: 0, message: error.message })
    }
}