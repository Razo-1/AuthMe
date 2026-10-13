const checkToeken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token is required' });
    }  

    next();
}

module.exports.checkToeken = checkToeken;