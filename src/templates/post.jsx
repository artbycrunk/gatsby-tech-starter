import React from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import Layout from '../layout';
import UserInfo from '../components/UserInfo/UserInfo';
import Disqus from '../components/Disqus/Disqus';
import PostTags from '../components/PostTags/PostTags';
import LinksPrevNext from '../components/LinksPrevNext/LinksPrevNext';
import SocialLinks from '../components/SocialLinks/SocialLinks';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';
import './b16-tomorrow-dark.css';
import './post.css';

export default class PostTemplate extends React.Component {
	render() {
		const { pageContext, data } = this.props;
		const { slug, next, prev } = pageContext;
		const { site, mdx } = data;
		const post = mdx.frontmatter;
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
      <SEO postPath={slug} postNode={mdx} postSEO />
      <div>
        <h1>{post.title}</h1>
        <h2>{post.date}</h2>
        <MDXRenderer>{mdx.code.body}</MDXRenderer>
        {/* <div dangerouslySetInnerHTML={{ __html: postNode.html }} /> */}
        <div className="post-meta">
          <PostTags tags={post.tags} />
          <SocialLinks postPath={slug} postNode={mdx} />
          <LinksPrevNext prev={prev} next={next} />
        </div>
        <UserInfo config={config} />
        <Disqus postNode={mdx} />
      </div>
    </div>
  </Layout>
		);
	}
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!) {
		mdx(fields: { slug: { eq: $slug } }) {
			timeToRead
			excerpt
			frontmatter {
				title
				cover
				date(formatString: "MMMM DD, YYYY")
				category
				tags
			}
			fields {
				slug
				date
			}
			code {
				body
			}
		}
	}
`;
