const express = require ('express')
const router = express.Router()

const userController = require('../controlleurs/controlleurs')
const authenticate = require('../middleware/middleware')


router.post('/createUser',userController.createUser)
router.get('/allUser',authenticate, userController.allUser)
router.post('/login',userController.login);
router.get('/infosUser', authenticate, userController.getUserInfo)
router.get('/oneUser/:id', authenticate, userController.oneUser)
router.put('/updateUser/:id', authenticate, userController.updateUser)

router.post('/addFormation', authenticate, userController.createFormation)
router.get('/allFormation', authenticate, userController.allFormation)
router.get('/oneFormation/:id', authenticate, userController.oneFormation)
router.put('/updateFormation/:id', authenticate, userController.updateFormation)

router.post('/addPret',authenticate, userController.createPret)
router.get('/allPret', authenticate, userController.allPret)
router.get('/onePret/:id', authenticate, userController.onePret)
router.put('/updatePret/:id', authenticate, userController.updatePret)


module.exports = router