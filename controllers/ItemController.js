const Item = require('../models/Item')
module.exports = class ItemController {
    static showItens (req,res){
        res.render('Items/home')
    }
}