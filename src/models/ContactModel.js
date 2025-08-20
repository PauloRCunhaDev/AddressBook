const { name } = require('ejs')
const mongoose = require('mongoose')
const validator = require('validator')

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: false, default: '-' },
    email: { type: String, required: false, default: '-' },
    userCreat: { type: mongoose.Schema.Types.ObjectId, ref: 'Count' },
    date: { type: Date, default: Date.now }
})

const ContactModel = mongoose.model('Contact', ContactSchema)

class Contact {
    constructor(body, userId) {
        this.body = body
        this.userId = userId
        this.errors = []
        this.contact = null
    }

    async register() {
        this.checkDataRegister()

        if(this.errors.length > 0) return

        this.contact = await ContactModel.create(this.body)
    }

    checkDataRegister() {
        this.cleanUp()
    
        if(!this.body.name) this.errors.push('O nome é obrigatório')

        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail Invalido')

        if(!this.body.email && !this.body.phone) this.errors.push('É necessário colocar uma forma de contato')
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }

        this.body = {
            name: this.body.name,
            phone: this.body.phone,
            email: this.body.email,
            userCreat: this.userId
        }
    }
}

Contact.findContacts = async function(userId) {
    const contacts = await ContactModel.find({ userCreat: userId })
        .sort({ date: 1 })
    return contacts
}

Contact.delete = async function(contactId) {
    const contact = await ContactModel.findByIdAndDelete(contactId)
    return contact
}

module.exports = Contact