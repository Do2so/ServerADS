const mongoose = require('mongoose');
//const User = require('../models/models')

const formationSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    typeFormation : {
        type : String,
        required : true
    },
    motDG : {
        type : String,
        required : true
    },
    Nom :{
        type : String,
        required : true
    },
    Prenom : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true
    },
    Telephone : {
        type : String,
        required : true
    },
    Datence : {
        type : String,
        required : true
    },
    Sexe : {
        type : String,
        required : true
    },
    Status : {
        type : Boolean,
        default : false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Formations = mongoose.model('Formations', formationSchema);
module.exports = Formations;