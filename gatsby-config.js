require('dotenv').config({
	path: '.env.development',
})

const contentfulConfig = {
	spaceId: process.env.CONTENTFUL_SPACE_ID,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
	host: process.env.CONTENTFUL_HOST,
	downloadLocal: true,
	enableTags: true,
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
	throw new Error(
		'Contentful spaceId and the access token need to be provided.'
	)
}

module.exports = {
	siteMetadata: {
		title: `Engage`,
		siteUrl: `https://www.engagedigitalpartners.com/`
	},
	plugins:
		[
			'gatsby-plugin-react-helmet',
			{
				resolve: `gatsby-plugin-netlify`,
				options: {
					headers: {
					"/static/*.woff2": [
						"Cache-Control: public, max-age=31536000, immutable",
						"Access-Control-Allow-Origin: *",
					],
					"/static/*.{jpg,jpeg,png,gif,webp,avif,svg}": [
						"Cache-Control: public, max-age=31536000, immutable",
					],
					"/static/*.{js,css}": [
						"Cache-Control: public, max-age=604800, must-revalidate",
					],
					},
					mergeSecurityHeaders: true,
					mergeLinkHeaders: true,
					mergeCachingHeaders: true,
				},
			},
			'gatsby-transformer-sharp',
			'gatsby-plugin-sharp',
			`gatsby-plugin-image`,
			"gatsby-plugin-postcss",
			{
				resolve: 'gatsby-plugin-sitemap',
				options: {
					output: '/',
					//excludes: [],
				},
			},
			{
				resolve: 'gatsby-source-contentful',
				options: contentfulConfig,
			},
			{
				resolve: `gatsby-plugin-layout`,
				options: {
					component: require.resolve(`./src/components/Layout/index`),
				},
			},
			{
				resolve: `gatsby-plugin-alias-imports`,
				options: {
					alias: {
						'@components': 'src/components',
						'@Ui': 'src/components/Ui',
						'@Layout': 'src/components/Layout',
						'@UseCase': 'src/useCase',
						'@Svg': 'static/svgs',
						'@Src': 'src',
						'@globalCss': 'src/components/GlobalCss/index.module.css'
					},
					extensions: [".mjs", ".js", ".jsx", ".wasm", ".json", ".ts", ".tsx", ".js", ".css", ".svg"],
				},
			},
			{
				resolve: 'gatsby-plugin-manifest',
				options: {
					icon: "src/images/icon.png",
					name: `Greatsweb`,
					short_name: `Greatsweb`,
					description: `We turn your ideas into fast, production-ready web, mobile, and AI apps.`,
					start_url: `/`,
					background_color: `#FFFFFF`,
					theme_color: `#FFFFFF`,
					display: `minimal-ui`,
					"icons": [
						{
							"src": "static/images/icons/icon-72x72.png",
							"sizes": "72x72",
							"type": "image/png"
						},
						{
							"src": "static/images/icons/icon-96x96.png",
							"sizes": "96x96",
							"type": "image/png"
						},
						{
							"src": "static/images/icons/icon-128x128.png",
							"sizes": "128x128",
							"type": "image/png"
						},
						{
							"src": "static/images/icons/icon-144x144.png",
							"sizes": "144x144",
							"type": "image/png"
						},
						{
							"src": "static/images/icons/icon-152x152.png",
							"sizes": "152x152",
							"type": "image/png"
						},
						{
							"src": "static/images/icons/icon-192x192.png",
							"sizes": "192x192",
							"type": "image/png"
						},
						{
							"src": "static/images/icons/icon-384x384.png",
							"sizes": "384x384",
							"type": "image/png"
						},
						{
							"src": "static/images/icons/icon-512x512.png",
							"sizes": "512x512",
							"type": "image/png"
						}
					]
				}
			},
			{
				resolve: 'gatsby-source-filesystem',
				options: {
					"name": "images",
					"path": "./src/images/"
				},
				__key: "images"
			},
			{
				resolve: "gatsby-plugin-react-svg",
				options: {
					rule: {
						include: /static/ // See below to configure properly
					}
				}
			},
			{
				resolve: 'gatsby-plugin-robots-txt',
				options: {
					env: {
						production: {
							policy: [{ userAgent: '*' }],
							sitemap: 'https://www.engagedigitalpartners.com/sitemap-index.xml',
						},
						development: {
							policy: [{ userAgent: '*', disallow: ['/'] }],
							sitemap: null,
							host: null,
						},
					},
				},
			},
		]
};