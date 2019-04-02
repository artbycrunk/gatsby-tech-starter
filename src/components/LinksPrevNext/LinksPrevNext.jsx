import React, { Component } from 'react';
import Link from '../Link/Link';
import './LinksPrevNext.css';

class LinksPrevNext extends Component {
	render() {
		const { prev, next } = this.props;

		return (
  <div className="pnlinks-grid-container">
    {prev && (
    <div className="pnlinks-grid-item-left">
      <div>{' < Previous'}</div>
      <Link className="contentLink" key={prev.fields.slug} to={prev.fields.slug}>
        {prev.fields.title}
      </Link>
    </div>
				)}
    {next && (
    <div className="pnlinks-grid-item-right">
      <div>{'Next > '}</div>
      <Link className="contentLink" key={next.fields.slug} to={next.fields.slug}>
        {next.fields.title}
      </Link>
    </div>
				)}
  </div>
		);
	}
}

export default LinksPrevNext;
