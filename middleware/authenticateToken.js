const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            status: false,
            error: "Token is missing."
        }); 
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;