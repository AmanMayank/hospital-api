const express = require('express')
const router = new express.Router
const Report = require('../models/report')
const auth = require('../middleware/auth')


//Path to create a patient report
router.post('/patients/:id/create_report', auth ,async(req,res) => {
    const _id = req.params.id
    const report = new Report({
        ...req.body,
        createdByDoctor : req.doctor.name, 
        patient : _id

    })

    try{
        await report.save()
        res.status(201).send(report)
    }catch(e){
        res.status(201).send(e)
    }
})

//Path to list all the reports of a patient oldest to latest
router.get('/patients/:id/all_reports', auth, async(req,res) => {
    const _id = req.params.id
    try{
        const reports = await Report.find({'patient':_id}).sort({date: 'desc'})
        if(!reports){
            return res.status(400).send()
        }
        res.send(reports)
    }catch(e){
        res.status(500).send(e)
    }
    
})

//Path to list all the reports of all the patients filtered by a specific status

router.get('/reports/:status', auth , async(req,res) => {
    const _status = req.params.status
    try{
        const reports = await Report.find({'status':_status})
        if(!reports){
            return res.status(400).send()
        }
        res.send(reports)
    }catch(e){
        res.status(500).send(e)
    }
})


module.exports = router