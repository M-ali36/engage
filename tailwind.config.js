
const plugin = require('tailwindcss/plugin');
module.exports = {
    content: [
        './src/components/GlobalCss/index.module.css',
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/Ui/**/*.js',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.module.css',
        './src/app/*.module.css',
    ],
    separator: '_',
    theme: {
        extend: {
            colors: {
                'black': '#1E1F27',
                'white': '#F6F6F6',
                'white-fff': "#fff",
                'yellow': '#FFCE1F',
                'orange': 'var(--color-orange)',
                'opa': 'var(--opa-color)',
                'hover': 'var(--hover-color)',
                'bgOpa': 'var(--bgOpa-color)',
                slate : {
                    "500": "#777",
                    "300": "#D2D2D4"
                }
            },
            fontFamily: {
                'sans': ['National', 'Arial', 'sans-serif'],
                'serif': ['Signifier', 'Arial', 'sans-serif'],
                'bb': ['Bravebison', 'Arial', 'sans-serif'],
            },
            fontSize: {
                'xs': [ /* font-size */ '0.88rem', {
                    lineHeight: '20px',
                }],
                'sm': [ /* font-size */ '1rem', {
                    lineHeight: '1.4',
                }],
                'base': [ /* font-size */ '1.25rem', {
                    lineHeight: '1.4',
                }],
                'base-m': [ /* font-size */ '1.5rem', {
                    lineHeight: '1.2',
                }],
                'lg': [ /* font-size */ 'var(--lg-font-size)', {
                    lineHeight: 'inherit',
                }],
                'xl': [ /* font-size */ 'var(--xl-font-size)', {
                    lineHeight: '1.2',
                }],
                'xl-m': [ /* font-size */ 'var(--xlm-font-size)', {
                    lineHeight: '1.2',
                }],
                '2xl': [ /* font-size */ 'var(--2xl-font-size)', {
                    lineHeight: '1.2',
                }],
                '3xl': [ /* font-size */ 'var(--3xl-font-size)', {
                    lineHeight: '1.2',
                }],
                '4xl': [ /* font-size */ 'var(--4xl-font-size)', {
                    lineHeight: '1.2',
                }],
                '5xl': [ /* font-size */ 'var(--5xl-font-size)', {
                    lineHeight: '1.2',
                }],
                'xxl': [ /* font-size */ 'var(--xxl-font-size)', {
                    lineHeight: '1.4',
                }],
            },
            screens: {
              'mOnly': {'max': '1023px'},
              'dOnly': {'min': '1024px'},
              'lg':{'min' : '1024px'},
              '2xl': '1372px',
              '3xl': '1372px',
            },
        },
    },
    plugins: [
        plugin(function({ addUtilities}) {
            addUtilities({
                '.text-start': {
                    'text-align': 'start',
                },
                '.top-center': {
                    'top': `calc(50vh - 20px)`,
                },
                '.text-end': {
                    'text-align': 'end',
                },
                '.primary-border': {
                    'border': '1px solid rgba(0,0,0,0.08)',
                },
                '.primary-anime': {
                    'transition': 'all 0.25s ease',
                },
                '.pUnset': {
                    'position': 'unset',
                },
                '.unline': {
                    'outline': 'unset',
                },
                '.noFill': {
                    '-webkit-text-fill-color': 'unset !important',
                },
                '.vpm': {
                    'padding-top': 'var(--mobile-padding-top)',
                    'padding-bottom': 'var(--mobile-padding-bottom)',
                },
                '.vpd': {
                    'padding-top': 'var(--desktop-padding-top)',
                    'padding-bottom': 'var(--desktop-padding-bottom)',
                },
                '.vhm': {
                    'height': 'var(--mobile-height, 100vh)',
                },
                '.vhd': {
                    'height': 'var(--desktop-height, 100vh)',
                },
                '.twoInOne:nth-child(3)': {
                    'grid-row-start': '2',
                },
                '.gal-col-d': {
                    'grid-template-columns': 'repeat(auto-fit, minmax(310px, 1fr))',
                },
                '.gal-row-d': {
                    'grid-auto-rows': '90px',
                },
                '.gal-col-m': {
                    'grid-template-columns': 'repeat(auto-fit, minmax(136px, 1fr))',
                },
                '.gal-row-m': {
                    'grid-auto-rows': '34px',
                },
                '.light': {
                    'margin-top': '-1px',
                    'backface-visibility': 'hidden',
                    'transform': 'translateZ(0)'
                },
                '.text-outline': {
                    '-webkit-text-fill-color': 'transparent',
                    '-webkit-text-stroke': '1px'
                },
                '.fix-trans': {
                    'transform': 'unset !important',
                },
            })
        })
    ],
}
const matcher = /(?<=composes:.*)(\b\S+\b)(?=.*from global;)/g;