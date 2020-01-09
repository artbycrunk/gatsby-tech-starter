import React from 'react';
import { Helmet } from 'react-helmet-async'
import { graphql } from 'gatsby';
import Layout from '../layout';
import PostListing from '../components/PostListing/PostListing';
import config from '../tokens/config';
import Link from '../components/Link/Link';
import './404.css';

class Error404 extends React.Component {
	render() {
		const { data } = this.props;
		const postEdges = data.allMdx.edges;
		return (
  <Layout>
    <div className="content container index-container">
      <Helmet title={`Page not found | ${config.site.title}`} />
      <div className="notfound-row">
        <h1 className="notfound-404">404</h1>
        <h2 className="notfound-msg">I couldn’t find this page.</h2>
      </div>
      <div className="notfound-text">
        <p>Sorry, we've misplaced that URL or it's pointing to something that doesn't exist.</p>
        <p>
Try finding it on the
          <Link className="contentLink" to="/">homepage</Link>
          {' '}
or from the posts below.
        </p>
      </div>
      
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
