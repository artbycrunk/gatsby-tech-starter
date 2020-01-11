import React, { Component } from 'react';
import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	TelegramShareButton,
	RedditShareButton,
	FacebookShareCount,
	RedditShareCount,
	FacebookIcon,
	TwitterIcon,
	TelegramIcon,
	LinkedinIcon,
	RedditIcon
} from 'react-share';
import './SocialLinks.css';
import common from '../../tokens/common';

class SocialLinks extends Component {
	render() {
		const { postNode, postPath, mobile } = this.props;
		const post = postNode.frontmatter;
		const url = common.postURL(postPath);
		const iconSize = mobile ? 36 : 48;
		const filter = count => (count > 0 ? count : '');
		const renderShareCount = count => <div className="share-count">{filter(count)}</div>;

		return (
  <div className="social-links">
    <RedditShareButton url={url} title={post.title}>
      <RedditIcon round size={iconSize} aria-label='RedditShareButton' />
      <RedditShareCount url={url}>{count => renderShareCount(count)}</RedditShareCount>
    </RedditShareButton>
    <TwitterShareButton
      url={url}
      title={post.title}
    >
      <TwitterIcon round size={iconSize} aria-label='TwitterShareButton' />
    </TwitterShareButton>
    <FacebookShareButton
      url={url}
      quote={postNode.excerpt}
    >
      <FacebookIcon round size={iconSize} aria-label='FacebookShareButton' />
      <FacebookShareCount url={url}>{count => renderShareCount(count)}</FacebookShareCount>
    </FacebookShareButton>
    <LinkedinShareButton
      url={url}
      title={post.title}
      description={postNode.excerpt}
    >
      <LinkedinIcon round size={iconSize} aria-label='LinkedinShareButton' />
    </LinkedinShareButton>
    <TelegramShareButton url={url}>
      <TelegramIcon round size={iconSize} aria-label='TelegramShareButton' />
    </TelegramShareButton>
  </div>
		);
	}
}

export default SocialLinks;
