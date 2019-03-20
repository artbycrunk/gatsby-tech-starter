import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../layout';
import UserInfo from '../components/UserInfo/UserInfo';
import Disqus from '../components/Disqus/Disqus';
import PostTags from '../components/PostTags/PostTags';
import SocialLinks from '../components/SocialLinks/SocialLinks';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';
import './b16-tomorrow-dark.css';
import './post.css';

const BASEURL = 'testing';

function template(content, data) {
	return content.replace(/{{ (.+) }}/g, (match, key) => {
		const value = data[key];
		console.log('-------------');
		console.log(key);
		console.log(data);
		console.log(value);
		if (typeof value !== 'undefined') {
			return value;
		}
		return match; // guards against some unintentional prefix
	});
}

export default class PostTemplate extends React.Component {
	render() {
		const { slug } = this.props.pageContext;
		const postNode = this.props.data.markdownRemark;
		const post = postNode.frontmatter;
		if (!post.id) {
			post.id = slug;
		}
		if (!post.category_id) {
			post.category_id = config.postDefaultCategoryID;
		}
		return (
  <Layout>
    <div>
      <Helmet>
        <title>{`${post.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <div>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: template(postNode.html, { BASEURL }) }} />
        <div className="post-meta">
          <PostTags tags={post.tags} />
          <SocialLinks postPath={slug} postNode={postNode} />
        </div>
        <UserInfo config={config} />
        <Disqus postNode={postNode} />
      </div>
    </div>
  </Layout>
		);
	}
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			timeToRead
			excerpt
			frontmatter {
				title
				cover
				date
				category
				tags
			}
			fields {
				nextTitle
				nextSlug
				prevTitle
				prevSlug
				slug
				date
			}
		}
	}
`;
