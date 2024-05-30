document.addEventListener("DOMContentLoaded", function () {
    const side_bar = document.getElementById("side-bar-menu");
    const hamburger_button = document.getElementById("reveal_side_bar");

    hamburger_button.addEventListener("click", () => {
        if (side_bar.classList.contains('h-0')) {
            side_bar.classList.remove('h-0');
            side_bar.classList.add('h-80');
        } else {
            side_bar.classList.remove('h-80');
            side_bar.classList.add('h-0');
        }

    });

    fetch('/recipes/data')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const titles = Object.keys(data);
            const recipesContainer = document.getElementById("recipes");
            recipesContainer.innerHTML = '';
            titles.forEach(title => {
                data[title].forEach(recipe => {
                    const node = document.createElement("div");
                    node.classList.add("border-2", "flex", "flex-col", "items-center", "transition-transform", "duration-300", "ease-in-out", "transform", "hover:scale-110");

                    const img = document.createElement("img");
                    img.src = `../images/${recipe.name}`;
                    img.classList.add("h-auto", "w-auto");

                    const name = document.createTextNode(recipe.name);

                    node.appendChild(img);
                    node.appendChild(name);
                    recipesContainer.appendChild(node);
                });
            });
        })
        .catch(error => console.error('Error fetching recipes:', error));
});
