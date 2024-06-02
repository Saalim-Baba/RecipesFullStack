document.addEventListener("DOMContentLoaded", function () {
    const side_bar = document.getElementById("side-bar-menu");
    const hamburger_button = document.getElementById("reveal_side_bar");

    hamburger_button.addEventListener("click", () => {
        if (side_bar.classList.contains('h-0')) {
            side_bar.classList.remove('h-0');
            side_bar.classList.add('h-56');
        } else {
            side_bar.classList.remove('h-56');
            side_bar.classList.add('h-0');
        }

    });

    const param = (window.location.href).split("/")
    const recipe_genre = param[param.length-1]
    fetch('/recipes/data')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const titles = Object.keys(data);
            const recipesContainer = document.getElementById("recipes");
            recipesContainer.innerHTML = '';
            titles.forEach(title => {
                if (title.toLowerCase() === recipe_genre){
                    data[title].forEach(recipe => {
                        const node = document.createElement("div");
                        node.classList.add("border-2", "gap-x-10", "flex", "flex-col", "items-center", "transition-transform", "duration-300", "ease-in-out", "transform", "hover:scale-110");
                        recipesContainer.classList.add(
                            "flex", "flex-row", "flex-wrap", "font-serif", "justify-center",
                            "py-11", "md:p-0", "[&>div>h3]:p-5", "[&>div]:w-[220px]",
                            "gap-y-5", "gap-x-5", "[&>div:not(:last-child)]:lg:space-x-4", "mt-11"
                        );
                        const img = document.createElement("img");
                        img.src = `../images/${recipe_genre}/${recipe.name}.jpg`;
                        img.classList.add("object-contain","h-auto", "w-auto");

                        const name = document.createElement("h3");
                        name.innerText = recipe.name

                        node.appendChild(img);
                        node.appendChild(name);
                        recipesContainer.appendChild(node);
                })

                }
            });
        })
        .catch(error => console.error('Error fetching recipes:', error));
});
