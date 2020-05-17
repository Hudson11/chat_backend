require('../models/UserModel');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const user = require('mongoose').model('user');
const crypto = require('../helpers/cryptoHelper');

router.post('/', async (req, res, next) => {

    if(!req.body)
        return res.json({status: false});
    
    const { username, senha } = req.body;

    await user.findOne({username: username}, (err, doc) => {
        if(err)
            res.json({status: false, message: err});
        else if(doc === null)
            res.json({status: false, message: 'Não há usuário como este username'});
        else if(crypto.compare(senha, doc.senha)){
            const token = jwt.sign({id: doc._id}, process.env.AUTH_SECRET, {expiresIn: 86400});
            res.json({status: true, message: 'Usuário autorizado', token: token, doc: doc});
        }
        else 
            res.status(401).send();
    });

});


module.exports = router;