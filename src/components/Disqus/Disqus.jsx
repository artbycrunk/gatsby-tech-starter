import React, { Component } from 'react';
import { DiscussionEmbed, CommentCount } from 'disqus-react';
import config from '../../../data/config';
import common from '../../../data/common';
import './Disqus.css';

class Disqus extends Component {
	render() {
		const { postNode } = this.props;
		const { disqusShortname } = config.service;
		if (!disqusShortname) {
			return null;
		}
		const post = postNode.frontmatter;
		const postUrl = common.postURL(postNode.fields.slug);
		const disqusConfig = {
			url: postUrl,
			identifier: postNode.fields.slug,
			title: post.title
		};

		return (
  <div>
    <CommentCount shortname={disqusShortname} config={disqusConfig}>
      {'Comments'}
    </CommentCount>
    <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
  </div>
		);
	}
}

export default Disqus;
