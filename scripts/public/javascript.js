document.addEventListener("DOMContentLoaded", function () {
    const side_bar = document.getElementById("side-bar-menu");
    const hamburger_button = document.getElementById("reveal_side_bar");
    const body = document.getElementById("css-body");
    const loader = document.getElementById("loader")
    const param = (window.location.href).split("/")
    const recipe_genre = param[param.length-1]
    const recipe_name = param[param.length-2]
    const reveal_button =document.getElementById("options")


    hamburger_button.addEventListener("click", () => {
        if (side_bar.classList.contains('h-0')) {
            side_bar.classList.remove('h-0');
            side_bar.classList.add('h-56');
        } else {
            side_bar.classList.remove('h-56');
            side_bar.classList.add('h-0');
        }
    });
    function create_buttons(amount, array){
        for (let i = 0; i < amount.length; i++) {
        }
        const button = document.createElement('button');
        const div = document.createElement('div');
        div.classList.add("reveal-div")
        const options = document.getElementById("buttons_reveal")
        div.classList.add('w-0', 'h-16', 'mr-16', 'bg-gray-200', 'rounded-full', 'flex', 'justify-center', 'items-center', 'z-0', 'transition-all', 'duration-300', 'ease-out');
        const paragraph = document.createElement('p');
        paragraph.classList.add('opacity-0', 'transition-opacity', 'duration-100', 'z-0', "relative");
        div.appendChild(paragraph);
        button.appendChild(div);
        options.appendChild(button);
        return options
    }
    /**
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
                let recipesContainer;
                if (recipe_name === "recipes") {
                    recipesContainer = document.getElementById("recipes");
                    titles.forEach(title => {
                        if (title.toLowerCase() === recipe_genre){
                            data[title].forEach(recipe => {
                                const node = document.createElement("div");
                                const node_img = document.createElement("img");
                                const node_name = document.createElement("h3");
                                const link = document.createElement("a");
                                node.classList.add("border-2", "gap-x-10", "flex", "flex-col", "items-center", "transition-transform", "duration-300", "ease-in-out", "transform", "hover:scale-110");
                                recipesContainer.classList.add(
                                    "flex", "flex-row", "flex-wrap", "font-serif", "justify-start",
                                    "py-11", "md:p-0", "[&>a>div>h3]:p-5", "[&>a>div]:w-[220px]",
                                    "gap-y-5", "gap-x-5", "[&>a>div:not(:last-child)]:lg:space-x-4", "mt-11",
                                    "ml-14"
                                );
                                node_img.src = `../images/${recipe_genre}/${recipe.name}.jpg`;
                                node_img.classList.add("object-contain","h-auto", "w-auto", draggable="false");
                                node_name.innerText = recipe.name
                                const formattedname = (recipe.name).replace(/\s+/g, '_');
                                link.href = `/recipes/${recipe_genre}/${formattedname}`
                                node.appendChild(node_img);
                                node.appendChild(node_name);
                                link.appendChild(node)
                                recipesContainer.appendChild(link);
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
                    recipesContainer = document.getElementById("recipe");
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
                                    create_buttons()
                                    ingred_container.appendChild(node_ingredients)
                                    node.appendChild(node_img);
                                    node.appendChild(node_name);
                                    node.appendChild(ingred_title)
                                    node.appendChild(ingred_container);
                                    node.appendChild(descr_title)
                                    node.appendChild(node_description);
                                    recipesContainer.appendChild(node);
                                }
                            })
                        }
                    })
                }}).catch(error => console.error('Error fetching recipes:', error));

    window.addEventListener('load', function() {
        loader.style.display = "none"
        body.style.display = "inline"
    });

    reveal_button.addEventListener('click', function() {
        const revealDivs = document.querySelectorAll('.reveal-div');
        const revealpara = document.querySelectorAll('.reveal-div>p');
        revealDivs.forEach((div, index) => {
            if (div.classList.contains('w-0')) {
                div.classList.replace('w-0', 'w-16');
                revealpara[index].classList.replace('opacity-0', 'opacity-100');

            } else {
                div.classList.replace('w-16', 'w-0');
                revealpara[index].classList.replace('opacity-100', 'opacity-0');
            }
        });
    });



});
