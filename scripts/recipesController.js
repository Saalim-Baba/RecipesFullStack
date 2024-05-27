const express = require('express')
const fs = require("fs")
const router = express.Router()
const recipes = require("./recipes.json")


router.get("/home", (request, response) => {
    response.send((fs.appendFileSync(__dirname + "index.html")))
    }
)
router.get("/overview", (request, response) => {
        const titles = Object.keys(recipes);
        response.json(titles);
})
module.exports = router