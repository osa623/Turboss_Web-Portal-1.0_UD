import type { Config } from "tailwindcss";
import textShadow from 'tailwindcss-textshadow';


export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom colors
      colors: {
        primary: "#FFFFFF",
        secondary: "#000000",
        baseprimary: "#9C2473",
        navy: "#4C585B",
        gold: "#4a5759",
        goldd :"#CBA328"
      },
      fontFamily:{

        poppins: ['Poppins', 'sans-serif'],
        russoone: ['Russo One', 'sans-serif'],
        kdamThmorPro: ['Kdam Thmor Pro', 'sans-serif'],
        lorniasolid:['Londrina Solid', 'sans-serif'],
        bebasneue:['Bebas Neue', 'sans-serif'],
        bricolagegrotesque:['Bricolage Grotesque', 'sans-serif'],
        kanit:['Kanit', 'sans-serif'],
        dmsans:['DM Sans', 'sans-serif'],
        londrina:['Londrina Solid', 'sans-serif'],
        atma:['Atma', 'sans-serif'],
        alfaSlabOne: ['Alfa Slab One', 'serif'],
        bubblerOne: ['Bubbler One', 'sans-serif'],
  
      },
      screens: {
        'sms': { 'min': '10px', 'max': '640px' },
        'mds': { 'min': '640px', 'max':'1024px'},
        'mmds': { 'min': '640px', 'max':'1200px'},
        'llgs': { 'min': '1201px' ,'max':'9000px'},
        'lgs': { 'min': '1025px' ,'max':'9000px'}
      
      },

    },
  },

  plugins: [

    textShadow

  ],
} satisfies Config;
