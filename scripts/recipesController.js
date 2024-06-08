const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const recipes = require("./recipes.json");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

router.delete("/:type/:recipe", (request, response) =>{
    const type = request.params.type
    const recipe = request.params.recipe
    let recipe_genre;
    Object.keys(recipes).forEach(genre =>{
        if(genre.toLowerCase() === type.toLowerCase()){
            recipe_genre = recipes[genre]
        }
    }
    )
    let result;
    console.log(recipe)
    recipe_genre.forEach(i => {
        if (i.name == recipe){
            response.json(i.name)
        }
    })
})

const upload = multer({storage})

router.post("/:type", upload.single("form_image"), (request, response) =>{
    const type = request.params.type
    const file = request.file
    let recipe_genre
    Object.entries(request.body).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });
    if (file) {
        console.log('Uploaded File Name:', file.originalname);
    }
    Object.keys(recipes).forEach(genre =>{
        if(genre.toLowerCase() === type.toLowerCase()){
            recipe_genre = recipes[genre]
        }
    })


})
module.exports = router;

