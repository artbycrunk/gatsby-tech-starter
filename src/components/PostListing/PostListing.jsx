import React from 'react';
import Link from '../Link/Link';
import PostTags from '../PostTags/PostTags';
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
				excerpt: postEdge.node.frontmatter.excerpt || postEdge.node.excerpt,
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

		return (
  <h1>{common.capitalizeFirstLetter(title)}</h1>,
			(
  <div className="post-grid-container">
    {postList.map(post => [
      <div key={post.path} className="post-grid-item">
        <PostTags category={post.category} tags={post.tags} from="PostListing" />
        <Link className="listingLink" to={post.path}>
          {post.title}
        </Link>
        {post.excerpt && <div className="listingExcerpt">{post.excerpt}</div>}
      </div>
					])}
  </div>
			)
		);
	}
}

export default PostListing;
