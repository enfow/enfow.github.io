// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', ...fontFamily.sans],
      },
      colors: {
        primary: colors.pink,
        gray: colors.gray,
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1': {
              fontSize: '2.15rem',
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              marginTop: theme('spacing.10'), // Adds margin-top (e.g., 1.5rem if spacing.6 is default)
              paddingBottom: theme('spacing.1'), // Add space between text and underline
              borderBottomWidth: '2px', // Set underline thickness
              borderBottomColor: theme('colors.primary.500'), // Set underline color
            },
            'h2': {
              fontSize: '1.6rem',
              fontWeight: '700',
              marginTop: theme('spacing.7'),
              marginBottom: theme('spacing.2'),
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontSize: '1.45rem',
              fontWeight: '600',
              marginBottom: theme('spacing.1'),
            },
            h4: {
              fontSize: '1.3rem',
              fontWeight: '600',
              marginBottom: theme('spacing.1'),
            },
            code: {
              color: theme('colors.indigo.500'),
            },
            p: {
              fontSize: '1.25rem', // Base size (16px)
              lineHeight: '1.75', // Adjust line height
              fontFamily: theme('fontFamily.sans').join(','),
              fontColor: theme('colors.black'),
            },
            li: {
              fontWeight: '500',
              marginTop: '0.25rem', // Add spacing between list items
              marginBottom: '0.25rem',
              paddingLeft: '0.25rem',
              fontSize: '1.25rem', // Adjust font size for list items
              lineHeight: '1.75',
              fontColor: theme('colors.black'),
            },
            'p::first-letter': {
              marginLeft: theme('spacing.1'), // Add space to the right of the first letter
              fontSize: '1.25rem', // Optional: increase the font size of the first letter
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    ({ addBase, theme }) => {
      addBase({
        'a, button': {
          outlineColor: theme('colors.primary.500'),
          '&:focus-visible': {
            outline: '2px solid',
            borderRadius: theme('borderRadius.DEFAULT'),
            outlineColor: theme('colors.primary.500'),
          },
        },
      })
    },
  ],
}
