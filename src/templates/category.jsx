import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../layout';
import PostListing from '../components/PostListing/PostListing';
import config from '../../data/SiteConfig';

export default class CategoryTemplate extends React.Component {
	render() {
		const { pageContext, data } = this.props;
		const { category } = pageContext;
		const { edges } = data.allMdx;
		return (
  <Layout>
    <div className="category-container">
      <Helmet title={`Posts in category "${category}" | ${config.siteTitle}`} />
      <PostListing postEdges={edges} />
    </div>
  </Layout>
		);
	}
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
	query CategoryPage($category: String) {
		allMdx(
			limit: 1000
			sort: { fields: [frontmatter___date], order: DESC }
			filter: { frontmatter: { category: { eq: $category } } }
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
						cover
						date
					}
				}
			}
		}
	}
`;
