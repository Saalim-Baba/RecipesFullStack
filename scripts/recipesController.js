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
        let german = []
        for (let y = 0; y < titles.length; y++){
            for (let i = 0; i < titles[y].length; i++){
                console.log(recipes.titles[y][i].name)
                german.push(recipes.titles[y][i].name)
            }
        }
        response.json(german + titles);
})
module.exports = router