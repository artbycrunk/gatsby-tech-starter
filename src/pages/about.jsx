import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Layout from '../layout';
import About from '../components/About/About';
import config from '../tokens/config';

class AboutPage extends Component {
	render() {
		return (
  <Layout>
    <div className="content container about-container">
      <Helmet title={`About | ${config.site.title}`} />
      <About />
    </div>
  </Layout>
		);
	}
}

export default AboutPage;
