const Contact = require('../models/ContactModel')

exports.diaryPage = async(req, res) => {
    const userId = req.session.user._id
    const contacts = await Contact.findContacts(userId)
    res.render('indexDiary', { contacts })
}

exports.profilePage = (req, res) => {
    res.render('countDiary')
}