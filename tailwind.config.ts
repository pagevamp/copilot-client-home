import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: {
        '100': '550px',
      },
      width: {
        '100': '563px',
      },
      backgroundColor: {
        'new-dark': "#0E0E10",
        'new-white': "#D7D7DD",
        'new-card-border': "#EDEDF0",
        'new-white-2': "#F8F9FB",
      },
      textColor: {
        'new-gray': "#60606A"
      },
      borderColor: {
        'col-1': "#DFE1E4"
      },
      boxShadow: {
        'variant-1': "0px 6px 20px 0px rgba(0, 0, 0, 0.12)",
        'variant-2': " 0px 8px 24px 0px rgba(0, 0, 0, 0.12)"
      },
      fontSize: {
        'xs': "13px"
      }
    },
  },
  plugins: [],
}
export default config
