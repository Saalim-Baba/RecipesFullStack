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
        extend: {
            boxShadow: {
                'right': '10px 0 5px -2px rgba(0, 0, 0, 0.1)',
            },
            colors: {
                'custom-gray': '#252525'
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(0deg)' },
                    '10%, 90%': { transform: 'rotate(0.5deg)' },
                    '20%, 80%': { transform: 'rotate(-0.5deg)' },
                    '30%, 70%': { transform: 'rotate(0.4deg)' },
                    '40%, 60%': { transform: 'rotate(-0.4deg)' },
                    '50%': { transform: 'rotate(0deg)' }
                }
            },
            animation: {
                wiggle: 'wiggle 4s ease-in-out infinite',
            },
        },
    },
    variants: {},
    plugins: [],
}