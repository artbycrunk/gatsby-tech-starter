import React, { Component } from 'react';
import _ from 'lodash';
import Link from '../Link/Link';
import './PostTags.scss';
import common from '../../tokens/common';

class PostTags extends Component {
	render() {
		const { category, tags, from } = this.props;

		let categoryLink = 'category_link';
		let tagLink = 'tag_link';
		let tagLinkLast = 'tag_link_last';

		if (from === 'PostListing') {
			categoryLink = 'category_listingLink';
			tagLink = 'category_listingLink';
			tagLinkLast = 'category_listingLink';
		}

		function getLink(key, className, type) {
			let link = `/${key}`;
			if (type === 'tag') {
				link = `/tags/${_.kebabCase(key)}`;
			}
			return (
  <Link className={className} key={key} to={link}>
    {common.capitalizeFirstLetter(key)}
  </Link>
			);
		}

		return (
  <div className="post-tag-container">
    {category && getLink(category, categoryLink, 'category')}
    {tags && tags.map((tag, i) => {
		if (tags.length === i + 1) {
			return getLink(tag, tagLinkLast, 'tag');
		}
		return getLink(tag, tagLink, 'tag');
	})}
  </div>
		);
	}
}

export default PostTags;
