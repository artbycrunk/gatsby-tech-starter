import React, { Component } from 'react';
import _ from 'lodash';
import Link from '../Link/Link';
import './PostTags.scss';
import common from '../../../data/common';

class PostTags extends Component {
	render() {
		const { category, tags } = this.props;
		return (
  <div className="post-tag-container">
    {category && (
    <Link className="category_link" key={category} to={`/${category}`}>
      {common.capitalizeFirstLetter(category)}
    </Link>
				)}
    {tags &&
					tags.map(tag => (
  <Link className="tag_link" key={tag} to={`/tags/${_.kebabCase(tag)}`}>
    {common.capitalizeFirstLetter(tag)}
  </Link>
					))}
  </div>
		);
	}
}

export default PostTags;
