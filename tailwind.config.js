/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: [
        "./scripts/public/overview.html",
        "./scripts/public/index.html",
        "./scripts/public/**/*.{js,jsx,ts,tsx}",
        "./scripts/public/**/*.{js,jsx,ts,tsx}",
        "./pages/public/**/*.{js,ts,jsx,tsx}",
        "./components/public/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}