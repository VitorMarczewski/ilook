const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const app = express()

//inportando a conexão com o banco
const conn = require('./db/conn')

//rotas
const ItemController = require('./controllers/ItemController')
const authRoutes = require('./routes/AuthRoutes')
const storeRoutes = require('./routes/StoreRoutes')

//configuração css
app.use(express.static('public'))

//config handlebars
app.engine('handlebars' , exphbs.engine())
app.set('view engine', 'handlebars')

//receber dados do body
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(
    session({
        // Nome do cookie 
        name: "session",     
        // Chave secreta usada para assinar e criptografar os dados da sessão
        secret: "nosso_secret", 
        // 'false' significa que a sessão só será salva se modificada
        resave: false, 
        // 'false' significa que a sessão só será salva se houver algo a ser salvo
        saveUninitialized: false, 
        // 'FileStore' salva as sessões em arquivos no sistema de arquivos local
        store: new FileStore({
            logFn: function() {},
            // 'path' utiliza o diretório temporário do sistema operacional para armazenar as sessões
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        
        // Configurações do cookie da sessão
        cookie: {
            // 'false' significa que o cookie não será enviado apenas por HTTPS
            // Se fosse 'true', o cookie seria transmitido apenas em conexões seguras
            secure: false, 
            // Tempo de validade do cookie em milissegundos (6 minutos)
            // Após esse tempo, o cookie expira
            maxAge: 360000, 
            
            // Data de expiração do cookie. Aqui, a expiração é definida para 6 minutos após o momento atual
            expires: new Date(Date.now() + 360000),
            
            // Define que o cookie não será acessível via JavaScript no navegador
            // 'true' aumenta a segurança contra ataques de XSS (cross-site scripting)
            httpOnly: true 
        }
    })
);
//flash message
app.use(flash())

// Middleware que é executado para todas as requisições antes de qualquer rota
app.use((req, res, next) => {

    // Verifica se o usuário está autenticado, ou seja, se existe um 'userid' na sessão
    if (req.session.userid || req.session.storeid) {
        
        // Se o usuário estiver autenticado, a sessão é passada para as views através de 'res.locals'
        // 'res.locals' armazena variáveis que estarão disponíveis para as views renderizadas
        res.locals.session = req.session;
    }
    // Chama a função 'next()' para passar o controle para o próximo middleware ou rota
    // Se não chamar 'next()', a requisição ficaria "pendente" e não seguiria para a próxima etapa
    next();
});


//rotas
app.use('/' , authRoutes)
app.use('/Items' , ItemController)
app.get('/', ItemController.showItens)
app.use('/Store' , storeRoutes)

conn
    .sync()
    
    .then(()=>{
        app.listen(3000)
    })
    .catch((err)=>{
        console.log('errou ao logar no banco' + err)
    })
