const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.auth = {
            userId: decodedToken.userId,
            username: decodedToken.username
        }
        next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};
