import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../layout';
import PostListing from '../components/PostListing/PostListing';
import config from '../tokens/config';

class Error404 extends React.Component {
	render() {
		const { data } = this.props;
		const postEdges = data.allMdx.edges;
		return (
  <Layout>
    <div className="content container index-container">
      <Helmet title={config.site.title} />
      <h1>404: Page not found</h1>
      <div>Sorry, we've misplaced that URL or it's pointing to something that doesn't exist.</div>
      <div>Try finding it from the posts below.</div>
      <div className="post-date hide">
        <p />
      </div>
      <PostListing postEdges={postEdges} />
    </div>
  </Layout>
		);
	}
}

export default Error404;

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
