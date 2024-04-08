const jwt = require('jsonwebtoken');


const jwtAuthMiddleware = (req, res, next) => {
    
    const authorization = req.headers.authorization;

    if(!authorization){
        return res.status(401).json({message: "Token not found"})
    }

    const token = req.headers.authorization.split(" ")[1];

    if(!token){
        return res.status(401).json({message: "unauthorized"});
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        // console.log(decoded);
        req.user = decoded
        
        next();
        
    } catch (error) {
        // console.log(error);
        return res.status(401).json({message: "invalid token"})
    }

}

module.exports = {
    jwtAuthMiddleware
}