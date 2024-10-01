import type { Config } from 'tailwindcss'
import twColors from 'tailwindcss/colors'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-inter)',
      },
      colors: {
        background: '#e5e7e6',
        primary: '#225986',
        primaryLit: '#2398cf',
        secondary: '#93afc8',
        secondaryLit: '#79bdcd',
        lightGreen: '#80c24f',
        darkGreen: '#347353',
        textColor: twColors.gray[700],
      },
    },
  },
  plugins: [],
}
export default config
