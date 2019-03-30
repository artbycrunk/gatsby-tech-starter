const config = require('./src/tokens/config');
const common = require('./src/tokens/common');

module.exports = {
	pathPrefix: config.site.pathPrefix === '' ? '/' : config.site.pathPrefix,
	siteMetadata: {
		siteUrl: common.baseURL(),
		rssMetadata: {
			site_url: common.baseURL(),
			feed_url: common.feedURL(),
			title: config.site.title,
			description: config.site.description,
			image_url: `${common.baseURL()}/logos/logo-512.png`,
			author: config.user.name,
			copyright: config.site.copyright
		}
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-lodash',
		 {
            resolve: `gatsby-plugin-page-creator`,
            options: {
                path: `${__dirname}/src/pages`,
            },
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'assets',
				path: 'static'
			}
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'posts',
				path: 'content'
			}
		},
		{
			resolve: `gatsby-plugin-sass`
		},
		{
			resolve: `gatsby-mdx`,
			options: {
				extensions: ['.mdx', '.md'],
				gatsbyRemarkPlugins: [
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 690
						}
					},
					{
						resolve: 'gatsby-remark-responsive-iframe'
					},
					{
						resolve: `gatsby-remark-autolink-headers`,
						options: {}
					},
					{
						resolve: 'gatsby-remark-copy-linked-files',
						options: {}
					}
				]
			}
		},
		{
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				trackingId: config.service.googleAnalyticsID
			}
		},
		{
			resolve: 'gatsby-plugin-nprogress',
			options: {
				color: config.site.themeColor
			}
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		'gatsby-plugin-catch-links',
		'gatsby-plugin-twitter',
		'gatsby-plugin-sitemap',
		{
			resolve: 'gatsby-plugin-robots-txt',
			options: {
				policy: [
					{
						userAgent: '*',
						disallow: ['*/tags/', '*/categories/']
					}
				]
			}
		},
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: config.site.title,
				short_name: config.site.titleShort,
				description: config.site.description,
				start_url: config.site.pathPrefix,
				background_color: config.site.backgroundColor,
				theme_color: config.themeColor,
				display: 'minimal-ui',
				icons: [
					{
						src: '/logos/logo-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/logos/logo-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			}
		},
		'gatsby-plugin-offline',
		{
			resolve: 'gatsby-plugin-feed',
			options: {
				setup(ref) {
					const ret = ref.query.site.siteMetadata.rssMetadata;
					ret.allMdx = ref.query.allMdx;
					return ret;
				},
				query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
                image_url
                author
                copyright
              }
            }
          }
        }
      `,
				feeds: [
					{
						serialize(ctx) {
							const { rssMetadata } = ctx.query.site.siteMetadata;
							return ctx.query.allMdx.edges.map(edge => ({
								categories: edge.node.frontmatter.tags,
								date: edge.node.fields.date,
								title: edge.node.frontmatter.title,
								description: edge.node.excerpt,
								author: rssMetadata.author,
								url: rssMetadata.site_url + edge.node.fields.slug,
								guid: rssMetadata.site_url + edge.node.fields.slug,
								custom_elements: [{ 'content:encoded': edge.node.html }]
							}));
						},
						query: `
            {
              allMdx(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                edges {
                  node {
                    excerpt
                    code {
											scope
										}
                    timeToRead
                    fields {
                      slug
                      date
                    }
                    frontmatter {
                      title
                      date
                      category
                      tags
                    }
                  }
                }
              }
            }
          `,
						output: config.site.rss
					}
				]
			}
		}
	]
};