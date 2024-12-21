const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static login(req,res){
        res.render('auth/login')
    }
    static async loginPost(req,res){
        const {email,password} = req.body

        const user = await User.findOne({where: {email: email}})

        if(!user){
            req.flash('message' , 'Usuário não encontrado')
            res.render('auth/login')
            return;
        }

        const passwordMath = bcrypt.compareSync(password , user.password)

        if(!passwordMath){
            req.flash('message' , 'Senha incorreta')
            res.render('auth/login')
            return;
        }

        req.session.userid = user.id
        req.session.save(()=>{
            console.log(req.session)
            res.redirect('/')
        })
       
    }
    static register(req,res){
        res.render('auth/register')
    }
    static async registerPost(req,res){
        console.log('entrou na rota ')
        //dados do body
        const {email,password,confirmpassword}= req.body
        console.log(email,password,confirmpassword)
        //conferindo se as senhas estao corretas
        if(confirmpassword != password){
            req.flash('message' , 'As senhas não conferem')
            res.render('auth/register' , )
            return
        }
        //confirmando se o email ja esta em uso
        const checkEmailExist = await User.findOne({where: {email: email}})

        if(checkEmailExist){
            req.flash('message' , 'Esse e-mail já está em uso')
            res.render('auth/register',)
            return;
        }
        //gerando a senha segura
        const salt = bcrypt.genSaltSync(10)//gera um valor aleatório com complexidade de 10
        const hashedPassword = bcrypt.hashSync(password , salt)

        const userData = {
            email: email,
            password: hashedPassword
        }

        try {
            const createUser = await User.create(userData)
            res.render('auth/login' , {
                email: createUser.email
            })
        } catch (error) {
            console.log(error)
        }
    }
    static logout (req,res){
        req.session.destroy()
        res.redirect('/')
    }
}