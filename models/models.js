const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
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
    Password : {
        type : String,
        required : true
    },
    createdAt: {
        type: Date,
        default: Date.now
      }
})
 
userSchema.pre('save', async function(next) {
    if (!this.isModified('Password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.Password = await bcrypt.hash(this.Password, salt);
      next();
    } catch (error) {
      next(error);
    }
  });
  // Méthode pour vérifier le mot de passe
  userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.Password);
  };
 
const User = mongoose.model('User',userSchema)
module.exports = User
