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
				tTeal: {
					50: '#effefc',
					100: '#c7fff8',
					200: '#90fff0',
					300: '#51f7e8',
					400: '#1de4d8',
					500: '#04c8bf',
					base: '#00a19d',
					700: '#05807e',
					800: '#0a6565',
					900: '#0d5454',
					950: '#003133'
				},

				tYellow: {
					base: '#fff8e5',
					100: '#feefc7',
					200: '#fdde8a',
					300: '#fcc74d',
					400: '#fbb024',
					500: '#f58e0b',
					600: '#d96806',
					700: '#b44709',
					800: '#92370e',
					900: '#782e0f',
					950: '#451503'
				},

				tOrange: {
					50: '#fff8eb',
					100: '#ffeac6',
					200: '#ffd388',
					base: '#ffb344',
					400: '#ff9b20',
					500: '#f97507',
					600: '#dd5102',
					700: '#b73506',
					800: '#94280c',
					900: '#7a220d',
					950: '#460e02'
				},
				tRed: {
					50: '#fdf3f3',
					100: '#fbe5e5',
					200: '#f9cfcf',
					300: '#f4adad',
					400: '#eb7e7e',
					base: '#e05d5d',
					600: '#ca3838',
					700: '#aa2b2b',
					800: '#8d2727',
					900: '#752727',
					950: '#3f1010'
				}
			}
		}
	},
	darkMode: 'false',
	plugins: []
};
