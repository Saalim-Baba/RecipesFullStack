document.addEventListener("DOMContentLoaded", function () {
    const sideBar = document.getElementById("side-bar-menu");
    const hamburgerButton = document.getElementById("reveal_side_bar");
    const sideBarButtons = document.querySelectorAll("#side-bar-menu > a");
    const bodyElement = document.getElementById("css-body");
    const loaderElement = document.getElementById("loader");
    const currentUrl = window.location.href;
    const urlParams = currentUrl.split("/");
    const recipeGenre = urlParams[urlParams.length - 1];
    const recipeName = urlParams[urlParams.length - 2];
    const revealButton = document.getElementById("options");
    const pointerElement = document.getElementById("pointer");
    const recipesContainer = document.getElementById("recipes");
    const formContainer = document.getElementById("form");
    const formName = document.getElementById("form_name");
    const formIngredients = document.getElementById("form_ingredients");
    const formInstructions = document.getElementById("form_instructions");
    const formTitle = document.getElementById("form_title");
    const formImage = document.getElementById("form_image");
    const cancelButton = document.getElementById("form_cancel");
    const modalDialog = document.getElementById("delete_modal");
    const closeModalButtons = document.querySelectorAll(".close_modal");
    const formElement = document.querySelector(".form");
    const ingredientsListElement = document.getElementById('form_ingredients_list');
    const ingredients = [];



    /**
     FUNCTIONS are declared here till fetch
     */
    function showcase_buttons() {
        /**
         Extends the buttons of the revealButtons by changing their width attribute
         */
        const revealDivs = document.querySelectorAll('.reveal-div');
        const revealPara = document.querySelectorAll('.reveal-div>p');
        revealDivs.forEach((div, index) => {
            if (div.classList.contains('w-0')) {
                div.classList.replace('w-0', 'w-16');
                div.classList.add("border-8" ,"font-bold")
                revealPara[index].classList.replace('opacity-0', 'opacity-100');
                revealPara[index].classList.remove("hidden")
                pointerElement.classList.add('-rotate-90');
            } else {
                div.classList.replace('w-16', 'w-0');
                div.classList.remove("border-8", "font-bold")
                revealPara[index].classList.replace('opacity-100', 'opacity-0');
                revealPara[index].classList.add("hidden")
                pointerElement.classList.remove('-rotate-90');
            }
        })}
    function add_ingredient(event) {
        /**
         Adds ingredients visually to the form and adding the recipe into an array to send to the backend
         You can delete the ingredient with the created x button
         */
        event.preventDefault();
        const input = document.getElementById('form_ingredients');
        const ingredient = input.value.trim();
        if (ingredient) {
            const ingredient_container = document.createElement('div');
            const ingredientItem = document.createElement('p');
            const removeItem = document.createElement('button');
            ingredient_container.className = 'flex bg-gray-100 border border-gray-300 rounded-lg px-3 py-2';
            removeItem.classList.add("ml-auto", "removeItem")
            removeItem.textContent = "x"
            removeItem.setAttribute("type", "button")
            ingredientItem.textContent = ingredient;
            ingredient_container.appendChild(ingredientItem)
            ingredient_container.appendChild(removeItem)
            ingredientsListElement.appendChild(ingredient_container);
            ingredients.push(ingredient)
            input.value = '';
            removeItem.addEventListener("click", function (){
                delete_ingredients(removeItem)})
        }}
    function showcase_sidebar(){
        /**
         Extends the sidebar on the left upper corner with a height change of the buttons
         */
        sideBarButtons.forEach(button => {
            if (button.classList.contains('h-0')) {
                button.classList.replace('h-0', 'h-16');
            } else {
                button.classList.replace('h-16', 'h-0');
            }
        });
    }
    function create_buttons(array){
        /**
         Creates the buttons on the right side corner, including the following options depending on which side you are
         {edit, add, remove} they get assigned id to identify which one is which
         editButton = button_1
         addButton = button_2
         removeButton = button_3
         */
        let options
        for (let i = 0; i < array.length; i++) {
            const button = document.createElement('button');
            const div = document.createElement('div');
            const paragraph = document.createElement('p');
            div.classList.add("reveal-div")
            div.classList.add('w-0', 'h-16', 'bg-gray-300', 'rounded-full', 'flex', 'justify-center', 'items-center', 'z-0', 'transition-all', 'duration-300', 'ease-out');
            div.id = `button_${i + array.length}`
            if (i === array.length-1){
                /*
                Edit button needs a margin to now be under the revealButton
                 */
                div.classList.add('mr-16')
            }

            paragraph.classList.add("text-xs",'opacity-0', 'transition-opacity', 'duration-100', 'z-0', "hidden");
            paragraph.innerText = array[i]

            options = document.getElementById("buttons_reveal")
            div.appendChild(paragraph);
            button.appendChild(div);
            options.appendChild(button);
        }
        return options
    }

    function delete_ingredients(remover){
        (remover.parentElement).remove()
        let ingredient = (remover.previousSibling).innerHTML
        let index = ingredients.indexOf(ingredient);
        if (index !== -1) {
            ingredients.splice(index, 1);
        }
        console.log(ingredients)
    }

    function hide_removers(){
        const removers = document.querySelectorAll(".remover")
        removers.forEach( remover => remover.classList.add("hidden"))
    }


    /**
     FETCH
     This is for the display of the recipes in the overview of all recipes inside a genre and if the URL has
     the name of the recipe in the domain it'll create a node only for the specific recipe
     Note: The variable name is not chosen smartly, that's why it's reassigned in the else statement for better
     understanding of the code.
     */
    fetch('/recipes/data')
            .then(response => response.json())
            .then(data => {

                const titles = Object.keys(data);
                if (recipeName === "recipes") {
                    create_buttons(["Add", "Remove"])
                    titles.forEach(title => {
                        if (title.toLowerCase() === recipeGenre){
                            data[title].forEach(recipe => {
                                const nodeRemover = document.createElement("div")
                                const node = document.createElement("div");
                                const nodeImage = document.createElement("img");
                                const nodeName = document.createElement("h3");
                                const link = document.createElement("a");
                                node.classList.add("border-2", "gap-x-10", "flex", "flex-col", "items-center", "transition-transform", "duration-300", "ease-in-out", "transform", "hover:scale-110", "recipe_container");
                                recipesContainer.classList.add("flex", "flex-row", "flex-wrap", "font-serif", "justify-start", "py-11", "md:p-0", "[&>div>a>div>h3]:p-5", "[&>div>a>div]:w-[220px]", "gap-y-5", "gap-x-5", "[&>div>a>div:not(:last-child)]:lg:space-x-4", "mt-11", "ml-14");
                                nodeImage.src = `../images/${recipeGenre}/${recipe.name}.webp`;
                                nodeImage.classList.add("object-contain", "h-auto", "w-auto", "draggable", "false", "w-[216px]", "h-[216px]");
                                nodeName.innerText = recipe.name;
                                const formattedName = (recipe.name).replace(/\s+/g, '_');
                                const remover = document.createElement("button");
                                remover.innerText = "x";
                                remover.classList.add("remover", "hidden", "pointer-events-auto", "border", "rounded-full", "bg-gray-300", "px-2.5", "absolute", "pb-0.5", "ml-48", "z-50", "transition-transform", "duration-300", "ease-in-out", "transform", "hover:scale-125");

                                nodeRemover.appendChild(remover)
                                node.appendChild(nodeImage);
                                node.appendChild(nodeName);
                                link.href = `/recipes/${recipeGenre}/${formattedName}`;
                                link.appendChild(node);
                                nodeRemover.appendChild(link);
                                recipesContainer.appendChild(nodeRemover);
                                const addButton = document.getElementById("button_2")
                                const deleteButton = document.getElementById("button_3")
                                const recipesDiv = document.querySelectorAll(".recipe_container")
                                closeModalButtons.forEach(close => close.addEventListener("click", function(){
                                    modalDialog.classList.add("hidden")
                                    recipesDiv.forEach(recipe => {
                                        recipe.classList.remove("animate-wiggle")
                                        recipe.classList.add("hover:scale-110")
                                    })
                                }))
                                if (addButton){
                                    addButton.addEventListener("click", function (){
                                        recipesContainer.classList.add("hidden")
                                        formContainer.classList.remove("hidden")
                                        formTitle.innerText = "New Recipe"
                                        formElement.reset()
                                        ingredients.length = 0
                                        ingredientsListElement.innerHTML = ''
                                        formContainer.classList.replace('opacity-0', 'opacity-100');
                                    })

                                    deleteButton.addEventListener("click", function (){
                                        const removers = document.querySelectorAll(".remover")
                                        recipesDiv.forEach(recipe => {
                                            recipe.classList.remove("hover:scale-110")
                                            recipe.classList.add("animate-wiggle")
                                        })
                                        removers.forEach(remover =>{
                                            remover.classList.remove("hidden")
                                        })
                                    })
                                    remover.addEventListener('click', () => {
                                        /**
                                         Because this is kind of confusing I'll elaborate here
                                         The remove button on the corner of the recipe card is on the same hierarchy as the div
                                         You go into that sibling and to the first child which is the div, then you go to the firstChild which is the
                                         image, but I need the name of the recipe, so I go to the nextSibling which is the h3 that contains the name
                                         */
                                        hide_removers()
                                        modalDialog.classList.remove("hidden")
                                        const closeModal = document.getElementById("modal_confirm")
                                        closeModal.addEventListener("click", function (event){
                                            event.preventDefault()
                                            const recipeNameDelete = (remover.nextSibling.firstChild.firstChild.nextSibling).textContent
                                            fetch(`${currentUrl}/${encodeURIComponent(recipeNameDelete)}`, {
                                                method: 'DELETE',
                                                body: recipeNameDelete
                                            }).then(res => res.json())
                                                .then(data => console.log(data))
                                            window.location.reload()
                                        })

                                    });

                                }
                            })
                        }
                    });
                } else {
                    /**
                     This is for the specific recipes, the variable names are not ideal but will be renamed in this function
                     for better readability.
                     It's iterating through the titles then through all the recipes inside the genre. If the recipe is found it'll create
                     a div and a display of it
                     */
                    const recipeGenre = urlParams[urlParams.length - 2];
                    const recipeName = urlParams[urlParams.length - 1];
                    titles.forEach(title => {
                        if (title.toLowerCase() === recipeGenre) {
                            data[title].forEach(recipe => {
                                if (recipe.name === recipeName.replace(/_/g, ' ')) {
                                    const node = document.createElement("div");
                                    const nodeImage = document.createElement("img");
                                    const nodeName = document.createElement("h3");
                                    const ingredientContainer = document.createElement("div")
                                    const ingredientTitle = document.createElement("h1")
                                    const node_ingredients = document.createElement("ul")
                                    const descriptionTitle = document.createElement("h1")
                                    const nodeDescription = document.createElement("p")
                                    node.classList.add("border-4", "gap-x-10", "flex", "flex-col", "items-center", "w-full", "max-w-4xl");
                                    recipesContainer.classList.add(
                                        "flex", "flex-row", "flex-wrap", "font-serif", "justify-center",
                                        "py-11", "md:p-0", "[&>div>h3]:p-5", "[&>div]:w-[1050px]",
                                        "gap-y-5", "[&>div:not(:last-child)]:lg:space-x-4", "mt-11",
                                         "w-full"
                                    );
                                    nodeImage.src = `/images/${recipeGenre}/${recipe.name}.webp`;
                                    nodeImage.classList.add("mt-10", "border-4")
                                    nodeName.innerText = recipe.name
                                    document.title = recipe.name
                                        nodeImage.width = 350
                                    recipe.ingredients.forEach(ingredient => {
                                        const item = document.createElement("li");
                                        item.innerText = ingredient;
                                        node_ingredients.appendChild(item);
                                    });
                                    nodeDescription.innerText = recipe.instructions;
                                    ingredientContainer.classList.add("h-30")
                                    nodeName.classList.add("text-2xl", "font-semibold", "mb-4");
                                    node_ingredients.classList.add("grid", "grid-cols-2", "gap-4", "self-start",  "p-4");
                                    nodeDescription.classList.add("flow-root", "p-10", "w-[500px]");
                                    ingredientTitle.innerText = "Ingredients:"
                                    ingredientTitle.classList.add("text-xl", "self-start", "ml-10")
                                    descriptionTitle.innerText = "Instructions:"
                                    descriptionTitle.classList.add("text-xl", "self-start", "ml-10")
                                    create_buttons(["Edit"])
                                    ingredientContainer.appendChild(node_ingredients)
                                    node.appendChild(nodeImage);
                                    node.appendChild(nodeName);
                                    node.appendChild(ingredientTitle)
                                    node.appendChild(ingredientContainer);
                                    node.appendChild(descriptionTitle)
                                    node.appendChild(nodeDescription);
                                    recipesContainer.appendChild(node);
                                    const edit_button = document.getElementById("button_1")
                                    if (edit_button){
                                        edit_button.addEventListener("click", function (){
                                            recipesContainer.classList.add("hidden")
                                            formContainer.classList.remove("hidden")
                                            formTitle.innerText = "Edit Recipe"
                                            formName.value = recipe.name
                                            formInstructions.value = recipe.instructions
                                            for (let i=0; i<(recipe.ingredients).length; i++){
                                                formIngredients.value = (recipe.ingredients)[i]
                                                let event = new KeyboardEvent('keydown', {
                                                    bubbles: true,
                                                    cancelable: true,
                                                    key: 'Enter',
                                                    code: 'Enter',
                                                    keyCode: 13
                                                });
                                                add_ingredient(event);
                                            }
                                            /**
                                             Fetches the image and places it in the file drop if user wants to keep the file and not change it
                                             Of-course if the user wants to change the image, he can.
                                             */
                                            fetch(nodeImage.src)
                                                .then(response => {
                                                    if (!response.ok) {
                                                        throw new Error('Network response was not ok');
                                                    }
                                                    return response.blob();
                                                })
                                                .then(blob => {
                                                    console.log('Blob size:', blob.size);
                                                    const file = new File([blob], `${recipe.name}.webp`, { type: 'image/webp' });
                                                    const dataTransfer = new DataTransfer();
                                                    dataTransfer.items.add(file);
                                                    formImage.files = dataTransfer.files;
                                                })
                                                .catch(error => console.error('Error fetching or processing image:', error));

                                            formContainer.classList.replace('opacity-0', 'opacity-100');
                                        })
                                        if (edit_button){
                                            formElement.addEventListener("submit", event => {
                                                event.preventDefault();
                                                const formData = new FormData(formElement);
                                                formData.set("form_ingredients", ingredients)
                                                fetch(`${currentUrl}`, {
                                                    method: 'PATCH',
                                                    body: formData
                                                }).then(res => res.json())
                                                    .then(data => console.log(data))
                                                window.location.reload()
                                            }) }
                                    }
                                }
                            })
                        }
                    })
                }}).catch(error => console.error('Error fetching recipes:', error));


    /**
     addEventListener are declared from here
     */
    hamburgerButton.addEventListener("click", showcase_sidebar)
    if (revealButton){
        revealButton.addEventListener('click', showcase_buttons)
    }

    window.addEventListener('load', function() {
        loaderElement.style.display = "none"
        bodyElement.style.display = "inline"
        sideBarButtons.forEach(button =>
        button.classList.add("w-52","hover:bg-gray-200"))

    });
    document.addEventListener("click", function (event){
        if (!(hamburgerButton.contains(event.target) || sideBar.contains(event.target)||revealButton.contains(event.target))){
            if (pointerElement.classList.contains("-rotate-90")){
                showcase_buttons()
            }
            sideBarButtons.forEach(button =>{
            if (button.classList.contains("h-16")){
                showcase_sidebar()
            }
            })
        }

    });
    const input = document.getElementById('form_ingredients');
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            add_ingredient(event);
        }
    });

    cancelButton.addEventListener("click", function (){
        formContainer.classList.replace('opacity-100', 'opacity-0');
        recipesContainer.classList.remove("hidden")
        formContainer.classList.add("hidden")
    })
    formElement.addEventListener("submit", event => {
        event.preventDefault();
        const formData = new FormData(formElement);
        formData.set("form_ingredients", ingredients)

        fetch(`${currentUrl}`, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(data => console.log(data))
        window.location.reload()
    });



})