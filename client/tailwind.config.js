/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    DEFAULT: "#F4F4F4",
                    content: "#FFFFFF",
                    navbar: {
                        DEFAULT: "#333333"
                    }
                },
                text: {
                    DEFAULT: "#000000",
                    navbar: {
                        DEFAULT: "#FFFFFF",
                        hover:"#000000"
                    },
                    login: {
                        DEFAULT: "#FFFFFF",
                        hover:"#FFFFFF"
                    }
                },
                button: {
                    navbar: {
                        DEFAULT: "	#666666",
                        hover: "#FFFFFF"
                    },
                    login: {
                        DEFAULT: "	#666666",
                        hover: "#333333"
                    }
                }
            },
            fontFamily: {
                Roboto: ['Roboto Condensed', 'sans-serif']
            }
        },
    },
    plugins: [],
}