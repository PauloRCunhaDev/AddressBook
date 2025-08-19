const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const CountSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const CountModel = mongoose.model('Count', CountSchema)

class Count {
    constructor(body) {
        this.body = body
        this.errors = []
        this.user = null
    }

    async login() {
        this.checkDataLogin()
        if(this.errors.length > 0) return

        this.user = await CountModel.findOne({ email: this.body.email })

        if(!this.user) {
            this.errors.push('Esse usuário não existe')
            return
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha incorreta')
            this.user = null
            return
        }
    }

    async register() {
        this.checkDataRegister()
        if(this.errors.length > 0) return

        await this.userExist()
        if(this.errors.length > 0) return

        
        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt)
        this.user = await CountModel.create(this.body)
    }

    async userExist() {
        this.user = await CountModel.findOne({ email: this.body.email })

        if(this.user) this.errors.push('Esse e-mail já foi utilizado')
    }

    checkDataLogin() {
        this.cleanUp()

        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail Invalido')
    }

    checkDataRegister() {
        this.cleanUp()

        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail Invalido')

        if(this.body.password.length < 5 || this.body.password.length > 30) this.errors.push('Senha devera ter entre 5 a 30 caracteres')
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Count