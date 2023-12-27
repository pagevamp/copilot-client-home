import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        none: '0px',
        '025': '1px',
        '050': '2px',
        '100': '4px',
        '150': '6px',
        '200': '8px',
        '300': '12px',
        '350': '13px',
        '400': '16px',
        '500': '20px',
        '600': '24px',
        '800': '32px',
        '1000': '40px',
        '1200': '48px',
        '1600': '64px',
        '2000': '80px',
        '2400': '96px',
        '3200': '128px',
      },

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
        '2xs': '320px',
        xs: '384px',
        sm: '480px',
        md: '560px',
        lg: '640px',
        xl: '768px',
        '2xl': '1024px',
        '3xl': '1280px',
        '4xl': '1440px',
        '5px': '1600px',
        '6xl': '1920px',
        'paragraph-max-width': '720px',
      },
      maxWidth: {
        '100': '563px',
        '2xs': '320px',
        xs: '384px',
        sm: '480px',
        md: '560px',
        lg: '640px',
        xl: '768px',
        '2xl': '1024px',
        '3xl': '1280px',
        '4xl': '1440px',
        '5px': '1600px',
        '6xl': '1920px',
        'paragraph-max-width': '720px',
      },
      backgroundColor: {
        'new-dark': '#0E0E10',
        'new-white': '#D7D7DD',
        'new-card-border': '#EDEDF0',
        'new-white-2': '#F8F9FB',
        'new-white-3': '#EFF1F4',
        'gray-300': '#C9CBCD',
      },
      textColor: {
        'new-gray': '#60606A',
        text: '#212B36',
        'gray-300': '#C9CBCD',
        'gray-200': '#DFE1E4',
        'gray-100': '#C9CBCD',
        'secondary': '#6B6F76'
      },
      borderColor: {
        'col-1': '#DFE1E4',
        'gray-300': '#C9CBCD',
        'gray-200': '#DFE1E4',
        'gray-100': '#C9CBCD',
      },
      boxShadow: {
        'variant-1': '0px 6px 20px 0px rgba(0, 0, 0, 0.12)',
        'variant-2': ' 0px 8px 24px 0px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        none: '0px',
        '050': '2px',
        '100': '4px',
        '150': '6px',
        '200': '8px',
        '300': '12px',
        '400': '16px',
        '500': '20px',
        'rounded-600': '24px',
        full: '9999px',
        'rounded-xl': '35px',
      },
      borderWidth: {
        'border-1': '1px',
      },
      fontSize: {
        xs: '13px',
      },
    },
  },
  plugins: [],
}
export default config
