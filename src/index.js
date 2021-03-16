const express = require ('express')
require('./db/mongoose')

//Routers
const doctorRouter = require('./routers/doctor')
const patientRouter = require('./routers/patients')
const reportRouter = require('./routers/report')
 
const app = express()
const port = process.env.port || 3000

app.use(express.json())

app.use(doctorRouter)
app.use(patientRouter)
app.use(reportRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})