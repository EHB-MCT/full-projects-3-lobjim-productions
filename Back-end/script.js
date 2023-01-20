const express = require('express')
const app = express()
const {
    MongoClient
} = require('mongodb')

require('dotenv').config()
    --
const client = new MongoClient(process.env.URL)
const port = process.env.PORT

const cors = require('cors')


app.use(cors())
app.use(express.json())



app.listen(port, () => {
    console.log(`This app is runnning on port ${port}`)
})