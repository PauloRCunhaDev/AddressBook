//importando as variaveis de ambiente
require('dotenv').config()

//importacao de packs e arquivos
const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes')
const { errorsMessages, checkCsrf, csrfMiddleware } = require('./src/middleware/middleware')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const helmet = require('helmet')
const csrf = require('csurf')
const flash = require('connect-flash')

//conectando o database
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log('conexao feita')
        app.emit('pronto')
    })
    .catch(e => console.log(e))

//configuracao das sessoes
const sessionOptions = session({
    secret: 'chave-do-ligeiro',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000,
        httpOnly: true
    }
})

//utilizacao dos packs e arquivos
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet())
app.use(express.urlencoded({extended: true}))
app.use(sessionOptions)
app.use(flash())
app.use(errorsMessages)
app.use(csrf())
app.use(checkCsrf)
app.use(csrfMiddleware)
app.use(routes)

//utilizacao do ejs
app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

//definido a porta que sera utilizada
app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('http://localhost:3000')
    })
})