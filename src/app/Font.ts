import { Inter, Roboto,Poppins,Open_Sans,Lato } from 'next/font/google'
 
export const inter = Inter({
  subsets: ['latin'],
  weight: ['600',"500"],
  display: 'swap',
})
 
export const roboto = Roboto({
    subsets: ['latin'],
    weight: ["400"],
    display: 'swap',
  })

  export const poppins = Poppins({
    subsets: ['latin'],
    weight: ["500"],
    display: 'swap',
  })

  export const heading = Open_Sans({
    subsets: ['latin'],
    weight: ['600'],
    display: 'swap',
  })

  export const title = Lato({
    subsets: ['latin'],
    weight: ['700'],
    display: 'swap',
  })