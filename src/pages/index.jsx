import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../layout';
import PostListing from '../components/PostListing/PostListing';
import SEO from '../components/SEO/SEO';
import config from '../../data/config';

class Index extends React.Component {
	render() {
		const { data } = this.props;
		const postEdges = data.allMdx.edges;
		return (
  <Layout>
    <div className="content container index-container">
      <Helmet title={config.site.title} />
      <SEO />
      <PostListing postEdges={postEdges} />
    </div>
  </Layout>
		);
	}
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
	query {
		allMdx(limit: 2000, sort: { fields: [frontmatter___date], order: DESC }) {
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
