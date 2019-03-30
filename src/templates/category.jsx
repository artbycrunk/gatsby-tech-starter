import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../layout';
import PostListing from '../components/PostListing/PostListing';
import config from '../tokens/config';
import common from '../tokens/common';

export default class CategoryTemplate extends React.Component {
	render() {
		const { pageContext, data } = this.props;
		const { category } = pageContext;
		const { edges } = data.allMdx;

		return (
  <Layout>
    <div className="content container category-container">
      <Helmet title={`${common.capitalizeFirstLetter(category)} | ${config.site.title}`} />
      <PostListing postEdges={edges} category={category} />
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
						date
						category
					}
				}
			}
		}
	}
`;
