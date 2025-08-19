exports.errorsMessages = (req, res, next) => {
    res.locals.errors = req.flash('errors')
    res.locals.user = req.session.user
    res.locals.contact = req.session.contact
    next()
}

//verificando o token csrf do navegador
exports.checkCsrf = (err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        // Token CSRF inválido ou ausente
        res.status(403)
        res.send('Token CSRF inválido. A requisição foi bloqueada.')
    } else {
        next(err)
    }

}

//gerando o token csrf do navegador
exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}