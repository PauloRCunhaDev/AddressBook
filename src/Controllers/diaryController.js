const Contact = require('../models/ContactModel')
const Cotact = require('../models/ContactModel')

exports.diaryPage = async(req, res) => {
    const contacts = await Contact.findContacts()
    res.render('indexDiary', { contacts })
}

exports.profilePage = (req, res) => {
    res.render('countDiary')
}