const Store = require('../models/Store')
const bcrypt = require('bcryptjs')
module.exports = class StoreController {
    static  async home (req,res){
        
        const store = await Store.findOne({where: {id: req.session.storeid}})
        const storeData = store.get()
        
        console.log(storeData)
        res.render('store/home', {storeData})
    }
    static login(req,res){
        res.render('store/login')
    }
    static async loginPost(req,res){
        const {email, password} = req.body
        const store = await Store.findOne({where : {email: email}})
        
        if(!store){
            req.flash('message' , 'Não possui nenhuma loja cadastrada com esse email')
            res.render('store/login')
            return;
        }
        const passwordMatch = bcrypt.compareSync(password, store.password)
        
        if(!passwordMatch){
            req.flash('message' , 'Senha incorreta! Tente Novamente')
            res.render('store/login', {
                email: store.email
            })
            return;
        }

        req.session.storeid = store.id
        req.session.save(()=>{
            res.redirect('/store/home')
            
        })
    }
    static register(req,res){
        res.render('store/register')
    }
    static async registerPost (req,res){
        const {name, cnpj, email, password,confirmpassword} = req.body

        const checkEmailExist = await Store.findOne({where: {email: email}})
        //checando se ja possui loja cadastrada com o email
        if(checkEmailExist){
            req.flash('message', 'Ja possui uma loja cadastrada com esta email')
            res.render('store/register')
            return;
        }
        //confirmando a senha
        if(password != confirmpassword){
            req.flash('message' , 'Senhas diferentes, tente novamente')
            res.render('store/register')
            return;
        }
        //criando senha segura
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password,salt)

        const userData = {
            name: name,
            cnpj: cnpj,
            email: email,
            password: hashedPassword
        }

        try {
            const createStore = await Store.create(userData)
            res.render('store/login' , {
                email :createStore.email,
            })
            console.log(createStore)
        } catch (error) {
            console.log(error)
        }
    }
    static logout(req,res){
        req.session.destroy()
        res.redirect('/')
    }
}