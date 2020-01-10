import React from 'react';
import { Helmet } from 'react-helmet-async'
import { graphql } from 'gatsby';
import Layout from '../layout';
import PostListing from '../components/PostListing/PostListing';
import config from '../tokens/config';
import common from '../tokens/common';

export default class TagTemplate extends React.Component {
	render() {
		const { pageContext, data } = this.props;
		const { tag } = pageContext;
		const { edges } = data.allMdx;
		return (
  <Layout>
    <div className="content container tag-container">
      <Helmet title={`${common.capitalizeFirstLetter(tag)} | ${config.site.title}`} defer={false} />
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
