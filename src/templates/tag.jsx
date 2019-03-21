import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../layout';
import PostListing from '../components/PostListing/PostListing';
import config from '../../data/SiteConfig';
import common from '../../data/common';

export default class TagTemplate extends React.Component {
	render() {
		const { pageContext, data } = this.props;
		const { tag } = pageContext;
		const { edges } = data.allMdx;
		return (
  <Layout>
    <div className="content container tag-container">
      <Helmet title={`${common.capitalizeFirstLetter(tag)} | ${config.siteTitle}`} />
      <PostListing postEdges={edges} tag={tag} />
    </div>
  </Layout>
		);
	}
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
	query TagPage($tag: String) {
		allMdx(
			limit: 1000
			sort: { fields: [frontmatter___date], order: DESC }
			filter: { frontmatter: { tags: { in: [$tag] } } }
		) {
			totalCount
			edges {
				node {
					fields {
						slug
						date
					}
					excerpt
					timeToRead
					frontmatter {
						title
						tags
						date
						category
					}
				}
			}
		}
	}
`;
