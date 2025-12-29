const jwt = require('jsonwebtoken')

const loginAuthenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]

    if (!token) return res.status(401).json({ message: "No token" });

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload 
        next()

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

const roleAuthenticate = (req, res, next) => {
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({message: "Forbidden: You do not have the required permissions"})
    }

    next()
}

module.exports = {
    loginAuthenticate,
    roleAuthenticate
}