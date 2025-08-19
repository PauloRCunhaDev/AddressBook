const Contact = require('../models/ContactModel')

exports.contactPage = (req, res) => {
    res.render('contactDiary')
}

exports.creatContact = async (req, res) => {
    try {
        const contact = new Contact(req.body)
        await contact.register()

        if(contact.errors.length > 0) {
            req.flash('errors', contact.errors)
            req.session.save(function() {
                return res.redirect('/diary/contact')
            })
            return
        }

        req.session.contact = contact.contact
        req.session.save(function() {
            return res.redirect('/diary')
        })
    } catch (e) {
        console.log(e)
    }
}