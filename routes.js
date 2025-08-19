//importando as rotas dos controladores
const express = require('express')
const route = express.Router()
const countController = require('./src/Controllers/countController')
const diaryController = require('./src/Controllers/diaryController')
const contactController = require('./src/Controllers/contactController')

//definindo o controlador e funcao de cada pagina
route.get('/', countController.loginPage)
route.get('/register', countController.creatPage)
route.get('/diary', diaryController.diaryPage)
route.get('/diary/profile', diaryController.profilePage)
route.get('/diary/profile/logout', countController.logoutCount)
route.get('/diary/contact', contactController.contactPage)
route.post('/', countController.loginCount)
route.post('/register', countController.registerCount)
route.post('/diary/contact', contactController.creatContact)

module.exports = route