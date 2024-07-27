const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

const router =require('./routes/routes');
const path = require('path')

const app = express()
app.use(bodyParser.json())

dotenv.config()

const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL).then(()=>{
    console.log("Connexion établie avec la base de données")
    app.listen(PORT, ()=>{
        console.log(`Server écoute sur le port : ${PORT}`)
    })
}).catch(error => console.log(error))



// Serve static files (for uploaded files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/ads',router)
