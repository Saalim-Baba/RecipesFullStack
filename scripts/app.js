const express = require('express')
const app = express()
const port = 3000
const securityController = require('./securityController.js')
const recipesController = require('./recipesController.js')
const session = require('express-session')
const swaggerUi= require('swagger-ui-express');
const path = require("path");

app.use(session({
    secret: '101recipes_are_not_safe101',
    resave: true,
    saveUninitialized: true,
    cookie: {}
}))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static("./public"));
app.use('/recipes', recipesController)
app.use('', securityController)
app.use('/images', express.static(path.join(__dirname,'images')));
app.use('/css', express.static(path.join(__dirname, 'css')));

app.listen(port, () => {
    console.log(`Server läuft auf Port: ${port}`)
})

