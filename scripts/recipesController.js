const express = require('express');
const path = require('path');
const router = express.Router();
const recipes = require("./recipes.json");


router.get('/home', (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'overview.html'));
});

router.get("/overview", (request, response) => {
    const titles = Object.keys(recipes);
    let german = "";
    for (let y = 0; y < titles.length; y++) {
        for (let i = 0; i < recipes[titles[y]].length; i++) {
            german += recipes[titles[y]][i].name;
        }
    }
    response.json(german);
});


module.exports = router;

