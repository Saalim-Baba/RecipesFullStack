document.addEventListener("DOMContentLoaded", function () {
    const side_bar = document.getElementById("side-bar-menu");
    const hamburger_button = document.getElementById("reveal_side_bar");
    const toggleCheckbox = document.getElementById('toggle-checkbox');
    const body = document.getElementById("css-body");
    const nav = document.getElementById("nav");
    const footer = document.getElementById("footer");
    const loader = document.getElementById("loader")
    const real_body = document.body
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
                            "flex", "flex-row", "flex-wrap", "font-serif", "justify-start",
                            "py-11", "md:p-0", "[&>div>h3]:p-5", "[&>div]:w-[220px]",
                            "gap-y-5", "gap-x-5", "[&>div:not(:last-child)]:lg:space-x-4", "mt-11",
                            "ml-14"
                        );
                        const img = document.createElement("img");
                        img.src = `../images/${recipe_genre}/${recipe.name}.jpg`;
                        img.classList.add("object-contain","h-auto", "w-auto", draggable="false");
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
