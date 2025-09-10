
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
                'orange': '#FF4F17',
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
                'inter': ['Inter', 'Arial', 'sans-serif'],
            },
            fontSize: {
                'xs': [ /* font-size */ '14px', {
                    lineHeight: '20px',
                }],
                'sm': [ /* font-size */ '16px', {
                    lineHeight: '19px',
                }],
                'base': [ /* font-size */ '18px', {
                    lineHeight: '32px',
                }],
                'base-m': [ /* font-size */ '22px', {
                    lineHeight: '30px',
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
                    lineHeight: '1',
                }],
                '5xl': [ /* font-size */ 'var(--5xl-font-size)', {
                    lineHeight: '1',
                }],
                'xxl': [ /* font-size */ 'var(--xxl-font-size)', {
                    lineHeight: '1.4',
                }],
            },
            screens: {
              'mOnly': {'max': '1023px'},
              'dOnly': {'min': '1024px'},
              'lg':{'min' : '1024px'},
              '2xl': '1440px'
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