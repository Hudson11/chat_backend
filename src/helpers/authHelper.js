const jwt = require('jsonwebtoken');


module.exports = {

    jwtTokenVerify: (req, res, next) => {

        const { authorization } = req.headers;

        if(!authorization)
            res.status(401).json({error: 'No token provided'});
        
        const parts = authorization.split(' ');

        if(parts.length !== 2)
            res.status(401).json({error: 'Token error'});
        
        const [ scheme, token ] = parts;

        if(!/^Bearer$/.test(scheme))
            res.status(401).json({error: 'Token bad formated'});

        jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
            if(err)
                res.status(401).json({error: 'Token invalid', message: err});
            req.userId = decoded.id;
            return next();
        })
    }

}