/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  darkMode: 'class',
  content: [
    './components/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.js',
  ],
  safelist: [
    'svg-inline--fa',
    'text-xxs',
    'bg-green-50',
    'bg-instagram',
    'bg-red-70',
    'bg-sosmed-facebook',
    'bg-sosmed-twitter',
    'bg-sosmed-youtube',
    'border-green-50',
    'text-green-50',
    'md:h-36',
    'md:w-36',
    'md:grid-cols-4', // widget-posts-recirculations-multimedia-recomender#ref=widget-post-loop
  ],
  presets: [
    // Kompas Base Color
    require('@kompasid/colors'),
  ],
  theme: {
    fontFamily: {
      serif: [
        'Lora',
        'serif',
      ],
      system: [
        'Georgia',
        'Times New Roman',
        'Times',
        'serif',
      ],
      sans: [
        '"PT Sans"',
        'Arial',
        'Verdana',
        'Helvetica',
        'sans-serif',
      ],
    },
    maxWidth: (theme, { breakpoints }) => ({
      'none': 'none',
      '0': '0rem', // 0px
      'xs': '20rem', // 320px
      'sm': '30rem', // 480px (Changed from 384px)
      'md': '40rem', // 640px (Changed from 448px)
      'lg': '50rem', // 800px (Changed from 512px)
      'xl': '60rem', // 960px (Changed from 576px)
      '2xl': '70rem', // 1120px (Changed from 672px)
      '3xl': '80rem', // 1280px (Changed from 768px)
      '4xl': '90rem', // 1440px (Changed from 896px)
      '5xl': '100rem', // 1600px (Changed from 1024px)
      '6xl': '72rem', // 1152px
      '7xl': '80rem', // 1280px
      'full': '100%',
      'min': 'min-content',
      'max': 'max-content',
      'prose': '65ch',
      ...breakpoints(theme('screens')),
    }),
    extend: {
      backgroundImage: {
        instagram: 'linear-gradient(to right, #FFC107, #F44336, #9C27B0)',
      },
      boxShadow: {
        sm: '0px -1px 3px rgba(0, 0, 0, 0.06), 0px 1px 2px rgba(0, 0, 0, 0.12)',
        base: '0px 3px 6px rgba(0, 0, 0, 0.08), 0px -1px 4px rgba(0, 0, 0, 0.06)',
        md: '0px 4px 7px rgba_(0, 0, 0, 0.06), 0px -1px 6px rgba(0, 0, 0, 0.07)',
        lg: '0px -1px 12px rgba(0, 0, 0, 0.04), 0px 15px 25px rgba(0, 0, 0, 0.1)',
        xl: '0px 7px 40px rgba(0, 0, 0, 0.15)',
      },
      colors: {
        transparent: 'transparent',
        sosmed: {
          facebook: '#3D5B9B',
          twitter: '#2DAAE4',
          youtube: '#F44336',
        },
      },
      spacing: {
        13: '3.25rem',
      },
      borderWidth: {
        3: '3px',
      },
      container: {
        center: true,
        padding: '1rem',
      },
      fontSize: {
        xxs: ['.625rem', { lineHeight: '1rem' }],
      },
      minHeight: {
        7: '7rem',
        8: '8rem',
        320: '320px',
      },
    },
  },
  plugins: [],
}
