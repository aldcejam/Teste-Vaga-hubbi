import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        "contrast": "var(--contrast)", 
        "color60": "var(--color60)",
        "color30": "var(--color30)",
        "color10": "var(--color10)",
        "font": "var(--font)",
        "contrastToColor10": "var(--contrastToColor10)",
      }
    },
  },
  plugins: [],
}
export default config
