document.addEventListener("DOMContentLoaded", function () {
    const side_bar = document.getElementById("side-bar-menu");
    const hamburger_button = document.getElementById("reveal_side_bar");
    const toggleCheckbox = document.getElementById('toggle-checkbox');
    const body = document.getElementById("css-body");
    const nav = document.getElementById("nav");
    const footer = document.getElementById("footer");
    const loader = document.getElementById("loader")
    const real_body = document.body
    const param = (window.location.href).split("/")
    const recipe_genre = param[param.length-1]
    const recipe_name = param[param.length-2]
    hamburger_button.addEventListener("click", () => {
        if (side_bar.classList.contains('h-0')) {
            side_bar.classList.remove('h-0');
            side_bar.classList.add('h-56');
        } else {
            side_bar.classList.remove('h-56');
            side_bar.classList.add('h-0');
        }
    });
    toggleCheckbox.addEventListener('change', dark_mode);
    /**
     This is for the display of the recipes in the overview of all recipes inside a genre and if the URL has
     the name of the recipe in the domain it'll create a node only for the specific recipe
     Note: The variable name is not chosen smartly, thats why its reassigned in the else statement for better
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
                                    const node_ingredients = document.createElement("ul")
                                    const node_description = document.createElement("p")
                                    node.classList.add("border-2", "gap-x-10", "flex", "flex-col", "items-center", "w-full", "max-w-4xl");
                                    recipesContainer.classList.add(
                                        "flex", "flex-row", "flex-wrap", "font-serif", "justify-center",
                                        "py-11", "md:p-0", "[&>div>h3]:p-5", "[&>div]:w-[1050px]",
                                        "gap-y-5", "[&>div:not(:last-child)]:lg:space-x-4", "mt-11",
                                         "w-full"
                                    );
                                    node_img.src = `/images/${recipe_genre}/${recipe.name}.jpg`;
                                    node_name.innerText = recipe.name
                                    node_img.width = 300
                                    recipe.ingredients.forEach(ingredient => {
                                        const item = document.createElement("li");
                                        item.innerText = ingredient;
                                        node_ingredients.appendChild(item);
                                    });
                                    node_description.innerText = recipe.instructions;
                                    ingred_container.classList.add("h-30")
                                    node_name.classList.add("text-2xl", "font-semibold", "mb-4");
                                    node_ingredients.classList.add("list-disc", "pl-5", "space-y-1", "mb-4", "columns-2");
                                    node_description.classList.add("flow-root", "p-6");
                                    ingred_container.innerText = "Ingredients"
                                    ingred_container.appendChild(node_ingredients)
                                    node.appendChild(node_img);
                                    node.appendChild(node_name);
                                    node.appendChild(ingred_container);
                                    node.appendChild(node_description);
                                    recipesContainer.appendChild(node);

                                }
                            })
                        }
                    })
                }}).catch(error => console.error('Error fetching recipes:', error));

    function dark_mode(){
        if (toggleCheckbox.checked) {
            localStorage.setItem('checkboxState', toggleCheckbox.checked);
            body.style.backgroundColor = '#383838';
            body.style.color = '#ffffff';
            real_body.style.backgroundColor =  '#383838'
            nav.style.backgroundColor = '#252525'
            hamburger_button.classList.remove("hover:bg-gray-200")
            hamburger_button.classList.add("hover:bg-zinc-700")
            side_bar.classList.remove("bg-gray-100")
            side_bar.classList.add("bg-custom-gray")
        } else {
            localStorage.removeItem('checkboxState');
            real_body.style.backgroundColor =  '#ffffff'
            hamburger_button.classList.remove("hover:bg-zinc-700")
            hamburger_button.classList.add("hover:bg-gray-200")
            side_bar.classList.remove("bg-custom-gray")
            side_bar.classList.add("bg-gray-100")
            body.style.backgroundColor = '#ffffff';
            body.style.color = '#000000';
            nav.style.backgroundColor = '#ffffff'
            footer.style.backgroundColor = '#ffffff'
        }
    }
    window.addEventListener('load', function() {
        if (toggleCheckbox.checked){
            dark_mode()
        }
        if (localStorage.getItem('checkboxState') !== null){
            toggleCheckbox.checked = true
            dark_mode()
        }
        loader.style.display = "none"
        body.style.display = "inline"
    });
});
