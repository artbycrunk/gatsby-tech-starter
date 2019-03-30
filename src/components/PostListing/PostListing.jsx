import React from 'react';
import { Link } from 'gatsby';
import './PostListing.css';
import common from '../../tokens/common';

class PostListing extends React.Component {
	getPostList() {
		const { postEdges } = this.props;

		const postList = [];

		postEdges.forEach(postEdge => {
			postList.push({
				path: postEdge.node.fields.slug,
				tags: postEdge.node.frontmatter.tags,
				title: postEdge.node.frontmatter.title,
				date: postEdge.node.fields.date,
				excerpt: postEdge.node.excerpt,
				timeToRead: postEdge.node.timeToRead,
				category: postEdge.node.frontmatter.category || 'Others'
			});
		});

		return postList;
	}

	render() {
		const { tag, category } = this.props;
		const postList = this.getPostList();

		let title = '';
		if (tag) {
			title = `Tag : ${tag}`;
		} else if (category) {
			title = category;
		}

		return [
  <h1>{common.capitalizeFirstLetter(title)}</h1>,
  <div className="post-grid-container">
    {postList.map(post => [
      <div className="post-grid-item align-right">
        <Link className="category_link" key={post.path} to={post.category}>
          {common.capitalizeFirstLetter(post.category)}
        </Link>
      </div>,
      <div className="post-grid-item">
        <Link className="contentLink" key={post.path} to={post.path}>
          {post.title}
        </Link>
        <div>{post.excerpt}</div>
      </div>
				])}
  </div>
		];
	}
}

export default PostListing;
