const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const recipes = require("./recipes.json");
const fs = require("fs")
function getGenreType(type){
    let result
    Object.keys(recipes).forEach(genre =>{
        if(genre.toLowerCase() === type.toLowerCase()){
            result = recipes[genre]
        }
    })
    if (result){
        return result
    }
}

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        const genre = request.params.type;
        const upload_path = path.join(__dirname, 'images', genre);
        cb(null, upload_path);
    },
    filename: function (request, file, cb) {
        const foodName = (Object.entries(request.body)[0])[1]
        cb(null, `${foodName}.webp`);
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
    const type = request.params.type;
    if (!type) {
        return response.status(400).send("Recipe type is required.");
    }

    let recipe_genre = getGenreType(type);
    if (!recipe_genre) {
        return response.status(404).send(`No recipes found for type '${type}'.`);
    }

    const recipeName = request.params.recipe;
    if (!recipeName) {
        return response.status(400).send("Recipe name is required.");
    }

    const index = recipe_genre.findIndex(b => b.name === recipeName);
    if (index === -1) {
        return response.status(404).send(`Recipe '${recipeName}' not found in '${type}'.`);
    }

    recipe_genre.splice(index, 1);
    response.status(200).send("Deletion complete")

})
const fileFilter = (req, file, cb) => {
    if (!file){
        return cb(new Error('No file uploaded'), false)
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/:type", upload.single("form_image"), (request, response) =>{
    try {
        const type = request.params.type;
        if (!type) {
            return response.status(400).send("Recipe type is required in the URL parameters.");
        }
        const form_data = Object.entries(request.body);
        if (form_data.length < 3) {
            return response.status(400).send("Incomplete recipe data. Ensure name, ingredients, and instructions are provided.");
        }
        let recipe_genre = getGenreType(type);
        if (!recipe_genre) {
            return response.status(404).send(`Recipe type '${type}' is not supported.`);
        }
        const name = form_data[0][1];
        if (!name) {
            return response.status(400).send("Recipe name is required.");
        }
        const ingredients = form_data[1][1].split(",");
        if (ingredients.length === 0 || ingredients[0] === "") {
            return response.status(400).send("At least one ingredient is required.");
        }
        const instructions = form_data[2][1];
        if (!instructions) {
            return response.status(400).send("Instructions are required.");
        }
        recipe_genre.push({ "name": name, "ingredients": ingredients, "instructions": instructions });
        response.sendStatus(200);
    } catch (error) {
        console.error(error);
        response.status(500).send("An error occurred while processing your request.");
    }

})



const uploadPatch = multer({ storage: storage, fileFilter: fileFilter})
router.patch("/:type/:recipe", uploadPatch.single("form_image"), (request, response) => {
    const type = request.params.type;
    const recipe = request.params.recipe;
    let recipe_genre = getGenreType(type);
    const form_data = Object.entries(request.body);
    const name = form_data[0][1];
    const ingredients = form_data[1][1].split(",");
    const instructions = form_data[2][1];
    const formattedName = recipe.replace(/_/g, ' ');
    const result = recipe_genre.findIndex(b => b.name === formattedName);

    if (result === -1) {
        return response.status(404).send("Recipe not found");
    }

    const data = recipe_genre[result];
    if (name !== formattedName){
        fs.unlink(path.join(__dirname,`/images/${type}/${formattedName}.jpg`), (err) => {
            if (err) {
                console.error('Error deleting old image:', err);
                response.status(400).send(err);
            } else {
                console.log('Old image deleted successfully.');
            }
        });
    }
    data.name = name;
    data.ingredients = ingredients;
    data.instructions = instructions;

    if (request.file) {
        const oldImagePath = path.join(__dirname, `/images/${type}/${recipe.name}.jpg`);
        if (fs.existsSync(oldImagePath) && oldImagePath !== request.file.path) {
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error('Error deleting old image:', err);
                    response.status(400).send(err);
                } else {
                    console.log('Old image deleted successfully.');
                }
            });
        }
        recipe.image = request.file.filename;
    }
    else{
        response.status(404).send("Not found");
    }
    response.status(200).send("Recipe updated successfully");
});

module.exports = router;

