const express = require('express')
const router = new express.Router
const Doctor = require('../models/doctor')
const auth = require ('../middleware/auth')

//Register a doctor
router.post('/doctors/register', async (req,res) => {
    const user = new Doctor(req.body)

    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token})
    }catch(e){
        res.status(400).send(e)
    }
    
})

//Path for login for Doctors
router.post('/doctors/login', async(req,res) => {
    try{
        const user = await Doctor.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token})
    }catch(e){
        res.status(400).send()
    }
})


//Fetch doctor's profile
router.get('/doctors/me', auth, async (req,res) => {
    res.send(req.doctor)
})

module.exports = router