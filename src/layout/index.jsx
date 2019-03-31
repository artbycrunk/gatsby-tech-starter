import React from 'react';
import Helmet from 'react-helmet';
import { MDXProvider } from '@mdx-js/tag';
import config from '../tokens/config';
import './index.css';
import Sidebar from '../components/Sidebar/Sidebar';
import mdxComponents from '../components/mdx';

import 'typeface-share-tech-mono';
import 'typeface-pt-sans';

export default class MainLayout extends React.Component {
	render() {
		const { children } = this.props;
		const { favicon } = config.site;
		return (
  <div>
    <Helmet>
      <meta name="description" content={config.site.description} />
      <link rel="icon" type={favicon.type} href={favicon.href} sizes={favicon.sizes} />
    </Helmet>
    <Sidebar />
    <MDXProvider components={mdxComponents}>{children}</MDXProvider>
  </div>
		);
	}
}
