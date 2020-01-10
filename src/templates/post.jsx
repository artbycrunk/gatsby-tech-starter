import React from 'react';
import { Helmet } from 'react-helmet-async'
import { graphql } from 'gatsby';
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from '../layout';
import Disqus from '../components/Disqus/Disqus';
import PostTags from '../components/PostTags/PostTags';
import LinksPrevNext from '../components/LinksPrevNext/LinksPrevNext';
import SocialLinks from '../components/SocialLinks/SocialLinks';
import SEO from '../components/SEO/SEO';
import config from '../tokens/config';
import './post.css';

export default class PostTemplate extends React.Component {
	render() {
		const { pageContext, data } = this.props;
		const { slug, next, prev } = pageContext;
		// eslint-disable-next-line
		const { site, mdx } = data;
		const post = mdx.frontmatter;
		if (!post.id) {
			post.id = slug;
		}
		if (!post.category_id) {
			post.category_id = config.postDefaultCategoryID;
		}
		return (
  <Layout hideSidebar={post.hide_sidebar}>
    <div>
      <Helmet defer={false}>
        <title>{`${post.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={mdx} postSEO />
      <div>
        <h1>{post.title}</h1>
        <h2>{post.date}</h2>
        <MDXRenderer>{mdx.body}</MDXRenderer>
        <div className="post-meta">
          <PostTags tags={post.tags} />
          <SocialLinks postPath={slug} postNode={mdx} />
          <LinksPrevNext prev={prev} next={next} />
        </div>
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
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
				category
				tags
				show_date
				page_width
				excerpt
				hide_sidebar
				gallery {
					image_path {
						...ImageSharpCustom
					}
					title
				}
			}
			excerpt
			fields {
				slug
				date
			}
			body
		}
	}
`;
