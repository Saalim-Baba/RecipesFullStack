/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: [
        "./scripts/overview.html",
        "./scripts/index.html",
        "./scripts/**/*.{js,jsx,ts,tsx}",
        "./scripts/**/*.{js,jsx,ts,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}