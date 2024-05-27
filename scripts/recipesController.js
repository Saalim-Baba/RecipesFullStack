const express = require('express')
const fs = require("fs")
const path = require("path")
const router = express.Router()
const recipes = require("./recipes.json")


router.use(express.static('../images'))
router.get('/home', (request, response) => {
    response.sendFile((__dirname + '/overview.html'));
});
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