document.addEventListener("DOMContentLoaded", function () {
    const side_bar = document.getElementById("side-bar-menu")
    const hamburger_button = document.getElementById("reveal_side_bar")
    hamburger_button.addEventListener("click", () => {
        side_bar.classList.toggle("hidden")
    })
})