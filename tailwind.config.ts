import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#111B14',
        surface: '#1A2B1E',
        elevated: '#222F24',
        overlay: '#283428',
        edge: '#2A3A2E',
        'edge-light': '#3A4A3E',
        'edge-hover': '#4A5A4E',
        cream: '#F0F0E8',
        'cream-dim': '#A0A898',
        dim: '#6A7A6E',
        accent: '#C8F23D',
        'accent-dim': '#98B82D',
        'accent-hover': '#D4F85A',
        sage: '#C8F23D',
        'sage-dim': '#98B82D',
      },
    },
  },
  plugins: [],
}

export default config
