const jwt = require('jsonwebtoken');
const User = require('../models/models');
const Formations = require('../models/formations');
const Prets = require('../models/prets');
const upload = require('../middleware/upload');
const mongoose = require('mongoose')


const JWT_SECRET = "f43bc390c74c2b8871de5c89e88172019c5cb46a14e740cf62a1e81c48851600"

 createUser = async (req,res)=>{

    try{
           const {Nom,Prenom,Email,Datence,Telephone,Adresse,Sexe,Profession,BqDomicile,Numcompte,NomEntreprise,NumEntreprise,Password} =req.body;  
           const userExist = await User.findOne({Email});
           if(userExist){
               return res.status(400).json({message : 'utilisateurs déjà existant'});
           }
           const user = await User.create({Nom,Prenom,Email,Datence,Telephone,Adresse,Sexe,Profession,BqDomicile,Numcompte,NomEntreprise,NumEntreprise,Password});
           await user.save(); 
           res.status(201).json(user);
           }catch(error){
              res.status(400).json({error : error.message})
           }
   }

   // All user
const allUser = async (req,res)=>{
    try{
        const users = await User.find();
        if(users.length === 0){
            return res.status(404).json({message : "Aucun utilisateur trouvé"})
        }
        res.status(200).json({users});
    }catch(error){
        res.status(500).json({error : error.message})
    }
}

//One user
const oneUser = async (req, res) => {
  const { id } = req.params;
  console.log('Received ID:', id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const user = await User.findById(id); 
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

    

const login = async (req,res)=>{
    
  try {
    const { Telephone, Password } = req.body;
    const user = await User.findOne({ Telephone });

    if (!user) {
      return res.status(400).json({ error: 'Invalid Telephone' });
    }

    const isMatch = await user.comparePassword(Password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid  password' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
    console.log('Authentification réussie',{token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}  

//GET ONE USER
const getUserInfo = (req, res) => {
    const { Nom, Prenom, Email, Telephone } = req.user;
    res.json({ Nom, Prenom, Email, Telephone });
  };

// UPDATE USER
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
      

const createFormation = async (req,res) =>{
    const {typeFormation,motDG} = req.body;
    const userId = req.user._id;
    const { Nom, Prenom, Email, Telephone, Datence, Sexe } = req.user;
  
    try {
      const formations = new Formations({ userId,
                                          typeFormation,
                                          motDG,
                                          Nom : Nom,
                                          Prenom : Prenom,
                                          Email : Email,
                                          Telephone : Telephone,
                                          Datence : Datence,
                                          Sexe : Sexe
                                        });
      const formationExist = await Formations.findOne({typeFormation});
          if(formationExist){
              return res.status(400).json({message : 'Vous avez déjà une demande sur cette formation'});
                       }                                  
      await formations.save();
      res.status(201).json({ message: 'Formations created successfully', formations });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  
}

//All formations
const allFormation = async (req,res)=>{
  try{
      const users = await Formations.find();
      if(users.length === 0){
          return res.status(404).json({message : "Aucun utilisateur trouvé"})
      }
      res.status(200).json({users});
  }catch(error){
      res.status(500).json({error : error.message})
  }
}

//Get one Formation
const oneFormation = async (req, res) => {
  const { id } = req.params;
  console.log('Received ID:', id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const formation = await Formations.findById(id).populate('userId', 'caractéristiques'); 

    if (!formation) {
      return res.status(404).json({ error: 'Formation not found' });
    }

    res.status(200).json({ formation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateFormation = async (req, res) => {
  try {
    const formationId = req.params.id;
    const updatedData = req.body;
    const formation = await Formations.findByIdAndUpdate(formationId, updatedData, { new: true });
    if (!formation) {
      return res.status(404).json({ error: 'Formation not found' });
    }
    res.json(formation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
    



const createPret = async (req,res) =>{

  upload(req, res, async(err) => {
    if(err){
      return res.status(400).json({error : err.message})
    }

    const {indiceRentab,typePret,montantPret,descriptionPret} = req.body;
  const userId = req.user._id;
  const { Nom, Prenom, Email, Telephone, Datence, Sexe,Adresse,Profession,BqDomicile,Numcompte,NomEntreprise,NumEntreprise } = req.user;

  try {
    const prets = new Prets({ userId,
                                        indiceRentab,
                                        typePret,
                                        montantPret,
                                        filePret : req.file.filename,
                                        descriptionPret,
                                        Nom : Nom,
                                        Prenom : Prenom,
                                        Email : Email,
                                        Telephone : Telephone,
                                        Datence : Datence,
                                        Sexe : Sexe,
                                        Adresse : Adresse,
                                        Profession : Profession,
                                        BqDomicile : BqDomicile,
                                        Numcompte : Numcompte,
                                        NomEntreprise : NomEntreprise,
                                        NumEntreprise : NumEntreprise
                                      });
    const pretExist = await Prets.findOne({typePret});
        if(pretExist){
            return res.status(400).json({message : 'Vous avez déjà une demande de prèt de ce type'});
                     }                                  
    await prets.save();
    res.status(201).json({ message: 'Formations created successfully', prets });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

  });
  
}

//Get All prets
const allPret = async (req,res)=>{
  try{
      const users = await Prets.find();
      if(users.length === 0){
          return res.status(404).json({message : "Aucun utilisateur trouvé"})
      }
      res.status(200).json({users});
  }catch(error){
      res.status(500).json({error : error.message})
  }
}

//Get one pret
const onePret = async (req, res) => {
  const { id } = req.params;
  console.log('Received ID:', id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const pret = await Prets.findById(id).populate('userId', 'caractéristiques'); 

    if (!pret) {
      return res.status(404).json({ error: 'Pret not found' });
    }

    res.status(200).json({ pret });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE PRET
const updatePret = async (req, res) => {
  try {
    const pretId = req.params.id;
    const updatedData = req.body;
    const pret = await Prets.findByIdAndUpdate(pretId, updatedData, { new: true });
    if (!pret) {
      return res.status(404).json({ error: 'Pret not found' });
    }
    res.json(pret);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
    
    

const userController = {
    createUser,
    allUser,
    oneUser,
    login,
    getUserInfo,
    updateUser,
    createFormation,
    allFormation,
    oneFormation,
    updateFormation,
    createPret,
    allPret,
    onePret,
    updatePret
};
module.exports = userController

