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
        background: '#0A120E',
        surface: '#162B1F',
        elevated: '#1E3829',
        overlay: '#243D2F',
        edge: '#2D4A3A',
        'edge-light': '#3A5C48',
        'edge-hover': '#4A6D57',
        cream: '#E8F0EC',
        'cream-dim': '#B0C4B8',
        dim: '#6B8A78',
        accent: '#5B8A6F',
        'accent-dim': '#3D6B50',
        'accent-hover': '#6B9A7F',
        sage: '#5B8A6F',
        'sage-dim': '#4A7A5E',
      },
    },
  },
  plugins: [],
}

export default config
