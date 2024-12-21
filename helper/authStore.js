module.exports.checkAuth = function (req,res,next){
    const storeid= req.session.storeid
    if (!storeid && req.path !== '/store/login' && req.path !== '/store/register') {
        return res.redirect('/store/login'); // Redireciona para o login
    }
    
    next()
}