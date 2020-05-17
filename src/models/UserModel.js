const mongoose = require('mongoose');


const UserModel = new mongoose.Schema({

    username:{
        type: String,
        required: true,
    },
    senha:{
        type: String,
        required: true,
    },
    ativo:{
        type: Boolean,
        default: true
    },
    horaCriado:{
        type: Date,
        default: Date.now()
    },
    horaAtualizado:{
        type: Date,
        default: Date.now()
    },

});

mongoose.model('user', UserModel);