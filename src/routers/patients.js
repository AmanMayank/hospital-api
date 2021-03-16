const express = require('express')
const router = new express.Router
const Patient = require('../models/patients')
const auth = require('../middleware/auth')

//Fetch patient by ID
router.get('/patients/:id', auth, async (req,res) => {
    const _id = req.params.id

    try{
        const patient = await Patient.findById(_id)
        if(!patient){
            return res.status(404).send()
        }
        res.send(patient)
    }catch(e){
        res.status(500).send(e)
    }
})

//Register a patient or send the result back if already existing
router.post('/patients/register', auth,  async(req,res) => {
    
    const searchUser = await Patient.find({phoneNo : req.body.phoneNo})
    if(searchUser.length!=0){
        return res.status(201).send(searchUser)
    }else{
        const user = new Patient(req.body)
        try{
            await user.save()
            res.status(201).send(user)
        }catch(e){
            res.status(400).send(e)
        }
    }
    
})


module.exports = router
