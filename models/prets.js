const mongoose = require('mongoose');

const pretSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    indiceRentab : {
        type : Number,
        required : true
    },
    typePret : {
        type : String,
        required : true
    },
    montantPret : {
        type : Number,
        required : true
    },
    filePret : {
        type: String,
        required : true
    },
    descriptionPret : {
        type : String,
        required : false
    },
    Nom : {
        type : String,
        required : true
    },
    Prenom : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required :true
    },
    Datence : {
        type : String,
        required : true
    },
    Telephone : {
        type : String,
        required : true,
    },
    Adresse : {
        type : String,
        required : true
    },
    Sexe : {
        type : String,
        required : true
    },
    Profession :{
        type : String,
        required : false
    },
    BqDomicile : {
        type : String,
        required : true
    },
    Numcompte : {
        type : String,
        required : false
    },
    NomEntreprise : {
        type : String,
        required : false
    },
    NumEntreprise : {
        type : String,
        required : false
    },
    Status : {
        type : Boolean,
        default : false
    },
    createdAt: {
        type: Date,
        default: Date.now
      }
});

const Prets = mongoose.model('Prets', pretSchema);
module.exports = Prets;