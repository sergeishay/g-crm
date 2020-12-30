const clientRoute =require('./api/clientRoute')
const brendtRoute =require('./api/brendRoute')
const postRoute =require('./api/postRoute')
const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})

app.use('/api/clients/', clientRoute)
app.use('/api/brends/', brendtRoute)
app.use('/api/posts/', postRoute)



const port = process.env.PORT || 8080
app.listen(port, () => console.log(`server up and running on port ${port}`))