import React from 'react';
import Helmet from 'react-helmet';
import { MDXProvider } from '@mdx-js/tag';
import { graphql } from 'gatsby';
import config from '../tokens/config';
import './index.css';
import Sidebar from '../components/Sidebar/Sidebar';
import mdxComponents from '../components/mdx';

import 'typeface-share-tech-mono';
import 'typeface-pt-sans';

export default class MainLayout extends React.Component {
	render() {
		const { children } = this.props;
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
    <Sidebar />
    <MDXProvider components={mdxComponents}>{children}</MDXProvider>
  </div>
		);
	}
}

export const ImageSharpCustom = graphql`
	fragment ImageSharpCustom on File {
		publicURL
		childImageSharp {
			fluid(maxWidth: 1200) {
				srcSet
				...GatsbyImageSharpFluid_withWebp
			}
			sizes(maxWidth: 1200) {
				srcSet
				...GatsbyImageSharpSizes_withWebp
			}
		}
	}
`;
