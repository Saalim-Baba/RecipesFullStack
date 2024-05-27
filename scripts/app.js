const express = require('express')
const app = express()
const port = 3000
const securityController = require('./securityController.js')
const recipesController = require('./recipesController.js')
const session = require('express-session')
const swaggerUi= require('swagger-ui-express');

app.use(session({
    secret: '101recipes_are_not_safe101',
    resave: true,
    saveUninitialized: true,
    cookie: {}
}))
app.use(express.json())
app.use('/recipes', recipesController)
app.use('', securityController)

app.listen(port, () => {
    console.log(`Server läuft auf Port: ${port}`)
})

