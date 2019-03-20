import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'gatsby';
import common from '../../../data/common';

class PostTags extends Component {
	render() {
		const { tags } = this.props;
		return (
  <div className="post-tag-container">
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
