/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Noto Sans', ...defaultTheme.fontFamily.sans],
				mono: ['Recursive', ...defaultTheme.fontFamily.mono]
			},
			colors: {
				tTeal: '#00A19D',
				tYellow: '#FFF8E5',
				tOrange: '#FFB344',
				tRed: '#E05D5D'
			}
		}
	},
	darkMode: 'false',
	plugins: []
};
