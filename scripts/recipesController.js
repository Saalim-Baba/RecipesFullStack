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
        const fileExt = path.extname(file.originalname);
        cb(null, `${foodName}${fileExt}`);


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
    let recipe_genre = getGenreType(type)
    const recipe = request.params.recipe
    const index = recipe_genre.findIndex(b => b.name === recipe)
    recipe_genre.splice(index, 1)
    response.json(recipes)

})
const fileFilter = (req, file, cb) => {
    if (!file){
        return cb(new Error('No file uploaded'), false)
    }
    if (!file.originalname.match(/\.(jpg)$/)) {
        return cb(new Error('Only JPG files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/:type", upload.single("form_image"), (request, response) =>{
    const type = request.params.type
    const form_data = Object.entries(request.body)
    let recipe_genre = getGenreType(type)
    const name = (form_data[0])[1]
    const ingredients = form_data[1][1].split(",")
    const instructions = (form_data[2])[1]
    if (recipe_genre){
        recipe_genre.push({"name" : name, "ingredients": ingredients, "instructions": instructions})
        response.sendStatus(200)
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
                } else {
                    console.log('Old image deleted successfully.');
                }
            });
        }
        recipe.image = request.file.filename;
    }
    response.send("Recipe updated successfully");
});

module.exports = router;

