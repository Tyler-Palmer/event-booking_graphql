const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 9000
require('dotenv').config()
const path = require("path")
const bodyParser = require('body-parser')

const app = express()

//Middleware
app.use(express.json())

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "build")))

app.use(bodyParser.json())

//Connect to the DB

mongoose.connect(process.env.MONGOD_URI || 'mongodb://localhost:27017/graphql-test', {useNewUrlParser: true, useCreateIndex: true}, () => {
    console.log("db connected, cap'n!")
}).catch(err => console.log(err))

//Global Error handler

app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

//Listening
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})