import { Poppins, Russo_One, Kdam_Thmor_Pro, Londrina_Solid, Bebas_Neue, Kanit, DM_Sans, Alfa_Slab_One, Bubbler_One } from 'next/font/google';

// Define fonts with subsets and weights
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const russoOne = Russo_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-russo-one',
  display: 'swap',
});

export const kdamThmorPro = Kdam_Thmor_Pro({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-kdam-thmor-pro',
  display: 'swap',
});

export const londrinaSolid = Londrina_Solid({
  subsets: ['latin'],
  weight: ['100', '300', '400', '900'],
  variable: '--font-londrina-solid',
  display: 'swap',
});

export const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas-neue',
  display: 'swap',
});

export const kanit = Kanit({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-kanit',
  display: 'swap',
});

export const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const alfaSlabOne = Alfa_Slab_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-alfa-slab-one',
  display: 'swap',
});

export const bubblerOne = Bubbler_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bubbler-one',
  display: 'swap',
});
