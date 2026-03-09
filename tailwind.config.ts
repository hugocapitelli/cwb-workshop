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
        background: '#0A0A0A',
        surface: '#111111',
        elevated: '#1A1A1A',
        overlay: '#222222',
        edge: '#2A2A2A',
        'edge-light': '#3A3A3A',
        'edge-hover': '#4A4A4A',
        cream: '#E8E0D5',
        'cream-dim': '#B8B0A5',
        dim: '#666666',
        accent: '#C4A882',
        'accent-dim': '#8B7355',
        'accent-hover': '#D4BC9A',
        sage: '#7C9E8F',
        'sage-dim': '#5A7A6B',
      },
    },
  },
  plugins: [],
}

export default config
