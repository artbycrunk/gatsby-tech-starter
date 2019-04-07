module.exports = {
	site: {
		version: '1.1',
		title: '', // Site title.
		titleShort: '', // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
		titleAlt: '', // Alternative site title for SEO.
		description: '', // Website description used for RSS feeds/meta description tag.
		url: 'https://www.starter.com',
		rss: '/rss.xml',
		copyright: 'Copyright © 2019. Starter User', // Copyright string for the footer of the website and RSS feed.
		themeColor: '#c62828', // Used for setting manifest and progress theme colors.
		backgroundColor: '#e0e0e0', // Used for setting manifest background color.
		pathPrefix: '',
		dateFromFormat: 'YYYY-MM-DD', // Date format used in the frontmatter.
		dateFormat: 'DD/MM/YYYY', // Date format for display.
		postDefaultCategoryID: 'Tech', // Default category for posts.
		favicon: {
			type: 'image/png',
			href: '/favicon.png',
			sizes: '16x16'
		},
		robotsPolicy: {
			userAgent: '*',
			disallow: ['*/tags/', '*/categories/']
		},
		gzip: false
	},
	user: {
		name: 'Starter User', // Username to display in the author segment.
		description: '', // User description to display in the author segment.
		location: 'North Pole, Earth',
		social: {
			twitter: '',
			linkedin: '',
			github: ''
		},
		gravatar: {
			md5: '',
			size: 60
		}
	},
	service: {
		fBAppID: '',
		disqusShortname: '',
		googleAnalyticsID: '',
		googleTagManagerID: ''
	},
	templates: {
		path: './src/templates/',
		postTypes: {
			tag: 'tag',
			category: 'category'
		}
	},
	paths: {
		default: '/'
	},
	icons: {
		// Logo used for SEO and manifest.
		main: './static/icon.png',

		// Auto generated from gatsby-plugin-manifest
		'logo-144': {
			src: '/logos/logo-144x144.png',
			sizes: '144x144',
			type: 'image/png'
		},
		'logo-512': {
			src: '/logos/logo-512x512.png',
			sizes: '512x512',
			type: 'image/png'
		},
		'logo-192': {
			src: '/logos/logo-192x192.png',
			sizes: '192x192',
			type: 'image/png'
		}
	}
};
