const express = require('express');
const path = require('path');
const router = express.Router();
const recipes = require("./recipes.json");


router.get('/home', (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'overview.html'));
});

router.get('/data', (request, response) => {
    response.json(recipes)
});


router.get("/:type", (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.get("/:type/:recipe", (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.delete("/:type", (request, response) =>{
    const type = request.params.type
    Object.keys(recipes).forEach(genre =>{
        if(genre.toLowerCase() === type.toLowerCase()){
            response.json(genre)
        }
    }
    )

})

module.exports = router;

