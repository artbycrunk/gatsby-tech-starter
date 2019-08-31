import React from 'react';
import Helmet from 'react-helmet';
import { MDXProvider } from '@mdx-js/react';
import { graphql } from 'gatsby';
import config from '../tokens/config';
import './index.css';
import Sidebar from '../components/Sidebar/Sidebar';
import mdxComponents from '../components/mdx';

import 'typeface-share-tech-mono';
import 'typeface-pt-sans';

export default class MainLayout extends React.Component {
	render() {
		const { children, hideSidebar } = this.props;
		let needSidebar = true
		if (hideSidebar === true){
			needSidebar = false
		}

		return (
  <div>
    <Helmet htmlAttributes={{ lang: 'en' }}>
      <meta name="description" content={config.site.description} />
      <link
        rel="icon"
        type={config.icons['logo-16'].type}
        href={config.icons['logo-16'].src}
        sizes={config.icons['logo-16'].sizes}
      />
      <meta name="theme-color" content={config.site.themeColor} />
    </Helmet>
    {needSidebar === true && <Sidebar />}
    <MDXProvider components={mdxComponents}>{children}</MDXProvider>
  </div>
		);
	}
}

export const ImageSharpCustom = graphql`
	fragment ImageSharpCustom on File {
		childImageSharp {
			fluid(maxWidth: 1200) {
				...GatsbyImageSharpFluid_withWebp
			}
		}
	}
`;
