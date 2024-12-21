const express = require('express')
const router = express.Router()
const ItemController = require('../controllers/ItemController')

router.get('/' , ItemController.showItens)

module.exports = router