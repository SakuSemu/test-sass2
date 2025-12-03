/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#FFD700',
                    dark: '#E6C200',
                },
                secondary: {
                    DEFAULT: '#6C63FF',
                    dark: '#5A52D5',
                },
                accent: '#FF6B6B',
                success: '#48BB78',
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'bounce-slow': 'bounce 2s infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
