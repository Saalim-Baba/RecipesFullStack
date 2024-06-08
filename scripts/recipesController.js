const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const recipes = require("./recipes.json");


const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        const genre = request.params.type;
        const upload_path = path.join(__dirname, 'images', genre);
        cb(null, upload_path);
    },
    filename: (request, file, cb) => {
        cb(null, Object.entries(request.body)[0][1] + ".jpg");
    }
});
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
    console.log(recipe)
    recipe_genre.forEach(i => {
        if (i.name == recipe){
            response.json(i.name)
        }
    })
})

const upload = multer({ storage: storage });
router.post("/:type", upload.single("form_image"), (request, response) =>{
    const type = request.params.type
    const form_data = Object.entries(request.body)
    let recipe_genre
    Object.keys(recipes).forEach(genre =>{
        if(genre.toLowerCase() === type.toLowerCase()){
            recipe_genre = recipes[genre]
        }
    })
    const name = (form_data[0])[1]
    const ingredients = form_data[1][1].split(",")
    const instructions = (form_data[2])[1]
    recipe_genre.push({"name" : name, "ingredients": ingredients, "instructions": instructions})
    response.sendStatus(200)
})
module.exports = router;

