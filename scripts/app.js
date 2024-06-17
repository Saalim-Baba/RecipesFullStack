const express = require('express')
const app = express()
const port = 4000
const recipesController = require('./recipesController.js')
const session = require('express-session')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../documentation/swagger-output.json');
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
app.use('/images', express.static(path.join(__dirname,'images')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

