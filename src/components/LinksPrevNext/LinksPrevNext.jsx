import React, { Component } from 'react';
import { Link } from 'gatsby';
import './LinkPrevNext.css';

class LinksPrevNext extends Component {
    render() {
        const { prev, next } = this.props;

        const links = [];

        if (prev) {
            links.push(
              <div className="pnlinks-grid-item-left">
                <div>{' < Previous'}</div>
                <Link className="contentLink" key={prev.fields.slug} to={prev.fields.slug}>
                  {prev.fields.title}
                </Link>
              </div>
            );
        } else {
            links.push(<div />);
        }
        if (next) {
            links.push(
              <div className="pnlinks-grid-item-right">
                <div>{'Next > '}</div>
                <Link className="contentLink" key={next.fields.slug} to={next.fields.slug}>
                  {next.fields.title}
                </Link>
              </div>
            );
        }

        return <div className="pnlinks-grid-container">{links}</div>;
    }
}

export default LinksPrevNext;
