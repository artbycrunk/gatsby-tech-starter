import React, { Component } from 'react';
import Helmet from 'react-helmet';
import config from '../../tokens/config';
import common from '../../tokens/common';

class SEO extends Component {
	render() {
		const { postNode, postPath, postSEO } = this.props;
		let title;
		let description;
		let postURL;

		let image = config.icons["logo-144"].src;

		if (postSEO) {
			const postMeta = postNode.frontmatter;
			({ title } = postMeta);
			description = postMeta.description ? postMeta.description : postNode.excerpt;
			if (description === '') ({ description } = config.site);
			if (Object.prototype.hasOwnProperty.call(postMeta, 'cover')) {
				image = postMeta.cover;
			}
			postURL = common.postURL(postPath);
		} else {
			({ title, description } = config.site);
		}

		image = common.imageURL(image);
		const blogURL = common.baseURL();
		const schemaOrgJSONLD = [
			{
				'@context': 'http://schema.org',
				'@type': 'WebSite',
				url: blogURL,
				name: title,
				alternateName: config.site.titleAlt ? config.site.titleAlt : ''
			}
		];
		if (postSEO) {
			schemaOrgJSONLD.push(
				{
					'@context': 'http://schema.org',
					'@type': 'BreadcrumbList',
					itemListElement: [
						{
							'@type': 'ListItem',
							position: 1,
							item: {
								'@id': postURL,
								name: title,
								image
							}
						}
					]
				},
				{
					'@context': 'http://schema.org',
					'@type': 'BlogPosting',
					url: blogURL,
					name: title,
					alternateName: config.site.titleAlt ? config.site.titleAlt : '',
					headline: title,
					image: {
						'@type': 'ImageObject',
						url: image
					},
					description
				}
			);
		}
		return (
  <Helmet>
    {/* General tags */}
    <meta name="description" content={description} />
    <meta name="image" content={image} />

    {/* Schema.org tags */}
    <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>

    {/* OpenGraph tags */}
    <meta property="og:url" content={postSEO ? postURL : blogURL} />
    {postSEO ? <meta property="og:type" content="article" /> : null}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="fb:app_id" content={config.site.fBAppID ? config.site.fBAppID : ''} />

    {/* Twitter Card tags */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content={config.user.social.twitter ? config.user.social.twitter : ''} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
  </Helmet>
		);
	}
}

export default SEO;
