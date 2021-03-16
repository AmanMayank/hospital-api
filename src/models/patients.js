const mongoose = require ('mongoose')

const patientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    phoneNo:{
        type:String,
        required:true,
        trim:true,
        minlength:10
    }
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports=Patient