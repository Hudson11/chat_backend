require('../models/UserModel');
const router = require('express').Router();
const user = require('mongoose').model('user');
const crypto = require('../helpers/cryptoHelper');
const auth = require('../helpers/authHelper');

router.post('/', async (req, res) => {

    if(!req.body)
        return res.send('erro');

    const erros = [];

    if(req.body.senha == null || typeof req.body.senha == undefined){
        erros.push({message: "o campo senha não foi definido"});
    }
    if(req.body.username == null || typeof req.body.username == undefined){
        erros.push({message: "o campo username não foi definido"});
    }

    if(erros.length > 0)
        return res.json({status: false, body: erros});

    const { senha, username } = req.body;
    const senhaEncrypted = crypto.criptografar(senha);

    await new user({senha: senhaEncrypted, username:username}).save((err, doc) => {
        if(err)
            res.json(err);
        res.json({status: true, message: 'ok'});
    });

});

router.get('/:id', auth.jwtTokenVerify, async (req, res, next ) => {

    const { id } = req.params;

    if(typeof id == undefined){
        return res.json({status: false});
    }

    await user.findOne({_id: id}, (err, doc) => {
        if(err)
            return res.json({status: false, message: err});
        return res.json({status: true, user: doc});
    });

});

router.get('/', auth.jwtTokenVerify, async (req, res) => {
    await user.find({}, (err, doc) => {
        if(err)
            res.json({status: false, message: err});
        res.json({status: true, user: doc});
    }).select('-senha');
});

router.put('/:id', auth.jwtTokenVerify, async (req, res) => {
    
    const { id } = req.params;

    if(typeof id == undefined){
        return res.json({status: false});
    }

    await user.updateOne({_id: id}, req.body, (err, raw) => {
        if(err)
            res.json({status: false, message: err});
        res.json({status: true, message: 'ok'});
    });

});

router.delete('/:id', auth.jwtTokenVerify, async (req, res) => {
    
    const { id } = req.params;

    if(typeof id == undefined){
        return res.json({status: false});
    }

    await user.deleteOne({_id: id}, (err) => {
        if(err)
            res.json({status: false, message: err});
        res.json({status: true, message: 'ok'});
    });
})


module.exports = router;