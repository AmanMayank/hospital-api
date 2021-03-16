const mongoose = require ('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const doctorSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim:true
    },
    age:{
        type : Number,
        default:0,
        validate(value){
            if(value<0){
                throw new error('You cannot be born before your time!')
            }
        }
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid!')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Lol!Be creative, chose a different password!')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

doctorSchema.methods.generateAuthToken = async function () {
    const doctor = this
    const token = jwt.sign({_id : doctor._id.toString()}, 'hospitalapi')

    doctor.tokens = doctor.tokens.concat({ token })
    await doctor.save()

    return token
}

doctorSchema.statics.findByCredentials = async(email, password) => {
    const user = await Doctor.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }else{
        if(user.password!==password){
            throw new Error('Unable to Login')
        }
        return user
    }

}

const Doctor = mongoose.model('Doctor', doctorSchema)

module.exports = Doctor