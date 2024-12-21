const express = require('express')
const checkAuth= require('../helper/authStore').checkAuth
const router = express.Router()
const StoreController = require('../controllers/StoreController')
router.get('/home' ,checkAuth, StoreController.home)
router.get('/login' , StoreController.login)
router.post('/login' , StoreController.loginPost)
router.get('/register' , StoreController.register)
router.post('/register' , StoreController.registerPost)
router.get('/logout' , StoreController.logout)


module.exports = router