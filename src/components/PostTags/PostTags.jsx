import React, { Component } from 'react';
import _ from 'lodash';
import Link from '../Link/Link';
import './PostTags.scss';
import common from '../../tokens/common';

class PostTags extends Component {
  render() {
    const { category, tags } = this.props;
    const tagLen = tags.length;

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
        {category && getLink(category, 'category_link', 'category')}
        {tags &&
     tags.map((tag, i) => {
        if (tagLen === i + 1) {
          return getLink(tag, 'tag_link_last', 'tag');
        }
        return getLink(tag, 'tag_link', 'tag');
    })}
      </div>
    );
  }
}

export default PostTags;
