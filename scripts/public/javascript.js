document.addEventListener("DOMContentLoaded", function () {
    const side_bar = document.getElementById("side-bar-menu");
    const hamburger_button = document.getElementById("reveal_side_bar");
    const side_bar_buttons = document.querySelectorAll("#side-bar-menu>a");
    const body = document.getElementById("css-body");
    const loader = document.getElementById("loader")
    const param = (window.location.href).split("/")
    const recipe_genre = param[param.length-1]
    const recipe_name = param[param.length-2]
    const reveal_button =document.getElementById("options")
    const pointer = document.getElementById("pointer")
    const recipesContainer = document.getElementById("recipes");
    const formContainer = document.getElementById("form")
    const form_name = document.getElementById("form_name")
    const form_ingredients = document.getElementById("form_ingredients")
    const form_instructions = document.getElementById("form_instructions")
    const form_title = document.getElementById("form_title")
    const form_img = document.getElementById("form_image")
    const cancel_button = document.getElementById("form_cancel")
    const modal_dialoge = document.getElementById("delete_modal")
    const close_modal = document.querySelectorAll(".close_modal")
    const ingredients = []


    /**
     FUNCTIONS are declared here till fetch
     */
    function showcase_buttons() {
        const revealDivs = document.querySelectorAll('.reveal-div');
        const revealpara = document.querySelectorAll('.reveal-div>p');
        revealDivs.forEach((div, index) => {
            if (div.classList.contains('w-0')) {
                div.classList.replace('w-0', 'w-16');
                div.classList.add("border-8" ,"font-bold")
                revealpara[index].classList.replace('opacity-0', 'opacity-100');
                revealpara[index].classList.remove("hidden")
                pointer.classList.add('-rotate-90');
            } else {
                div.classList.replace('w-16', 'w-0');
                div.classList.remove("border-8", "font-bold")
                revealpara[index].classList.replace('opacity-100', 'opacity-0');
                revealpara[index].classList.add("hidden")
                pointer.classList.remove('-rotate-90');
            }
        })}
    function add_ingredient(event) {
        event.preventDefault();
        const input = document.getElementById('form_ingredients');
        const ingredient = input.value.trim();
        if (ingredient) {
            const ingredientList = document.getElementById('form_ingredients_list');
            const ingredient_container = document.createElement('div');
            const ingredientItem = document.createElement('p');
            const remove_item = document.createElement('button');
            ingredient_container.className = 'flex bg-gray-100 border border-gray-300 rounded-lg px-3 py-2';
            remove_item.classList.add("ml-auto", "remove_item")
            remove_item.textContent = "x"
            remove_item.setAttribute("type", "button")
            ingredientItem.textContent = ingredient;
            ingredient_container.appendChild(ingredientItem)
            ingredient_container.appendChild(remove_item)
            ingredientList.appendChild(ingredient_container);
            ingredients.push(ingredient)
            input.value = '';
            remove_item.addEventListener("click", function (){
                delete_ingredients(remove_item)})
        }}
    function showcase_sidebar(){
        side_bar_buttons.forEach(button => {
            if (button.classList.contains('h-0')) {
                button.classList.replace('h-0', 'h-16');
            } else {
                button.classList.replace('h-16', 'h-0');
            }
        });
    }
    function create_buttons(array){
        let options
        for (let i = 0; i < array.length; i++) {
            console.log(i)
            const button = document.createElement('button');
            const div = document.createElement('div');
            div.classList.add("reveal-div")
            options = document.getElementById("buttons_reveal")
            if (i === array.length-1){
                div.classList.add('mr-16')
            }
            div.classList.add('w-0', 'h-16', 'bg-gray-300', 'rounded-full', 'flex', 'justify-center', 'items-center', 'z-0', 'transition-all', 'duration-300', 'ease-out');
            div.id = `button_${i + array.length}`
            const paragraph = document.createElement('p');
            paragraph.classList.add("text-xs",'opacity-0', 'transition-opacity', 'duration-100', 'z-0', "hidden");
            paragraph.innerText = array[i]
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
                console.log(data);
                const titles = Object.keys(data);
                if (recipe_name === "recipes") {
                    create_buttons(["Add", "Remove"])
                    titles.forEach(title => {
                        if (title.toLowerCase() === recipe_genre){
                            data[title].forEach(recipe => {
                                const node_remover = document.createElement("div")
                                const node = document.createElement("div");
                                const node_img = document.createElement("img");
                                const node_name = document.createElement("h3");
                                const link = document.createElement("a");
                                node.classList.add("border-2", "gap-x-10", "flex", "flex-col", "items-center", "transition-transform", "duration-300", "ease-in-out", "transform", "hover:scale-110", "recipe_container");
                                recipesContainer.classList.add("flex", "flex-row", "flex-wrap", "font-serif", "justify-start", "py-11", "md:p-0", "[&>div>a>div>h3]:p-5", "[&>div>a>div]:w-[220px]", "gap-y-5", "gap-x-5", "[&>div>a>div:not(:last-child)]:lg:space-x-4", "mt-11", "ml-14");
                                node_img.src = `../images/${recipe_genre}/${recipe.name}.jpg`;
                                node_img.classList.add("object-contain", "h-auto", "w-auto", "draggable", "false");
                                node_name.innerText = recipe.name;
                                const formattedname = (recipe.name).replace(/\s+/g, '_');
                                const remover = document.createElement("button");
                                remover.innerText = "x";
                                remover.classList.add("remover", "hidden", "pointer-events-auto", "border", "rounded-full", "bg-gray-300", "px-2.5", "absolute", "pb-0.5", "ml-48", "z-50", "transition-transform", "duration-300", "ease-in-out", "transform", "hover:scale-125");
                                remover.addEventListener('click', (event) => {
                                    /**
                                     Because this is kind of confusing ill elaborate here
                                     The remove button on the corner of the recipe card is on the same hierachy as the div
                                     You go into that sibling and to the first child which is the div, then you go to the firstChild which is the
                                     image, but I need the name of the recipe so I go to the nextSibling which is the h3 that contains the name
                                     */
                                    hide_removers()
                                    modal_dialoge.classList.remove("hidden")
                                    console.log((remover.nextSibling.firstChild.firstChild.nextSibling).textContent)
                                });
                                node_remover.appendChild(remover)
                                node.appendChild(node_img);
                                node.appendChild(node_name);
                                link.href = `/recipes/${recipe_genre}/${formattedname}`;
                                link.appendChild(node);
                                node_remover.appendChild(link);
                                recipesContainer.appendChild(node_remover);
                                const add_button = document.getElementById("button_2")
                                const delete_button = document.getElementById("button_3")
                                const recipes_divs = document.querySelectorAll(".recipe_container")
                                close_modal.forEach(close => close.addEventListener("click", function(){
                                    modal_dialoge.classList.add("hidden")
                                    recipes_divs.forEach(recipe => {
                                        recipe.classList.remove("animate-wiggle")
                                        recipe.classList.add("hover:scale-110")
                                    })
                                }))
                                if (add_button){
                                    add_button.addEventListener("click", function (){
                                        recipesContainer.classList.add("hidden")
                                        formContainer.classList.remove("hidden")
                                        form_title.innerText = "New Recipe"
                                        formContainer.classList.replace('opacity-0', 'opacity-100');
                                    })

                                    delete_button.addEventListener("click", function (){
                                        const removers = document.querySelectorAll(".remover")
                                        recipes_divs.forEach(recipe => {
                                            recipe.classList.remove("hover:scale-110")
                                            recipe.classList.add("animate-wiggle")
                                        })
                                        removers.forEach(remover =>{
                                            remover.classList.remove("hidden")
                                        })
                                    })
                                }
                            })
                        }
                    });
                } else {
                    /**
                     This is for the specific recipes, the variable names are not ideal but will be renamed in this function
                     for better readability.
                     It's iterating through the titles then through all the recipes inside the genre. If the recipe is found itll create
                     a div and a display of it
                     */
                    const recipe_genre = param[param.length-2]
                    const recipe_name = param[param.length-1]
                    titles.forEach(title => {
                        if (title.toLowerCase() === recipe_genre) {
                            data[title].forEach(recipe => {
                                if (recipe.name === recipe_name.replace(/_/g, ' ')) {
                                    const node = document.createElement("div");
                                    const node_img = document.createElement("img");
                                    const node_name = document.createElement("h3");
                                    const ingred_container = document.createElement("div")
                                    const ingred_title = document.createElement("h1")
                                    const node_ingredients = document.createElement("ul")
                                    const descr_title = document.createElement("h1")
                                    const node_description = document.createElement("p")
                                    node.classList.add("border-4", "gap-x-10", "flex", "flex-col", "items-center", "w-full", "max-w-4xl");
                                    recipesContainer.classList.add(
                                        "flex", "flex-row", "flex-wrap", "font-serif", "justify-center",
                                        "py-11", "md:p-0", "[&>div>h3]:p-5", "[&>div]:w-[1050px]",
                                        "gap-y-5", "[&>div:not(:last-child)]:lg:space-x-4", "mt-11",
                                         "w-full"
                                    );
                                    node_img.src = `/images/${recipe_genre}/${recipe.name}.jpg`;
                                    node_img.classList.add("mt-10", "border-4")
                                    node_name.innerText = recipe.name
                                    document.title = recipe.name
                                        node_img.width = 350
                                    recipe.ingredients.forEach(ingredient => {
                                        const item = document.createElement("li");
                                        item.innerText = ingredient;
                                        node_ingredients.appendChild(item);
                                    });
                                    node_description.innerText = recipe.instructions;
                                    ingred_container.classList.add("h-30")
                                    node_name.classList.add("text-2xl", "font-semibold", "mb-4");
                                    node_ingredients.classList.add("grid", "grid-cols-2", "gap-4", "self-start",  "p-4");
                                    node_description.classList.add("flow-root", "p-10", "w-[500px]");
                                    ingred_title.innerText = "Ingredients:"
                                    ingred_title.classList.add("text-xl", "self-start", "ml-10")
                                    descr_title.innerText = "Instructions:"
                                    descr_title.classList.add("text-xl", "self-start", "ml-10")
                                    create_buttons(["Edit"])
                                    ingred_container.appendChild(node_ingredients)
                                    node.appendChild(node_img);
                                    node.appendChild(node_name);
                                    node.appendChild(ingred_title)
                                    node.appendChild(ingred_container);
                                    node.appendChild(descr_title)
                                    node.appendChild(node_description);
                                    recipesContainer.appendChild(node);
                                    const edit_button = document.getElementById("button_1")
                                    if (edit_button){
                                        edit_button.addEventListener("click", function (){
                                            recipesContainer.style.display = "none"
                                            formContainer.classList.remove("hidden")
                                            form_title.innerText = "Edit Recipe"
                                            form_name.value = recipe.name
                                            form_instructions.value = recipe.instructions
                                            for (let i=0; i<(recipe.ingredients).length; i++){
                                                form_ingredients.value = (recipe.ingredients)[i]
                                                let event = new KeyboardEvent('keydown', {
                                                    bubbles: true,
                                                    cancelable: true,
                                                    key: 'Enter',
                                                    code: 'Enter',
                                                    keyCode: 13
                                                });
                                                add_ingredient(event);
                                            }
                                            fetch(node_img.src)
                                                .then(response => response.blob())
                                                .then(blob => {
                                                    const file = new File([blob], `${recipe.name}.jpg`, { type: 'image/jpeg' });
                                                    const dataTransfer = new DataTransfer();
                                                    dataTransfer.items.add(file);
                                                    form_img.files = dataTransfer.files;})
                                                formContainer.classList.replace('opacity-0', 'opacity-100');
                                        })
                                    }
                                }
                            })
                        }
                    })
                }}).catch(error => console.error('Error fetching recipes:', error));


    /**
     addEventListener are declared from here
     */
    hamburger_button.addEventListener("click", showcase_sidebar)
    if (reveal_button){
        reveal_button.addEventListener('click', showcase_buttons)
    }

    window.addEventListener('load', function() {
        loader.style.display = "none"
        body.style.display = "inline"
        side_bar_buttons.forEach(button =>
        button.classList.add("w-52","hover:bg-gray-200"))

    });
    document.addEventListener("click", function (event){
        if (!(hamburger_button.contains(event.target) || side_bar.contains(event.target)||reveal_button.contains(event.target))){
            if (pointer.classList.contains("-rotate-90")){
                showcase_buttons()
            }
            side_bar_buttons.forEach(button =>{
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

    cancel_button.addEventListener("click", function (){
        formContainer.classList.replace('opacity-100', 'opacity-0');
        recipesContainer.classList.remove("hidden")
        formContainer.classList.add("hidden")
    })

})