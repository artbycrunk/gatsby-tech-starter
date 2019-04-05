import React, { Component } from 'react';
import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	TelegramShareButton,
	RedditShareButton,
	FacebookShareCount,
	LinkedinShareCount,
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
    <RedditShareButton url={url} title={post.title} additionalProps={{ 'aria-label': 'RedditShareButton' }}>
      <RedditIcon round size={iconSize} />
      <RedditShareCount url={url}>{count => renderShareCount(count)}</RedditShareCount>
    </RedditShareButton>
    <TwitterShareButton
      url={url}
      title={post.title}
      additionalProps={{ 'aria-label': 'TwitterShareButton' }}
    >
      <TwitterIcon round size={iconSize} />
    </TwitterShareButton>
    <FacebookShareButton
      url={url}
      quote={postNode.excerpt}
      additionalProps={{ 'aria-label': 'FacebookShareButton' }}
    >
      <FacebookIcon round size={iconSize} />
      <FacebookShareCount url={url}>{count => renderShareCount(count)}</FacebookShareCount>
    </FacebookShareButton>
    <LinkedinShareButton
      url={url}
      title={post.title}
      description={postNode.excerpt}
      additionalProps={{ 'aria-label': 'LinkedinShareButton' }}
    >
      <LinkedinIcon round size={iconSize} />
      <LinkedinShareCount url={url}>{count => renderShareCount(count)}</LinkedinShareCount>
    </LinkedinShareButton>
    <TelegramShareButton url={url} additionalProps={{ 'aria-label': 'TelegramShareButton' }}>
      <TelegramIcon round size={iconSize} />
    </TelegramShareButton>
  </div>
		);
	}
}

export default SocialLinks;
