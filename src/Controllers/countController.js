const { async } = require('regenerator-runtime')
const Login = require('../models/LoginModel')

//renderizacao do ejs da loginPage
exports.loginPage = (req, res) => {
    res.render('indexLogin')
}

exports.creatPage = (req, res) => {
    res.render('creatLogin')
}

exports.registerCount = async (req, res) => {
    try {
        const login = new Login(req.body)
        await login.register()
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(function() {
                return res.redirect('/register')
            })
            return
        }

        req.session.user = login.user
        req.session.save(function() {
            return res.redirect('/diary')
        })
    } catch(e) {
        console.log(e)
    }
}

exports.loginCount = async (req, res) => {
    try {
        const login = new Login(req.body)
        await login.login()
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(function() {
                return res.redirect('/')
            })
            return
        }

        req.session.user = login.user
        req.session.save(function() {
            return res.redirect('/diary')
        })
    } catch(e) {
        console.log(e)
    }
}

exports.logoutCount = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}