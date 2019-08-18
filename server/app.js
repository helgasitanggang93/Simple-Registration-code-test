const express = require('express')
const app = express()
const port = 3000
const userRouter = require('./routes')
const cors = require('cors')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use('/', userRouter)
app.listen(port, function(){
    console.log(`listening on port ${port}`);
    
})

